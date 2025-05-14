import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wellness Enthusiast",
    content:
      "I've been using Bio-Onn's herbal teas for months now, and they've made a noticeable difference in my sleep quality and overall well-being.",
    avatar: "/images/avatars/avatar-1.jpg",
    initials: "SJ",
    rating: 5,
    product: "Herbal Sleep Tea",
  },
  {
    name: "Michael Chen",
    role: "Fitness Trainer",
    content:
      "As someone who values natural supplements, I'm impressed with the quality and effectiveness of Bio-Onn's products. My clients love them too!",
    avatar: "/images/avatars/avatar-2.jpg",
    initials: "MC",
    rating: 5,
    product: "Ashwagandha Supplements",
  },
  {
    name: "Emily Rodriguez",
    role: "Yoga Instructor",
    content:
      "Bio-Onn's herbal remedies have become an essential part of my daily routine. The quality is unmatched, and I love supporting a company that prioritizes sustainability.",
    avatar: "/images/avatars/avatar-3.jpg",
    initials: "ER",
    rating: 5,
    product: "Turmeric Capsules",
  },
]

export default function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter text-brand-green-800 dark:text-brand-green-100 sm:text-4xl md:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto text-brand-green-700 dark:text-brand-green-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our customers have to say about our products.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#3c8a44"
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                  </div>
                  <Badge variant="outline-green" className="mb-4">
                    {testimonial.product}
                  </Badge>
                  <p className="mb-6 text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/images/products/default-product.jpg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-brand-green-100 text-brand-green-700">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
