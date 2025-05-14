import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            // This is the line that needs to be fixed - cookies() should be awaited
            const cookie = cookieStore.get(name)
            return cookie?.value
          } catch (error) {
            console.error(`Error getting cookie ${name}:`, error)
            return undefined
          }
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            console.error(`Cookie ${name} could not be set:`, error)
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options, maxAge: 0 })
          } catch (error) {
            console.error(`Cookie ${name} could not be removed:`, error)
          }
        },
      },
    },
  )
}
