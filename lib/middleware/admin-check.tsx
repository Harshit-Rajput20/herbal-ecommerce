"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/use-supabase"
import { Loader2 } from "lucide-react"

export default function AdminCheck({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, isLoading, checkAdminStatus } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/login?redirect=/admin")
      return
    }

    if (!isLoading && session && !isAdmin) {
      checkAdminStatus().then((isAdmin) => {
        if (!isAdmin) {
          router.push("/")
        }
      })
    }
  }, [session, isAdmin, isLoading, router, checkAdminStatus])

  if (isLoading || !session || !isAdmin) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Checking admin access...</span>
      </div>
    )
  }

  return <>{children}</>
}
