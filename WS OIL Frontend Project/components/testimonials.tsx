import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  // Testimonial data with images
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "CEO, Smith Plugging Services",
      quote:
        "WellScout has completely transformed our bidding process. We've increased our win rate by 35% while maintaining healthy margins. The cost estimates are remarkably accurate.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Operations Director, EcoPlug Inc.",
      quote:
        "The historical topo map analysis is a game-changer. We've discovered dozens of wells that weren't in any state database, giving us a competitive edge in securing contracts.",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Field Manager, Western Well Services",
      quote:
        "The accessibility ratings have saved us countless hours of field reconnaissance. We can now plan our equipment needs accurately before ever setting foot on site.",
    },
  ]

  return (
    <section id="testimonials" className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from plugging companies that have transformed their operations with WellScout.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src={`https://cdn-icons-png.flaticon.com/512/22/22495.png?height=60&width=60&text=${testimonial.name.split(" ")[0][0]}${testimonial.name.split(" ")[1][0]}`}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.quote}"</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/case-studies" className="text-blue-600 hover:text-blue-800 font-medium">
          Read our detailed case studies →
        </Link>
      </div>
    </section>
  )
}
