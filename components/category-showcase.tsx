import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Herbal Teas",
    description: "Soothing blends for wellness and relaxation",
    image: "/images/category-tea.png",
    slug: "tea",
  },
  {
    name: "Supplements",
    description: "Natural support for your daily health needs",
    image: "/images/category-supplements.png",
    slug: "supplements",
  },
  {
    name: "Ayurvedic Tablets",
    description: "Traditional remedies in convenient form",
    image: "/images/category-tablets.png",
    slug: "tablets",
  },
  {
    name: "Natural Skincare",
    description: "Nourish your skin with herbal goodness",
    image: "/images/category-skincare.png",
    slug: "skincare",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our range of natural herbal products for your wellness journey
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80 mb-3">{category.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
