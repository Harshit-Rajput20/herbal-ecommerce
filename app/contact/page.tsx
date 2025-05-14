"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Have questions or feedback? We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="bg-card rounded-lg p-6 border mb-8">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">info@Bio-on heaalthcare.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 Herbal Way, Portland, OR 97201
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9am - 5pm
                    <br />
                    Saturday: 10am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Do you ship internationally?</h3>
                <p className="text-muted-foreground">
                  Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location.
                </p>
              </div>
              <div>
                <h3 className="font-medium">What is your return policy?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, please contact us
                  for a return authorization.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Are your products organic?</h3>
                <p className="text-muted-foreground">
                  Yes, all our herbal products are certified organic and sustainably sourced.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
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
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-16">
        <div className="rounded-lg overflow-hidden h-[400px] border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178132.64317582942!2d-122.7299273570222!3d45.54795234134219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1651271299089!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
