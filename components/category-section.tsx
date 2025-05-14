import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Herbal Teas",
    description: "Soothing blends for relaxation and wellness",
    image: "/images/categories/herbal-tea.jpg",
    link: "/shop?category=tea",
  },
  {
    name: "Supplements",
    description: "Natural supplements for daily health",
    image: "/images/categories/supplements.jpg",
    link: "/shop?category=supplements",
  },
  {
    name: "Skincare",
    description: "Plant-based solutions for healthy skin",
    image: "/images/categories/skincare.jpg",
    link: "/shop?category=skincare",
  },
  {
    name: "Essential Oils",
    description: "Pure extracts for aromatherapy",
    image: "/images/categories/essential-oils.jpg",
    link: "/shop?category=oils",
  },
]

export default function CategorySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-green-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter text-brand-green-800 dark:text-brand-green-100 sm:text-4xl md:text-5xl">
              Shop by Category
            </h2>
            <p className="mx-auto text-brand-green-700 dark:text-brand-green-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our collection of natural remedies by category to find the perfect solution for your wellness needs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.link} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={category.image || "/images/products/default-product.jpg"}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-bold text-brand-green-700 dark:text-brand-green-300">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
