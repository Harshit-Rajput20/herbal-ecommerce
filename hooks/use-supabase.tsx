"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

type SupabaseContextType = {
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  isAdmin: boolean
  checkAdminStatus: () => Promise<boolean>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({
  children,
  serverSession,
}: {
  children: React.ReactNode
  serverSession?: Session | null
}) {
  const [session, setSession] = useState<Session | null>(serverSession || null)
  const [isLoading, setIsLoading] = useState(!serverSession)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (serverSession) {
      setSession(serverSession)
      setIsLoading(false)
      checkAdminStatus().then(setIsAdmin)
      return
    }

    // Get initial session with better error handling
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error("Error getting session:", error)
          return
        }

        console.log("Initial session:", data.session)
        setSession(data.session)

        if (data.session) {
          const isAdminUser = await checkAdminStatus()
          setIsAdmin(isAdminUser)
        }
      } catch (err) {
        console.error("Unexpected error getting session:", err)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Set up auth state change listener with better error handling
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state change:", _event, session)
      setSession(session)

      if (session) {
        try {
          const isAdminUser = await checkAdminStatus()
          setIsAdmin(isAdminUser)
        } catch (err) {
          console.error("Error checking admin status:", err)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [serverSession])

  const signOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      setIsAdmin(false)
    } catch (error) {
      console.error("Error during sign out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkAdminStatus = async (): Promise<boolean> => {
    if (!session?.user?.id) return false

    try {
      const { data, error } = await supabase.from("admin_users").select("id").eq("id", session.user.id).single()
      return !!data && !error
    } catch (error) {
      console.error("Error checking admin status:", error)
      return false
    }
  }

  return (
    <SupabaseContext.Provider
      value={{
        session,
        isLoading,
        signOut,
        isAdmin,
        checkAdminStatus,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
