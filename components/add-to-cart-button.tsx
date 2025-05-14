"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import type { Database } from "@/types/supabase"
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button variant="outline" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" />
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  )
}
