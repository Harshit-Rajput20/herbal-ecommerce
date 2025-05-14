import { createServerSupabaseClient } from "@/lib/supabase/server"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

// Sample products to use if database is empty - with local images
const sampleProducts = [
  {
    id: "1",
    name: "Ashwagandha Root Powder",
    price: 24.99,
    category: "Supplements",
    featured: true,
    sale: true,
    discount: 15,
    image_url: "/images/products/ashwagandha.jpg",
  },
  {
    id: "2",
    name: "Tulsi Tea",
    price: 12.99,
    category: "Tea",
    featured: true,
    image_url: "/images/products/tulsi-tea.jpg",
  },
  {
    id: "3",
    name: "Aqua Face Wash",
    price: 14.99,
    category: "Skincare",
    featured: true,
    new: true,
    image_url: "/images/products/face-wash.jpg",
  },
  {
    id: "4",
    name: "Heart Health Drops",
    price: 27.99,
    category: "Drops",
    featured: true,
    sale: true,
    discount: 10,
    image_url: "/images/products/heart-health-drops.jpg",
  },
  {
    id: "5",
    name: "Aloe Vera Gel",
    price: 15.99,
    category: "Skincare",
    image_url: "/images/products/aloe-vera.jpg",
  },
  {
    id: "6",
    name: "Moringa Leaf Powder",
    price: 19.99,
    category: "Supplements",
    new: true,
    image_url: "/images/products/moringa.jpg",
  },
  {
    id: "7",
    name: "Chamomile Tea",
    price: 9.99,
    category: "Tea",
    image_url: "/images/products/chamomile-tea.jpg",
  },
  {
    id: "8",
    name: "Brahmi Hair Oil",
    price: 22.99,
    category: "Haircare",
    sale: true,
    discount: 5,
    image_url: "/images/products/brahmi-oil.jpg",
  },
  {
    id: "9",
    name: "Liver Care Tablets",
    price: 21.99,
    category: "Tablets",
    image_url: "/images/products/liver-care-tablets.jpg",
  },
  {
    id: "10",
    name: "Lavender Essential Oil",
    price: 14.99,
    category: "Oils",
    new: true,
    image_url: "/images/products/lavender-oil.jpg",
  },
  {
    id: "11",
    name: "Ginger Tea",
    price: 11.99,
    category: "Tea",
    image_url: "/images/products/ginger-tea.jpg",
  },
  {
    id: "12",
    name: "Women's Health Supplement",
    price: 29.99,
    category: "Supplements",
    sale: true,
    discount: 8,
    image_url: "/images/products/womens-health-supplement.jpg",
  },
  {
    id: "13",
    name: "Rosemary Essential Oil",
    price: 16.99,
    category: "Oils",
    image_url: "/images/products/rosemary-oil.jpg",
  },
  {
    id: "14",
    name: "Amla Powder",
    price: 14.99,
    category: "Supplements",
    new: true,
    image_url: "/images/products/amla-powder.jpg",
  },
  {
    id: "15",
    name: "Herbal Face Mask",
    price: 19.99,
    category: "Skincare",
    image_url: "/images/products/face-mask.jpg",
  },
  {
    id: "16",
    name: "Peppermint Tea",
    price: 10.99,
    category: "Tea",
    sale: true,
    discount: 10,
    image_url: "/images/products/peppermint-tea.jpg",
  },
]

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string; page?: string }
}) {
  // Fix: Properly handle searchParams
  const category = searchParams ? searchParams.category : undefined
  const pageStr = searchParams ? searchParams.page : "1"
  const page = Number.parseInt(pageStr || "1")
  const pageSize = 12
  const offset = (page - 1) * pageSize

  // Try to fetch products from Supabase
  let products = []
  let count = 0
  let error = null
  let uniqueCategories = []

  try {
    const supabase = await createServerSupabaseClient()

    // Build query
    let query = supabase.from("products").select("*", { count: "exact" })

    // Add category filter if provided
    if (category) {
      query = query.eq("category", category)
    }

    // Add pagination
    query = query.range(offset, offset + pageSize - 1).order("name")

    // Execute query
    const response = await query

    if (response.error) {
      error = response.error
      console.error("Error fetching products:", error)
    } else {
      products = response.data || []
      count = response.count || 0
    }

    // Get all categories for filter
    try {
      const { data: categories } = await supabase
        .from("products")
        .select("category")
        .not("category", "is", null)
        .order("category")

      // Extract unique categories
      if (categories && categories.length > 0) {
        uniqueCategories = Array.from(new Set(categories.map((item) => item.category).filter(Boolean)))
      } else {
        // Use sample categories if none in database
        uniqueCategories = Array.from(new Set(sampleProducts.map((p) => p.category)))
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
      uniqueCategories = Array.from(new Set(sampleProducts.map((p) => p.category)))
    }
  } catch (err) {
    console.error("Unexpected error:", err)
    error = err
  }

  // If no products or error, use sample products
  if (products.length === 0 || error) {
    console.log("Using sample products")
    products = sampleProducts

    if (category) {
      products = products.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    }

    count = products.length
    products = products.slice(offset, offset + pageSize)
    uniqueCategories = Array.from(new Set(sampleProducts.map((p) => p.category)))
  }

  const totalPages = Math.max(1, Math.ceil(count / pageSize))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              <Button variant={!category ? "default" : "outline"} className="w-full justify-start" asChild>
                <a href="/shop">All Products</a>
              </Button>
              {uniqueCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className="w-full justify-start"
                  asChild
                >
                  <a href={`/shop?category=${cat}`}>{cat}</a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{category ? `${category} Products` : "All Products"}</h1>
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? "product" : "products"} found
            </p>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button key={pageNum} variant={pageNum === page ? "default" : "outline"} size="sm" asChild>
                  <a
                    href={`/shop?${new URLSearchParams({
                      ...(category && { category }),
                      page: pageNum.toString(),
                    })}`}
                  >
                    {pageNum}
                  </a>
                </Button>
              ))}
            </div>
          )}

          {/* View All Products button - fixed */}
          {page < totalPages && (
            <div className="flex justify-center mt-8">
              <Link href={`/shop${category ? `?category=${category}` : ""}`}>
                <Button className="btn-green px-8 py-2">View All Products</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
