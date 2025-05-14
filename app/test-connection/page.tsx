"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import ProductList from "@/components/product-list"

export default function TestConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Simple query to test the connection
        const { data, error } = await supabase.from("products").select("count").single()

        if (error) {
          throw error
        }

        setConnectionStatus("success")
        toast.success("Successfully connected to Supabase!")
      } catch (err: any) {
        console.error("Connection error:", err)
        setConnectionStatus("error")
        setErrorMessage(err.message || "Failed to connect to Supabase")
        toast.error("Failed to connect to Supabase")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bio-Onn Herbal Care - Supabase Connection Test</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          {connectionStatus === "loading" && (
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin mr-2"></div>
              <p>Testing connection to Supabase...</p>
            </div>
          )}

          {connectionStatus === "success" && (
            <div className="text-green-600 dark:text-green-400 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>Successfully connected to Supabase!</p>
            </div>
          )}

          {connectionStatus === "error" && (
            <div className="text-red-600 dark:text-red-400">
              <p className="font-medium">Connection Error:</p>
              <p>{errorMessage}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {connectionStatus === "success" && <ProductList />}
    </div>
  )
}
