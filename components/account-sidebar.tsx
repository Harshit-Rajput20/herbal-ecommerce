"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/hooks/use-supabase"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"

export default function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useSupabase()
  const { toast } = useToast()

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <nav className="space-y-2">
          <Link href="/account">
            <Button variant={isActive("/account") ? "default" : "ghost"} className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button variant={isActive("/account/orders") ? "default" : "ghost"} className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </Link>
          <Link href="/account/wishlist">
            <Button variant={isActive("/account/wishlist") ? "default" : "ghost"} className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
          </Link>
          <Link href="/account/settings">
            <Button variant={isActive("/account/settings") ? "default" : "ghost"} className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  )
}
