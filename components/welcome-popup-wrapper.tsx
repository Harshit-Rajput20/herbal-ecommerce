"use client"

import dynamic from "next/dynamic"

// Dynamically import the popup component with no SSR
const WelcomePopup = dynamic(() => import("./welcome-popup"), { ssr: false })

export default function WelcomePopupWrapper() {
  return <WelcomePopup />
}
