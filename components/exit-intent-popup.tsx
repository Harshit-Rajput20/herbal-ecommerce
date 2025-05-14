"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if we've already shown the popup in this session
    if (sessionStorage.getItem("exit_popup_shown")) {
      return
    }

    let delayTimer: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when the mouse moves to the top of the page
      if (e.clientY <= 5 && !hasShown) {
        // Set a small delay to prevent accidental triggers
        delayTimer = setTimeout(() => {
          setIsOpen(true)
          setHasShown(true)
          sessionStorage.setItem("exit_popup_shown", "true")
        }, 300)
      }
    }

    // Add event listener for mouse leaving the window
    document.addEventListener("mouseleave", handleMouseLeave)

    // Also set a timer for mobile users who can't trigger mouseleave
    const mobileTimer = setTimeout(() => {
      if (!hasShown && !sessionStorage.getItem("exit_popup_shown")) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem("exit_popup_shown", "true")
      }
    }, 60000) // Show after 1 minute for mobile users

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(delayTimer)
      clearTimeout(mobileTimer)
    }
  }, [hasShown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    console.log("Subscribing email:", email)
    setIsOpen(false)
    // You could show a success message here
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-green-700">Wait! Don't Miss Out!</DialogTitle>
          <DialogDescription>Before you go, take advantage of our special offers.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="bg-brand-green-50 border border-brand-green-100 rounded-md p-4 text-center">
            <h3 className="font-semibold text-brand-green-800 text-lg">Get 10% Off Your First Order</h3>
            <p className="text-brand-green-700 mt-1">
              Subscribe to our newsletter and receive a 10% discount code instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="btn-green">
                Subscribe
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3 text-center">
              <h4 className="font-medium">WELCOME15</h4>
              <p className="text-sm text-gray-500">15% off first order</p>
            </div>
            <div className="border rounded-md p-3 text-center">
              <h4 className="font-medium">FREESHIP50</h4>
              <p className="text-sm text-gray-500">Free shipping on $50+</p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="btn-green-outline">
            No Thanks
          </Button>
          <Button onClick={() => setIsOpen(false)} className="btn-green" asChild>
            <Link href="/shop">Continue Shopping</Link>
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
