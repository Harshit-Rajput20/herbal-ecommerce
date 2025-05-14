"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/hooks/use-supabase"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, UserCog } from "lucide-react"

export default function AdminSidebar() {
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
        <div className="mb-4 px-2">
          <h2 className="text-lg font-semibold text-primary">Admin Dashboard</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/admin">
            <Button variant={isActive("/admin") ? "default" : "ghost"} className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant={isActive("/admin/products") ? "default" : "ghost"} className="w-full justify-start">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant={isActive("/admin/orders") ? "default" : "ghost"} className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </Link>
          <Link href="/admin/customers">
            <Button variant={isActive("/admin/customers") ? "default" : "ghost"} className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant={isActive("/admin/users") ? "default" : "ghost"} className="w-full justify-start">
              <UserCog className="mr-2 h-4 w-4" />
              User Management
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant={isActive("/admin/settings") ? "default" : "ghost"} className="w-full justify-start">
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
