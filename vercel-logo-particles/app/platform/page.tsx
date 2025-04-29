import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlatformPage() {
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
          <h1 className="text-4xl font-bold mb-4">Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the features and capabilities of the WellScout platform.
          </p>
        </div>

        <section>
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="map">Interactive Map</TabsTrigger>
              <TabsTrigger value="analytics">Cost Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports & Export</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Interactive Map Interface</h3>
                  <p className="text-gray-600 mb-6">
                    Visualize orphan wells across any region with our intuitive map interface. Filter by estimated
                    plugging cost, accessibility, and other key factors to identify your ideal targets.
                  </p>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Color-coded wells based on estimated plugging cost</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Toggle between modern satellite and historical topo views</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Draw custom regions for project planning</span>
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-700">Request a Demo</Button>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500&text=Interactive+Map+Interface"
                    alt="Interactive map interface"
                    width={500}
                    height={400}
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500&text=Cost+Analytics+Dashboard"
                    alt="Cost analytics dashboard"
                    width={500}
                    height={400}
                    className="rounded-lg w-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Cost Analytics Dashboard</h3>
                  <p className="text-gray-600 mb-6">
                    Dive deep into plugging cost estimates with our comprehensive analytics. Understand the factors
                    driving costs and identify the most profitable opportunities.
                  </p>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Detailed cost breakdowns by equipment, labor, and materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Confidence scores for each estimate with supporting data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Comparative analysis across regions and well types</span>
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-700">Explore Analytics</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Reports & Export Options</h3>
                  <p className="text-gray-600 mb-6">
                    Generate comprehensive reports for bidding, planning, and regulatory compliance. Export data in
                    multiple formats to integrate with your existing workflows.
                  </p>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>PDF reports with detailed well profiles and cost estimates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>CSV and Excel exports for data analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>GIS-compatible formats for integration with mapping software</span>
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-700">View Sample Reports</Button>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=500&text=Reports+and+Export+Options"
                    alt="Reports and export options"
                    width={500}
                    height={400}
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to try our platform?</h2>
          <p className="text-lg text-gray-600 mb-6">Schedule a demo to see the WellScout platform in action.</p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">Request a Demo</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
