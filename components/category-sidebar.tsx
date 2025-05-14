"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Leaf, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

type CategoryWithCount = {
  name: string
  count: number
  slug: string
}

export default function CategorySidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsExpanded(window.innerWidth >= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Fetch categories and counts
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        // Fallback categories if API fails
        setCategories([
          { name: "Tea", count: 2, slug: "tea" },
          { name: "Supplements", count: 4, slug: "supplements" },
          { name: "Tablets", count: 4, slug: "tablets" },
          { name: "Drops", count: 2, slug: "drops" },
          { name: "Syrups", count: 1, slug: "syrups" },
          { name: "Topicals", count: 1, slug: "topicals" },
          { name: "Skincare", count: 1, slug: "skincare" },
          { name: "Haircare", count: 2, slug: "haircare" },
        ])
      }
    }

    fetchCategories()
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Leaf className="mr-2 h-4 w-4 text-primary" />
          Categories
        </h3>
        {isMobile && (
          <button onClick={toggleExpand} className="p-1">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-1">
          <Link
            href="/shop"
            className={cn(
              "block px-2 py-1.5 text-sm rounded-md transition-colors",
              !currentCategory ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
            )}
          >
            All Products
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className={cn(
                "flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-colors",
                currentCategory === category.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
              )}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-muted rounded-full px-2 py-0.5">{category.count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
