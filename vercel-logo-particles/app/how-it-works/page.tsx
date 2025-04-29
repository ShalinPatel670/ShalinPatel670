import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ArrowRight, Search, Database, BarChart3 } from "lucide-react"

export default function HowItWorksPage() {
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
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about WellScout's innovative approach to identifying and evaluating orphan wells.
          </p>
        </div>

        <section>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
              <p className="text-gray-600">
                We aggregate USGS Historical Topographic Maps, satellite imagery, and public records to build a
                comprehensive dataset of potential orphan wells.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our machine learning algorithms analyze terrain, accessibility, historical features, and environmental
                factors to predict plugging costs with high accuracy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actionable Results</h3>
              <p className="text-gray-600">
                Receive ranked lists of wells with detailed cost estimates, location data, and accessibility information
                to optimize your plugging operations.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#technology" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              Learn more about our technology <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to see WellScout in action?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Schedule a demo to see how our platform can transform your plugging operations.
          </p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">Request a Demo</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
