import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"

export default async function AdminProductsPage() {
  const supabase = createServerSupabaseClient()

  // Get products
  const { data: products, error } = await supabase.from("products").select("*").order("id", { ascending: true })

  if (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Separator className="my-6" />

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Featured</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-3 text-sm">{product.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.category}</td>
                  <td className="px-4 py-3 text-sm">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">{product.stock}</td>
                  <td className="px-4 py-3 text-sm">{product.featured ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
