import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t">
      {/* Newsletter section */}
      <div className="border-b bg-brand-green-50 dark:bg-gray-900">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold text-brand-green-800 dark:text-brand-green-300 mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-brand-green-700 dark:text-brand-green-400">
                Get the latest updates, offers and health tips
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Your email address" className="flex-1" required />
                <Button type="submit" className="btn-green">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-green-700 dark:text-brand-green-400">Bio-Onn Herbal Care</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Premium herbal products for your health and wellness. Ethically sourced and scientifically backed.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-brand-green-600 hover:text-brand-green-700 dark:text-brand-green-400 dark:hover:text-brand-green-300"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-brand-green-600 hover:text-brand-green-700 dark:text-brand-green-400 dark:hover:text-brand-green-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-brand-green-600 hover:text-brand-green-700 dark:text-brand-green-400 dark:hover:text-brand-green-300"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-brand-green-600 hover:text-brand-green-700 dark:text-brand-green-400 dark:hover:text-brand-green-300"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-green-700 dark:text-brand-green-400">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop?category=tea"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Herbal Teas
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=supplements"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Supplements
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=skincare"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=oils"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Essential Oils
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-green-700 dark:text-brand-green-400">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-500 hover:text-brand-green-600 dark:text-gray-400 dark:hover:text-brand-green-300"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-green-700 dark:text-brand-green-400">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500 dark:text-gray-400">
                  123 Herbal Way, Wellness Valley
                  <br />
                  CA 90210, United States
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-brand-green-600 flex-shrink-0" />
                <span className="text-gray-500 dark:text-gray-400">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-green-600 flex-shrink-0" />
                <span className="text-gray-500 dark:text-gray-400">info@bioonn.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Bio-Onn Herbal Care. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              <Link href="/terms" className="hover:text-brand-green-600 dark:hover:text-brand-green-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-brand-green-600 dark:hover:text-brand-green-300">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="hover:text-brand-green-600 dark:hover:text-brand-green-300">
                Shipping Policy
              </Link>
              <Link href="/refund" className="hover:text-brand-green-600 dark:hover:text-brand-green-300">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
