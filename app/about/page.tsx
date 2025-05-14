import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">About Bio-on heaalthcare</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          We're on a mission to bring the healing power of nature to your everyday wellness routine.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Bio-on heaalthcare was founded in 2020 with a simple but powerful vision: to make high-quality herbal products
            accessible to everyone. Our journey began when our founder, Sarah Chen, discovered the transformative power
            of herbal remedies during her own health journey.
          </p>
          <p className="text-muted-foreground mb-4">
            After years of studying traditional herbal practices from around the world and modern scientific research,
            Sarah assembled a team of herbalists, scientists, and wellness enthusiasts to create formulations that
            combine ancient wisdom with contemporary science.
          </p>
          <p className="text-muted-foreground">
            Today, Bio-on heaalthcare offers a comprehensive range of herbal products, from teas and supplements to skincare and
            essential oils, all crafted with the highest standards of quality and sustainability.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/herbal-garden.png" alt="Our herbal garden" fill className="object-cover" />
        </div>
      </div>

      <Separator className="my-16" />

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We source only the finest organic herbs and ingredients, testing each batch for purity and potency.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to ethical sourcing, eco-friendly packaging, and minimizing our environmental footprint.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              We believe in full disclosure about our ingredients, sourcing practices, and manufacturing processes.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Education</h3>
            <p className="text-muted-foreground">
              We're dedicated to sharing knowledge about herbal traditions and empowering informed wellness choices.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We blend traditional herbal wisdom with modern scientific research to create effective, innovative
              products.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-muted-foreground">
              We support the communities where our herbs are grown and foster a global community of herbal enthusiasts.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-16" />

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/professional-woman-diverse.png" alt="Sarah Chen - Founder & CEO" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold">Sarah Chen</h3>
            <p className="text-primary">Founder & CEO</p>
            <p className="text-sm text-muted-foreground mt-2">
              Herbalist with 15+ years of experience in traditional Chinese medicine and modern herbal applications.
            </p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/professional-man.png"
                alt="Dr. Michael Rivera - Chief Scientific Officer"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Dr. Michael Rivera</h3>
            <p className="text-primary">Chief Scientific Officer</p>
            <p className="text-sm text-muted-foreground mt-2">
              Pharmacognosist with a Ph.D. in Medicinal Plant Chemistry and 10+ years in herbal research.
            </p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/diverse-professional-woman.png"
                alt="Amara Johnson - Head of Product Development"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Amara Johnson</h3>
            <p className="text-primary">Head of Product Development</p>
            <p className="text-sm text-muted-foreground mt-2">
              Certified herbalist and formulator with expertise in creating effective, sensory-rich herbal products.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Herbal Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Experience the difference of our premium herbal products and become part of our growing community of wellness
          enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">Shop Our Products</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
