"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  category?: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.from("products").select("*").order("name").limit(10)

        if (error) {
          throw error
        }

        setProducts(data || [])
      } catch (err: any) {
        console.error("Error fetching products:", err)
        setError(err.message || "Failed to fetch products")
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">No products found. Please check back later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = "/herbal-product.png"
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.category || "Herbal Product"}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
