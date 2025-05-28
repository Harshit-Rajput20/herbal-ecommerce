"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("bio_onn_visited")

    if (!hasVisited) {
      // Wait a bit before showing the popup for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
        // Set the visited flag
        localStorage.setItem("bio_onn_visited", "true")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-green-700">Welcome to Bio-Onn Herbal Care!</DialogTitle>
          <DialogDescription>Discover the power of nature with our premium herbal products.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="relative h-48 md:h-full rounded-md overflow-hidden">
            <Image src="/images/generic-herbal.png" alt="Bio-Onn Herbal Products" fill className="object-cover" />
          </div>

          <div className="space-y-4">
            <div className="bg-brand-green-50 border border-brand-green-100 rounded-md p-3">
              <h3 className="font-semibold text-brand-green-800">Special Offer for New Visitors!</h3>
              <p className="text-brand-green-700 mt-1">
                Use code <span className="font-bold">WELCOME15</span> for 15% off your first order.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <p>100% Natural Ingredients</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <p>Ethically Sourced</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <p>Free Shipping on Orders Over $50</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="btn-green-outline">
            Maybe Later
          </Button>
          <Button onClick={() => setIsOpen(false)} className="btn-green" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </DialogFooter>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}
