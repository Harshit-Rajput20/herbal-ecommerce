import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch order details
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .single()

  if (orderError || !order) {
    notFound()
  }

  // Fetch order items
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select("*, products(*)")
    .eq("order_id", order.id)

  if (itemsError) {
    console.error("Error fetching order items:", itemsError)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="rounded-lg border bg-background p-6">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <h2 className="text-lg font-semibold">Order #{order.id}</h2>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="font-semibold">Items</h3>
            {orderItems?.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex items-center">
                  <span className="mr-2 text-muted-foreground">{item.quantity}x</span>
                  <span>{item.products.name}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="font-semibold">Shipping Address</h3>
            <address className="not-italic text-muted-foreground">
              {order.shipping_address.firstName} {order.shipping_address.lastName}
              <br />
              {order.shipping_address.address}
              <br />
              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}
              <br />
              {order.shipping_address.country}
            </address>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/account/orders">
              <Button variant="outline">View All Orders</Button>
            </Link>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
