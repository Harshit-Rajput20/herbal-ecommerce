import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient()

  // Get counts
  const { count: productsCount } = await supabase.from("products").select("*", { count: "exact", head: true })

  const { count: ordersCount } = await supabase.from("orders").select("*", { count: "exact", head: true })

  const { count: customersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

  // Get total revenue
  const { data: orders } = await supabase.from("orders").select("total")

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, users(email)")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Overview of your store performance</p>

      <Separator className="my-6" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Recent Orders</h2>
      <div className="mt-4 rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-3 text-sm">#{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.users?.email}</td>
                  <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
