"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-brand-green-700 text-white py-2 px-4 text-center relative">
      <p className="text-sm font-medium">
        ENJOY 10% OFF ALL HERBAL BUNDLES - USE CODE: <span className="font-bold">BIOONN10</span>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
        aria-label="Close announcement"
      >
        <X size={18} />
      </button>
    </div>
  )
}
