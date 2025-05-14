import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    const redirect = requestUrl.searchParams.get("redirect") || "/account"

    if (!code) {
      console.error("No code provided in callback")
      return NextResponse.redirect(`${requestUrl.origin}/login?error=Authentication failed`)
    }

    const supabase = await createServerSupabaseClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Error exchanging code for session:", error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    // Get the session to confirm it worked
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      console.error("No session after code exchange")
      return NextResponse.redirect(`${requestUrl.origin}/login?error=Failed to create session`)
    }

    console.log("Session successfully created, redirecting to:", redirect)

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${requestUrl.origin}${redirect}`)
  } catch (error) {
    console.error("Error in auth callback:", error)
    return NextResponse.redirect(`${new URL(request.url).origin}/login?error=An unexpected error occurred`)
  }
}
