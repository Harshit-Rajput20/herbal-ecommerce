"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, User, Search, Heart, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { useSupabase } from "@/hooks/use-supabase"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const { session, isAdmin, signOut } = useSupabase()

  // Get cart item count with safety check
  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Get user data from session
  const user = session?.user

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.user_metadata) return "U"

    const fullName = user.user_metadata.full_name || user.user_metadata.name || ""
    if (!fullName) return user.email?.[0]?.toUpperCase() || "U"

    return fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get user avatar URL
  const getUserAvatar = () => {
    if (avatarError) return null
    if (!user || !user.user_metadata) return null

    // Try different possible locations for the avatar URL
    const avatarUrl = user.user_metadata.avatar_url || user.user_metadata.picture || user.user_metadata.avatar

    // Validate the URL to avoid broken images
    if (!avatarUrl || typeof avatarUrl !== "string") return null

    return avatarUrl
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-green-800 text-white py-2 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+1 (800) 123-4567</span>
            </div>
            <span>|</span>
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link href="/about" className="hover:text-brand-green-200">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-brand-green-200">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-brand-green-200">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
          isScrolled ? "bg-white/95 backdrop-blur-md dark:bg-gray-950/95" : "bg-background"
        }`}
      >
        <div className="container flex h-16 items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl mr-6 text-brand-green-700 dark:text-brand-green-400">
                Bio-Onn Herbal Care
              </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/shop" || pathname.startsWith("/product/")
                      ? "text-brand-green-700 font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/about" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/contact" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/faq" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  FAQ
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-brand-green-700 hover:text-brand-green-800 hover:bg-brand-green-50"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-brand-green-700 hover:text-brand-green-800 hover:bg-brand-green-50"
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Wishlist</span>
                  </Link>
                </Button>

                <ModeToggle />

                <Link href="/cart" className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-brand-green-700 hover:text-brand-green-800 hover:bg-brand-green-50"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green-600 text-xs text-white">
                        {cartItemCount}
                      </span>
                    )}
                    <span className="sr-only">Cart</span>
                  </Button>
                </Link>

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar>
                          <AvatarImage
                            src={getUserAvatar() || ""}
                            alt={user.email || "User"}
                            onError={() => setAvatarError(true)}
                          />
                          <AvatarFallback className="bg-brand-green-100 text-brand-green-700">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist">Wishlist</Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Admin</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href="/admin">Dashboard</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/products">Products</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/admin/users">Users</Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" className="btn-green-ghost" asChild>
                    <Link href="/login">
                      <User className="h-5 w-5 mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
              <div className="md:hidden flex items-center space-x-4">
                <ModeToggle />
                <Link href="/cart" className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-brand-green-700 hover:text-brand-green-800 hover:bg-brand-green-50"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green-600 text-xs text-white">
                        {cartItemCount}
                      </span>
                    )}
                    <span className="sr-only">Cart</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-brand-green-700 hover:text-brand-green-800 hover:bg-brand-green-50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="border-t py-4 bg-background">
            <div className="container">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for products..." className="pl-10 pr-10" autoFocus />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/shop" || pathname.startsWith("/product/")
                      ? "text-brand-green-700 font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/about" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/contact" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className={`transition-colors hover:text-brand-green-600 ${
                    pathname === "/faq" ? "text-brand-green-700 font-semibold" : "text-foreground/80"
                  }`}
                >
                  FAQ
                </Link>

                <div className="pt-2 pb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for products..." className="pl-10" />
                  </div>
                </div>

                {user ? (
                  <>
                    <div className="border-t pt-4 mt-2">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar>
                          <AvatarImage
                            src={getUserAvatar() || ""}
                            alt={user.email || "User"}
                            onError={() => setAvatarError(true)}
                          />
                          <AvatarFallback className="bg-brand-green-100 text-brand-green-700">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
                          </p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Link
                          href="/account"
                          className="block transition-colors hover:text-brand-green-600 text-foreground/80"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block transition-colors hover:text-brand-green-600 text-foreground/80"
                        >
                          Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block transition-colors hover:text-brand-green-600 text-foreground/80"
                        >
                          Wishlist
                        </Link>
                        {isAdmin && (
                          <>
                            <div className="border-t pt-3 mt-3">
                              <p className="font-medium mb-2">Admin</p>
                              <Link
                                href="/admin"
                                className="block transition-colors hover:text-brand-green-600 text-foreground/80 mb-2"
                              >
                                Dashboard
                              </Link>
                              <Link
                                href="/admin/products"
                                className="block transition-colors hover:text-brand-green-600 text-foreground/80 mb-2"
                              >
                                Products
                              </Link>
                              <Link
                                href="/admin/users"
                                className="block transition-colors hover:text-brand-green-600 text-foreground/80"
                              >
                                Users
                              </Link>
                            </div>
                          </>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left transition-colors hover:text-brand-green-600 text-foreground/80"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Button className="btn-green w-full mt-2" asChild>
                    <Link href="/login">
                      <User className="h-5 w-5 mr-2" />
                      Login / Register
                    </Link>
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
