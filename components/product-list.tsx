"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import ProductCard from "@/components/product-card"

// Sample products to use if database is empty
const sampleProducts = [
  {
    id: "1",
    name: "Ashwagandha Root Powder",
    price: 24.99,
    category: "Supplements",
    featured: true,
    sale: true,
    discount: 15,
    image_url: "https://images.unsplash.com/photo-1577086664693-894d8405334a?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Tulsi Tea",
    price: 12.99,
    category: "Tea",
    featured: true,
    image_url: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Aqua Face Wash",
    price: 14.99,
    category: "Skincare",
    featured: true,
    new: true,
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Heart Health Drops",
    price: 27.99,
    category: "Drops",
    featured: true,
    sale: true,
    discount: 10,
    image_url: "https://images.unsplash.com/photo-1559149251-e9a1dc89f549?q=80&w=500&auto=format&fit=crop",
  },
]

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("products").select("*").limit(4)

        if (error) {
          throw error
        }

        if (data && data.length > 0) {
          setProducts(data)
        } else {
          // Use sample products if none in database
          setProducts(sampleProducts)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        // Use sample products on error
        setProducts(sampleProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-[400px] rounded-lg bg-gray-200 animate-pulse dark:bg-gray-800"></div>
          ))}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sample Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
