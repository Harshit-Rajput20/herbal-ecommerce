import type React from "react"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import AccountSidebar from "@/components/account-sidebar"

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  // Check if user is authenticated with better error handling
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      console.log("No session found, redirecting to login")
      redirect("/login")
    }

    // If we have a session, render the account layout
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <AccountSidebar />
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in account layout:", error)
    redirect("/login?error=Session error occurred")
  }
}
