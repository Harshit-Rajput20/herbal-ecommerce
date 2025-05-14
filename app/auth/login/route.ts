import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const provider = searchParams.get("provider")
    const redirectTo = searchParams.get("redirect") || "/account"

    if (!provider || provider !== "google") {
      return NextResponse.redirect(`${new URL(request.url).origin}/login?error=Invalid provider`)
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${new URL(request.url).origin}/auth/callback?redirect=${redirectTo}`,
      },
    })

    if (error) {
      console.error("OAuth error:", error)
      return NextResponse.redirect(`${new URL(request.url).origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    return NextResponse.redirect(data.url)
  } catch (error) {
    console.error("Login route error:", error)
    return NextResponse.redirect(`${new URL(request.url).origin}/login?error=An unexpected error occurred`)
  }
}

export const dynamic = 'force-dynamic';
