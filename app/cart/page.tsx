"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useSupabase } from "@/hooks/use-supabase"

// Function to get placeholder image based on category
const getPlaceholderImage = (category = "") => {
  return `/placeholder.svg?height=200&width=200&query=herbal+${category || "product"}`
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
  const { session } = useSupabase()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login?redirect=/cart")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/checkout")
    } catch (error) {
      console.error("Checkout error:", error)
      setIsCheckingOut(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex border rounded-lg p-4 gap-4">
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={item.image || getPlaceholderImage(item.category)}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t my-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mb-2 btn-green" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? "Processing..." : "Checkout"}
            </Button>
            <Button variant="outline" className="w-full btn-green-outline" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
