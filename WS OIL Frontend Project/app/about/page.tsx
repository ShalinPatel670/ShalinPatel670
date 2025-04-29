import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About WellScout</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mission is to revolutionize the orphan well plugging industry through AI-powered insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              WellScout was founded in 2023 by a team of geospatial data scientists and oil industry veterans who
              recognized a critical gap in the orphan well plugging market: the lack of data-driven decision making.
            </p>
            <p className="text-gray-600 mb-4">
              After witnessing plugging companies struggle with unprofitable projects due to poor well selection, our
              founders developed an AI system that could analyze historical maps and terrain data to predict plugging
              costs with unprecedented accuracy.
            </p>
            <p className="text-gray-600">
              Today, WellScout helps plugging companies across the United States maximize their profitability while
              contributing to environmental remediation efforts.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=500&text=WellScout+Team"
              alt="WellScout team"
              width={500}
              height={400}
              className="rounded-lg w-full"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible with AI and geospatial analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
              <p className="text-gray-600">
                We're committed to helping remediate orphan wells and reduce their environmental impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We provide transparent, accurate data and stand behind our cost estimates.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "CEO & Co-Founder",
                bio: "Former geospatial data scientist with 15 years of experience in the oil and gas industry.",
                image: "/placeholder.svg?height=150&width=150&text=SJ",
              },
              {
                name: "Michael Rodriguez",
                title: "CTO & Co-Founder",
                bio: "AI specialist who developed the core algorithms behind WellScout's cost prediction models.",
                image: "/placeholder.svg?height=150&width=150&text=MR",
              },
              {
                name: "David Chen",
                title: "COO",
                bio: "Operations expert with extensive experience managing plugging projects across multiple states.",
                image: "/placeholder.svg?height=150&width=150&text=DC",
              },
            ].map((person, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Image
                  src={person.image || "/placeholder.svg"}
                  alt={person.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
                <p className="text-blue-600 mb-3">{person.title}</p>
                <p className="text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            We're always looking for talented individuals who are passionate about using technology to solve
            environmental challenges.
          </p>
          <Link href="/careers">
            <Button className="bg-blue-600 hover:bg-blue-700">View Open Positions</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
