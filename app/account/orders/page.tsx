import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye } from "lucide-react"

export default async function OrdersPage() {
  const supabase = await createServerSupabaseClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return (
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">View and track your order history</p>
        <Separator className="my-6" />
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold">Please Sign In</h2>
          <p className="mt-2 text-muted-foreground">You need to be signed in to view your orders.</p>
          <div className="mt-4">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get user's orders with items
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items:order_items(
        *,
        products:products(*)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
  }

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">My Orders</h1>
      <p className="text-muted-foreground">View and track your order history</p>

      <Separator className="my-6" />

      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            // Calculate order summary
            const itemCount = order.order_items?.length || 0
            const totalItems = order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>Placed on {formatDate(order.created_at)}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>
                        {totalItems} {totalItems === 1 ? "item" : "items"} ({itemCount}{" "}
                        {itemCount === 1 ? "product" : "products"})
                      </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <address className="not-italic text-sm text-muted-foreground">
                          {order.shipping_address?.firstName || "N/A"} {order.shipping_address?.lastName || ""}
                          <br />
                          {order.shipping_address?.address || "Address not available"}
                          <br />
                          {order.shipping_address?.city || ""}, {order.shipping_address?.state || ""}{" "}
                          {order.shipping_address?.postalCode || ""}
                          <br />
                          {order.shipping_address?.country || ""}
                        </address>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Order Summary</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal:</span>
                            <span>{formatCurrency(order.total)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping:</span>
                            <span>Free</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>{formatCurrency(order.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 px-6 py-4">
                  <Link href={`/order-confirmation/${order.id}`} className="ml-auto">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Order Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold">No Orders Yet</h2>
          <p className="mt-2 text-muted-foreground">You haven&apos;t placed any orders yet.</p>
          <div className="mt-4">
            <Link href="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
