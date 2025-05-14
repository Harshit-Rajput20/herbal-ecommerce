"use client"

import { useState } from "react"
import Link from "next/link"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"

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

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Sample products if none are provided
  const sampleProducts: Product[] = [
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
    {
      id: "5",
      name: "Aloe Vera Gel",
      price: 15.99,
      category: "Skincare",
      featured: true,
      image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "6",
      name: "Moringa Leaf Powder",
      price: 19.99,
      category: "Supplements",
      featured: true,
      new: true,
      image_url: "https://images.unsplash.com/photo-1577086664693-894d8405334a?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "7",
      name: "Chamomile Tea",
      price: 9.99,
      category: "Tea",
      featured: true,
      image_url: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "8",
      name: "Brahmi Hair Oil",
      price: 22.99,
      category: "Haircare",
      featured: true,
      sale: true,
      discount: 5,
      image_url: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=500&auto=format&fit=crop",
    },
  ]

  const displayProducts = products.length > 0 ? products : sampleProducts

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter text-brand-green-800 dark:text-brand-green-100 sm:text-4xl md:text-5xl">
              Featured Products
            </h2>
            <p className="mx-auto text-brand-green-700 dark:text-brand-green-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most popular herbal remedies and supplements, carefully selected for quality and
              effectiveness.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-[400px] rounded-lg bg-gray-200 animate-pulse dark:bg-gray-800"></div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link href="/shop">
            <Button className="btn-green px-8 py-3 text-lg">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
