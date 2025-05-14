import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export async function GET() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated and is an admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    // Get all users from auth.users using the admin API
    // Note: In a real app, you'd use the Supabase service role key for this
    // For this demo, we'll return a list of mock users plus the current user

    // First get the current user's data
    const { data: currentUser } = await supabase.auth.getUser()

    // Create a list of mock users plus the current user
    const users = [
      {
        id: currentUser.user?.id,
        email: currentUser.user?.email,
        created_at: currentUser.user?.created_at,
        user_metadata: currentUser.user?.user_metadata,
      },
      // Add some mock users for demonstration
      {
        id: "mock-user-1",
        email: "user1@example.com",
        created_at: "2023-01-15T00:00:00Z",
        user_metadata: {
          full_name: "John Doe",
        },
      },
      {
        id: "mock-user-2",
        email: "user2@example.com",
        created_at: "2023-02-20T00:00:00Z",
        user_metadata: {
          full_name: "Jane Smith",
        },
      },
    ]

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient()
  const { email } = await request.json()

  // Check if user is authenticated and is an admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    // In a real app with service role key, you'd:
    // 1. Find the user by email in auth.users
    // 2. Add them to admin_users table

    // For this demo, we'll simulate success if the email matches a mock user
    if (email === "user1@example.com" || email === "user2@example.com") {
      return NextResponse.json({
        success: true,
        message: `Admin status granted to ${email}`,
      })
    }

    // If it's not a mock email, check if it's the current user
    if (email === session.user.email) {
      return NextResponse.json({
        success: true,
        message: `Admin status granted to ${email}`,
      })
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 })
  } catch (error) {
    console.error("Error adding admin:", error)
    return NextResponse.json({ error: "Failed to add admin" }, { status: 500 })
  }
}
