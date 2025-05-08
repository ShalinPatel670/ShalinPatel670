import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaseStudiesPage() {
  // Case study data with images
  const caseStudies = [
    {
      id: 1,
      title: "Smith Plugging Services: 35% Increase in Profitability",
      description:
        "How a mid-sized plugging company used WellScout to identify low-cost wells and increase their profit margins on state contracts.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop",
      slug: "smith-plugging-services",
    },
    {
      id: 2,
      title: "EcoPlug Inc: Discovering 47 Undocumented Wells",
      description:
        "How our historical map analysis helped a plugging company find dozens of wells that weren't in any state database.",
      image: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=2070&auto=format&fit=crop",
      slug: "ecoplug-undocumented-wells",
    },
    {
      id: 3,
      title: "Western Well Services: Optimizing Equipment Deployment",
      description:
        "How terrain accessibility ratings helped a company reduce equipment mobilization costs by 28% across multiple projects.",
      image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=2069&auto=format&fit=crop",
      slug: "western-well-services",
    },
    {
      id: 4,
      title: "GreenEarth Remediation: Scaling Operations by 3x",
      description:
        "How a small plugging company used WellScout to rapidly expand their operations across multiple states.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
      slug: "greenearth-remediation",
    },
  ]

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
          <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-world examples of how WellScout has helped plugging companies improve their operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <Card key={study.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={`Case study: ${study.title}`}
                  width={600}
                  height={250}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="mb-2">{study.title}</CardTitle>
                <CardDescription className="text-gray-600">{study.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/case-studies/${study.slug}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Read Case Study</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
