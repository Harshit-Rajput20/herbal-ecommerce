"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// FAQ categories and questions
const faqData = [
  {
    category: "Products & Ingredients",
    questions: [
      {
        question: "Are your products organic?",
        answer:
          "Yes, all our herbal products are certified organic. We source our ingredients from trusted organic farms and suppliers to ensure the highest quality and purity.",
      },
      {
        question: "Do your products contain any allergens?",
        answer:
          "We clearly label all potential allergens on our product packaging. Many of our products are free from common allergens, but we recommend checking the ingredient list if you have specific allergies or sensitivities.",
      },
      {
        question: "How long do your products last once opened?",
        answer:
          "Most of our products have a shelf life of 12-24 months when unopened. Once opened, we recommend using them within 6-12 months for optimal potency and effectiveness. Each product has a specific recommendation on its packaging.",
      },
      {
        question: "Are your products tested on animals?",
        answer:
          "No, we are proudly cruelty-free. None of our products or ingredients are tested on animals at any stage of development or production.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long will it take to receive my order?",
        answer:
          "Domestic orders typically arrive within 3-5 business days. International shipping times vary by location, usually between 7-14 business days. You'll receive a tracking number once your order ships.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees or import duties that may apply.",
      },
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. The product must be in its original packaging and at least 75% full.",
      },
      {
        question: "Can I change or cancel my order after it's been placed?",
        answer:
          "We process orders quickly to ensure fast shipping. If you need to change or cancel your order, please contact us immediately at support@Bio-on heaalthcare.com. We'll do our best to accommodate your request, but we cannot guarantee changes once an order has entered the fulfillment process.",
      },
    ],
  },
  {
    category: "Usage & Benefits",
    questions: [
      {
        question: "How should I store my herbal products?",
        answer:
          "Most of our products should be stored in a cool, dry place away from direct sunlight. Some items, particularly certain liquid extracts, may require refrigeration after opening. Specific storage instructions are included on each product's packaging.",
      },
      {
        question: "How long does it take to see results from herbal supplements?",
        answer:
          "Results vary depending on the product, your individual body chemistry, and the specific health concern being addressed. Some people notice benefits within a few days, while others may need 4-6 weeks of consistent use. Herbal remedies typically work gradually to support the body's natural processes.",
      },
      {
        question: "Can I take multiple supplements together?",
        answer:
          "Many of our supplements can be taken together, but we recommend consulting with a healthcare professional before combining multiple products, especially if you're taking prescription medications or have existing health conditions.",
      },
      {
        question: "Are your products suitable for pregnant or nursing women?",
        answer:
          "Some herbal products are not recommended during pregnancy or while nursing. We clearly label these products with warnings. However, we always recommend consulting with a healthcare provider before using any herbal products during pregnancy or while breastfeeding.",
      },
    ],
  },
  {
    category: "Account & Ordering",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "You can create an account by clicking on the 'Login' button in the top right corner of our website and selecting 'Register'. You'll need to provide your email address and create a password. Having an account allows you to track orders, save favorite products, and checkout more quickly.",
      },
      {
        question: "Can I place an order without creating an account?",
        answer:
          "Yes, we offer guest checkout for customers who prefer not to create an account. However, creating an account provides benefits like order history, faster checkout, and special promotions.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive an email with tracking information. If you have an account, you can also log in and view your order status and tracking details in the 'Order History' section.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. All payments are securely processed and your information is never stored on our servers.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFAQs, setFilteredFAQs] = useState(faqData)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredFAQs(faqData)
      return
    }

    const filtered = faqData
      .map((category) => {
        const filteredQuestions = category.questions.filter(
          (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
        )
        return filteredQuestions.length > 0
          ? {
              category: category.category,
              questions: filteredQuestions,
            }
          : null
      })
      .filter((category): category is { category: string; questions: any[] } => category !== null)

    setFilteredFAQs(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Find answers to common questions about our products, ordering, shipping, and more.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem key={qIndex} value={`${index}-${qIndex}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any FAQs matching your search. Try different keywords or browse our categories.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 bg-muted rounded-lg p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6">
          If you couldn't find the answer you were looking for, our customer support team is here to help.
        </p>
        <Link href="/contact">
          <Button>Contact Us</Button>
        </Link>
      </div>
    </div>
  )
}
