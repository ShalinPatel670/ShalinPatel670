import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Technology() {
  return (
    <section id="technology" className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Powered by advanced machine learning and geospatial analysis, our platform transforms historical data into
          actionable intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Data Sources</h3>
          <ul className="space-y-3 text-gray-600">
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
              <span>
                <strong>USGS Historical Topographic Maps</strong> - Dating back to the early 1900s, revealing well
                locations before modern documentation
              </span>
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
              <span>
                <strong>Satellite Imagery</strong> - Modern high-resolution imagery to assess current site conditions
              </span>
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
              <span>
                <strong>Terrain Data</strong> - Elevation models and accessibility metrics
              </span>
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
              <span>
                <strong>Public Records</strong> - State and federal databases of known well locations
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">AI Analysis</h3>
          <p className="text-gray-600 mb-4">
            Our proprietary machine learning models analyze multiple factors to predict plugging costs:
          </p>
          <ul className="space-y-3 text-gray-600">
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
              <span>Terrain difficulty and equipment accessibility</span>
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
              <span>Historical well characteristics and depth estimates</span>
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
              <span>Proximity to roads, infrastructure, and sensitive areas</span>
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
              <span>Environmental factors and regulatory considerations</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <Image
            src="/placeholder.svg?height=400&width=500&text=AI+Analyzing+Topographic+Maps"
            alt="AI analyzing topographic maps"
            width={500}
            height={400}
            className="rounded-lg mb-4 w-full"
          />
          <h3 className="text-xl font-semibold mb-2">Output & Deliverables</h3>
          <p className="text-gray-600 mb-4">
            Our platform provides comprehensive intelligence to guide your plugging operations:
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>• Ranked lists of wells by estimated plugging cost</li>
            <li>• Detailed cost breakdowns and confidence scores</li>
            <li>• Precise location data with accessibility ratings</li>
            <li>• Exportable reports for bidding and planning</li>
          </ul>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">See Our Platform in Action</Button>
        </div>
      </div>
    </section>
  )
}
