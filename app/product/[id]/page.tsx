import Image from "next/image"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Separator } from "@/components/ui/separator"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductDetailsTabs from "@/components/product-details-tabs"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()
  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} - Bio-on heaalthcare`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()
  const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (error || !product) {
    notFound()
  }

  // Fetch related products (same category)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(3)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
            <div className="flex items-center">
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              <div className="ml-4 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <ProductDetailsTabs
                description={product.description}
                benefits={[
                  "100% organic ingredients",
                  "Ethically sourced",
                  "No artificial additives",
                  "Sustainable packaging",
                ]}
                ingredients={[
                  "Organic herbs and botanicals",
                  "Natural plant extracts",
                  "Essential oils (when applicable)",
                  "Ayurvedic formulations",
                ]}
                directions="Follow package instructions for best results. Store in a cool, dry place away from direct sunlight."
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Availability:{" "}
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <AddToCartButton product={product} />
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold">Product Details</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>100% organic ingredients</li>
                <li>Ethically sourced</li>
                <li>No artificial additives</li>
                <li>Sustainable packaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
              >
                <a href={`/product/${relatedProduct.id}`} className="block">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image_url || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold tracking-tight">{relatedProduct.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{relatedProduct.description}</p>
                    <p className="mt-2 font-semibold">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
