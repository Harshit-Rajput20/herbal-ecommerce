"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Mail, Send, Check } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubscribed(true)
      toast.success("Thank you for subscribing to our newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-green-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-brand-green-100 px-3 py-1 text-sm text-brand-green-800 dark:bg-brand-green-800/30 dark:text-brand-green-300">
              Stay Connected
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-brand-green-800 dark:text-brand-green-100 sm:text-4xl md:text-5xl">
              Join Our Newsletter
            </h2>
            <p className="text-brand-green-700 dark:text-brand-green-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Subscribe to our newsletter for the latest product updates, health tips, exclusive offers, and seasonal
              discounts.
            </p>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-green-600" />
                <span>Exclusive Offers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-green-600" />
                <span>Health Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-green-600" />
                <span>New Product Alerts</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-100 dark:bg-brand-green-900">
              <Mail className="h-8 w-8 text-brand-green-600 dark:text-brand-green-300" />
            </div>

            {isSubscribed ? (
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-2">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Successfully Subscribed!</h3>
                <p className="text-muted-foreground">
                  Thank you for joininging our newsletter. You'll receive updates soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10"
                      required
                    />
                    <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-green" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Subscribe <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
