import { ArrowRight, Search, Database, BarChart3 } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          WellScout transforms the way you find and evaluate orphan wells for plugging projects, replacing manual
          searches with AI-powered precision.
        </p>
      </div>

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
            Receive ranked lists of wells with detailed cost estimates, location data, and accessibility information to
            optimize your plugging operations.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a href="#technology" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          Learn more about our technology <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
