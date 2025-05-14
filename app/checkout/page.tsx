"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/use-supabase"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function CheckoutPage() {
  const router = useRouter()
  const { session } = useSupabase()
  const { cart, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to complete your purchase.",
      })
      router.push("/login?redirect=/checkout")
      return
    }

    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty cart",
        description: "Your cart is empty. Add some products before checkout.",
      })
      router.push("/shop")
      return
    }

    setIsLoading(true)

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id,
          status: "pending",
          shipping_address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            phone: formData.phone,
          },
          total: subtotal,
        })
        .select()
        .single()

      if (orderError) {
        throw new Error(orderError.message)
      }

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) {
        throw new Error(itemsError.message)
      }

      // Clear cart and redirect to success page
      clearCart()

      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      })

      router.push(`/order-confirmation/${order.id}`)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: error.message || "An error occurred during checkout.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    router.push("/login?redirect=/checkout")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
              <p className="text-muted-foreground">For demo purposes, no actual payment will be processed.</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Complete Order - $${subtotal.toFixed(2)}`
              )}
            </Button>
          </form>
        </div>

        <div>
          <div className="rounded-lg border bg-background p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
