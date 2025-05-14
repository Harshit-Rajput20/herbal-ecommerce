import AnnouncementBanner from "@/components/announcement-banner"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import TestimonialSection from "@/components/testimonial-section"
import NewsletterSection from "@/components/newsletter-section"
import WelcomePopupWrapper from "@/components/welcome-popup-wrapper"
import ExitIntentPopupWrapper from "@/components/exit-intent-popup-wrapper"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Add dynamic rendering configuration
export const dynamic = "force-dynamic"

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

export default async function Home() {
  let featuredProducts = []

  try {
    const supabase = await createServerSupabaseClient()

    // Fetch featured products with error handling
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching featured products:", error)
      } else {
        featuredProducts = data || []
      }
    } catch (error) {
      console.error("Unexpected error fetching featured products:", error)
    }
  } catch (error) {
    console.error("Error creating Supabase client:", error)
  }

  // If no featured products, use sample products
  if (featuredProducts.length === 0) {
    featuredProducts = sampleProducts.filter((p) => p.featured)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <AnnouncementBanner />
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategorySection />
      <TestimonialSection />
      <NewsletterSection />

      {/* Client-side popup components */}
      <WelcomePopupWrapper />
      <ExitIntentPopupWrapper />
    </main>
  )
}
