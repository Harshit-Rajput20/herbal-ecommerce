import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export async function createServerSupabaseClient() {
  try {
    const cookieStore = cookies()

    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            try {
              // Use await here to fix the error
              const cookie = await cookieStore.get(name)
              return cookie?.value
            } catch (error) {
              console.error(`Error getting cookie ${name}:`, error)
              return undefined
            }
          },
          async set(name: string, value: string, options: any) {
            try {
              // Use await here as well
              await cookieStore.set({ name, value, ...options })
            } catch (error) {
              console.error(`Cookie ${name} could not be set:`, error)
            }
          },
          async remove(name: string, options: any) {
            try {
              // Use await here as well
              await cookieStore.set({ name, value: "", ...options, maxAge: 0 })
            } catch (error) {
              console.error(`Cookie ${name} could not be removed:`, error)
            }
          },
        },
      },
    )
  } catch (error) {
    // If cookies() fails (during static rendering), return a client with no cookies
    console.warn("Creating Supabase client without cookies for static rendering")
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: () => undefined,
          set: () => {},
          remove: () => {},
        },
      },
    )
  }
}
