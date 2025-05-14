import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-green-100/80 dark:bg-brand-green-900/50">
      {/* Background circle */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] md:w-[60%] lg:w-[55%] rounded-full bg-brand-green-200/70 dark:bg-brand-green-800/40 -translate-y-[15%] translate-x-[20%]"></div>

      {/* Content container - reduced padding for less height */}
      <div className="container relative z-10 px-4 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Text content */}
          <div className="flex flex-col space-y-4 max-w-xl">
            <p className="text-lg md:text-xl text-brand-green-700 dark:text-brand-green-300 font-medium">
              Nature's Healing Power
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-green-800 dark:text-brand-green-100 tracking-tight leading-tight">
              BIO-ONN
              <br />
              HERBAL CARE
            </h1>

            <p className="text-base md:text-lg text-brand-green-700 dark:text-brand-green-300">
              Premium herbal remedies for your health and wellness. Ethically sourced and scientifically backed.
            </p>

            <div className="pt-2">
              <Link href="/shop">
                <Button className="rounded-full bg-brand-green-600 hover:bg-brand-green-700 text-white px-8 py-5 text-lg">
                  SHOP NOW
                </Button>
              </Link>
            </div>
          </div>

          {/* Image - using local image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[75%] md:w-[65%] lg:w-[85%] aspect-square">
              <Image
                src="/images/hero-herbs.jpg"
                alt="Bio-Onn Herbal Care products"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            {/* Floating elements - smaller and fewer for reduced height */}
            <div className="absolute top-[10%] left-[5%] bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
              <div className="bg-brand-green-100 dark:bg-brand-green-900 rounded-full w-14 h-14 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-green-700 dark:text-brand-green-300"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 9a7 7 0 0 1-13.8 1.7"></path>
                </svg>
              </div>
            </div>

            <div className="absolute bottom-[15%] right-[10%] bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
              <div className="bg-brand-green-100 dark:bg-brand-green-900 rounded-full w-14 h-14 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-green-700 dark:text-brand-green-300"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges - more compact for reduced height */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div className="bg-brand-green-100 dark:bg-brand-green-900 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-green-700 dark:text-brand-green-300"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-green-800 dark:text-brand-green-100">100% Natural</h3>
              <p className="text-xs text-brand-green-700 dark:text-brand-green-300">Pure herbal ingredients</p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div className="bg-brand-green-100 dark:bg-brand-green-900 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-green-700 dark:text-brand-green-300"
              >
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-green-800 dark:text-brand-green-100">Free Shipping</h3>
              <p className="text-xs text-brand-green-700 dark:text-brand-green-300">On orders over $50</p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div className="bg-brand-green-100 dark:bg-brand-green-900 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-green-700 dark:text-brand-green-300"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-brand-green-800 dark:text-brand-green-100">Satisfaction Guaranteed</h3>
              <p className="text-xs text-brand-green-700 dark:text-brand-green-300">30-day money back</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
