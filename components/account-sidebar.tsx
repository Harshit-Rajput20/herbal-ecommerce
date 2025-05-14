"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/hooks/use-supabase"
import { User, Package, Heart, LogOut, Settings } from "lucide-react"

export default function AccountSidebar() {
  const pathname = usePathname()
  const { signOut, isAdmin } = useSupabase()

  const links = [
    {
      href: "/account",
      label: "Profile",
      icon: <User className="h-4 w-4 mr-2" />,
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: <Heart className="h-4 w-4 mr-2" />,
    },
    {
      href: "/account/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ]

  const adminLinks = [
    {
      href: "/admin",
      label: "Dashboard",
    },
    {
      href: "/admin/products",
      label: "Products",
    },
    {
      href: "/admin/orders",
      label: "Orders",
    },
    {
      href: "/admin/users",
      label: "Users",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">My Account</h3>
        <div className="space-y-1">
          {links.map((link) => (
            <Button
              key={link.href}
              variant={pathname === link.href ? "default" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={link.href}>
                {link.icon}
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Admin</h3>
          <div className="space-y-1">
            {adminLinks.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={signOut}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
