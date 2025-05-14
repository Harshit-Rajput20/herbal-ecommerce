"use client"

import dynamic from "next/dynamic"

// Dynamically import the popup component with no SSR
const ExitIntentPopup = dynamic(() => import("./exit-intent-popup"), { ssr: false })

export default function ExitIntentPopupWrapper() {
  return <ExitIntentPopup />
}
