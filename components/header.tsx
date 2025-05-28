"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ShoppingCart, User, Menu, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useSupabase } from "@/hooks/use-supabase"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const pathname = usePathname()
  const { cart } = useCart()
  const { session, isAdmin } = useSupabase()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <div className="h-10 w-auto">
              <div className="h-10 w-auto">
  <img
    src="/images/logos/design-png.png"  // Removed space in filename
    alt="Bio-Onn"
    className="h-full w-auto object-contain"  // Added w-auto for proper scaling
    style={{ height: '50px' }}  // Fixed style prop syntax
  />
</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/shop") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground/80"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {session ? (
              <>
                <Link href="/account">
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label="Admin Dashboard">
                      <Shield className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/shop")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMenu}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/about")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/contact")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={closeMenu}
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive("/admin")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
