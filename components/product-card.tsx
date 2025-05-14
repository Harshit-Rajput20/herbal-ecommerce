"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  price: number
  image_url?: string
  category?: string
  featured?: boolean
  sale?: boolean
  discount?: number
  new?: boolean
}

interface ProductCardProps {
  product: Product
}

// Function to get placeholder image based on category - using local images
const getCategoryImage = (category = "", productName = "") => {
  const normalizedCategory = category.toLowerCase()

  // Product-specific images for common products
  if (productName.toLowerCase().includes("heart health drops")) {
    return "/images/products/heart-health-drops.jpg"
  }

  if (productName.toLowerCase().includes("liver care")) {
    return "/images/products/liver-care-tablets.jpg"
  }

  if (productName.toLowerCase().includes("women's health")) {
    return "/images/products/womens-health-supplement.jpg"
  }

  if (productName.toLowerCase().includes("face wash")) {
    return "/images/products/face-wash.jpg"
  }

  if (productName.toLowerCase().includes("herbal tea premix")) {
    return "/images/products/herbal-tea-premix.jpg"
  }

  // Use local image paths based on category
  switch (normalizedCategory) {
    case "tea":
      return "/images/products/herbal-tea.jpg"
    case "supplements":
      return "/images/products/supplements.jpg"
    case "tablets":
      return "/images/products/tablets.jpg"
    case "skincare":
      return "/images/products/skincare.jpg"
    case "haircare":
      return "/images/products/haircare.jpg"
    case "drops":
      return "/images/products/drops.jpg"
    case "syrups":
      return "/images/products/syrups.jpg"
    case "topicals":
      return "/images/products/topicals.jpg"
    case "oils":
      return "/images/products/essential-oils.jpg"
    default:
      return "/images/products/default-product.jpg"
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageError
        ? getCategoryImage(product.category, product.name)
        : product.image_url || getCategoryImage(product.category, product.name),
      quantity: 1,
    })

    toast.success(`${product.name} added to cart`, {
      description: "You can view your cart anytime",
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    })
  }

  // Get the appropriate image URL (either the product image or a placeholder)
  const productImage = imageError
    ? getCategoryImage(product.category, product.name)
    : product.image_url || getCategoryImage(product.category, product.name)

  return (
    <Card
      className="overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <Image
            src={productImage || "/images/products/default-product.jpg"}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        </div>
        {product.sale && (
          <Badge variant="green" className="absolute top-2 left-2">
            Sale
          </Badge>
        )}
        {product.new && (
          <Badge variant="outline-green" className="absolute top-2 right-2">
            New
          </Badge>
        )}

        {/* Quick action buttons that appear on hover */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white text-brand-green-700 hover:bg-brand-green-50"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white text-brand-green-700 hover:bg-brand-green-50"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white text-brand-green-700 hover:bg-brand-green-50"
            asChild
          >
            <Link href={`/product/${product.id}`}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline-green">{product.category || "Herbal"}</Badge>
            {product.featured && <Badge variant="green">Featured</Badge>}
          </div>
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-medium hover:text-brand-green-700 transition-colors">{product.name}</h3>
          </Link>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-brand-green-700">${product.price.toFixed(2)}</span>
              {product.discount && (
                <span className="text-sm line-through text-muted-foreground">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
            {product.discount && <Badge variant="green">{product.discount}% OFF</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full btn-green" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
