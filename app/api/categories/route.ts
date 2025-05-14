import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createServerSupabaseClient()

  try {
    // Get all unique categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("products")
      .select("category")
      .order("category")

    if (categoriesError) {
      throw categoriesError
    }

    // Get counts for each category
    const categories = await Promise.all(
      [...new Set(categoriesData.map((item) => item.category))].map(async (category) => {
        const { count } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category", category)

        return {
          name: category.charAt(0).toUpperCase() + category.slice(1),
          count: count || 0,
          slug: category,
        }
      }),
    )

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
