import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { SupabaseProvider } from "@/hooks/use-supabase"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bio-Onn Herbal Care - Natural Remedies",
  description: "Premium herbal products for your health and wellness",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SupabaseProvider serverSession={session}>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster position="top-right" />
            </CartProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
