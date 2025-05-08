import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// Case study data
const caseStudies = {
  "smith-plugging-services": {
    title: "Smith Plugging Services: 35% Increase in Profitability",
    company: "Smith Plugging Services",
    location: "Oklahoma & Texas",
    industry: "Oil Well Plugging",
    challenge:
      "Smith Plugging Services was struggling with unpredictable costs on state contracts for orphan well plugging. With fixed-price contracts, they needed a way to identify wells that would be most cost-effective to plug, maximizing their profit margins while still meeting regulatory requirements.",
    solution:
      "WellScout provided Smith with access to our AI-powered platform, which analyzed historical maps, terrain data, and accessibility factors to predict plugging costs with high accuracy. The platform identified wells with the lowest estimated plugging costs, allowing Smith to prioritize these in their bidding strategy.",
    results: [
      "35% increase in overall profitability on state contracts",
      "28% reduction in equipment mobilization costs",
      "Ability to bid on 40% more projects with the same resources",
      "Improved project planning and resource allocation",
    ],
    quote:
      "WellScout completely transformed our bidding process. Before, we were essentially guessing which wells would be profitable. Now, we have data-driven insights that let us bid confidently and maximize our margins. The ROI has been incredible.",
    quotePerson: "John Smith, CEO of Smith Plugging Services",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Oil well plugging operation",
  },
  "ecoplug-undocumented-wells": {
    title: "EcoPlug Inc: Discovering 47 Undocumented Wells",
    company: "EcoPlug Inc.",
    location: "Pennsylvania",
    industry: "Environmental Remediation",
    challenge:
      "EcoPlug Inc. was contracted to plug abandoned wells in a rural Pennsylvania county, but the state database only listed 28 known wells in the area. Historical records suggested there might be more undocumented wells, but finding them manually would be time-consuming and expensive.",
    solution:
      "Using WellScout's historical map analysis, EcoPlug was able to identify potential well locations from USGS topographic maps dating back to the early 1900s. The AI algorithms detected characteristic symbols and patterns indicating well locations that were never properly documented in state records.",
    results: [
      "Discovered 47 previously undocumented wells",
      "Secured additional $1.2M in contract value for the newly discovered wells",
      "Completed comprehensive environmental remediation for the entire area",
      "Established reputation as the go-to company for complex well identification projects",
    ],
    quote:
      "The historical topo map analysis is a game-changer. We've discovered dozens of wells that weren't in any state database, giving us a competitive edge in securing contracts. State regulators were amazed at our ability to find these forgotten wells.",
    quotePerson: "Sarah Johnson, Operations Director at EcoPlug Inc.",
    image: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Historical map analysis",
  },
  "western-well-services": {
    title: "Western Well Services: Optimizing Equipment Deployment",
    company: "Western Well Services",
    location: "Colorado & Wyoming",
    industry: "Well Servicing",
    challenge:
      "Western Well Services was facing high equipment mobilization costs due to the remote and varied terrain of well sites in Colorado and Wyoming. They needed a way to better plan equipment deployment and reduce the costs associated with moving heavy machinery to difficult-to-access locations.",
    solution:
      "WellScout provided detailed terrain accessibility ratings and equipment requirement predictions for each well site. This allowed Western to group wells by accessibility and equipment needs, optimizing their deployment schedule and reducing unnecessary equipment movements.",
    results: [
      "28% reduction in equipment mobilization costs",
      "22% increase in wells plugged per month",
      "Reduced equipment wear and tear",
      "Improved crew scheduling efficiency",
    ],
    quote:
      "The accessibility ratings have saved us countless hours of field reconnaissance. We can now plan our equipment needs accurately before ever setting foot on site. This has dramatically reduced our mobilization costs and increased our operational efficiency.",
    quotePerson: "Michael Rodriguez, Field Manager at Western Well Services",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=2069&auto=format&fit=crop",
    imageAlt: "Heavy equipment for well servicing",
  },
  "greenearth-remediation": {
    title: "GreenEarth Remediation: Scaling Operations by 3x",
    company: "GreenEarth Remediation",
    location: "Multiple States",
    industry: "Environmental Remediation",
    challenge:
      "GreenEarth Remediation was a small company with expertise in well plugging but limited resources for identifying and evaluating potential projects. They wanted to scale their operations but lacked the data and insights needed to expand efficiently into new regions.",
    solution:
      "WellScout's platform provided GreenEarth with comprehensive well data across multiple states, including cost estimates, accessibility ratings, and regulatory requirements. This allowed them to identify profitable opportunities in new regions without extensive on-the-ground research.",
    results: [
      "Expanded operations from 2 states to 6 states in 18 months",
      "Tripled annual revenue from $2.4M to $7.2M",
      "Grew team from 15 to 45 employees",
      "Maintained profit margins while scaling rapidly",
    ],
    quote:
      "WellScout has been instrumental in our growth. As a small company, we couldn't afford to hire teams of analysts or spend months researching new markets. The platform gave us the data and confidence we needed to bid on projects in new states and scale our operations rapidly.",
    quotePerson: "Lisa Chen, Founder & CEO of GreenEarth Remediation",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Business growth chart",
  },
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const caseStudy = caseStudies[slug as keyof typeof caseStudies]

  if (!caseStudy) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/case-studies">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {caseStudy.industry}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {caseStudy.location}
            </span>
          </div>
        </div>

        <div className="mb-10">
          <Image
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.imageAlt}
            width={800}
            height={400}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Company</h3>
            <p>{caseStudy.company}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p>{caseStudy.location}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Industry</h3>
            <p>{caseStudy.industry}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Challenge</h2>
            <p className="text-gray-700">{caseStudy.challenge}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-gray-700">{caseStudy.solution}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {caseStudy.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 my-8">
            <blockquote className="text-lg italic text-gray-700 mb-4">"{caseStudy.quote}"</blockquote>
            <p className="font-semibold">— {caseStudy.quotePerson}</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to achieve similar results?</h3>
          <Link href="/request-demo">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Request a Demo
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
