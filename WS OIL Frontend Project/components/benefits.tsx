import { DollarSign, Clock, Target, Award } from "lucide-react"

export default function Benefits() {
  return (
    <section id="benefits" className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Why Choose WellScout</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our platform delivers measurable advantages that directly impact your bottom line and operational efficiency.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Maximize Profitability</h3>
            <p className="text-gray-600">
              Target wells with the lowest plugging costs first, increasing your profit margin on fixed-price contracts.
              Our clients report an average 23% increase in profitability per project.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-gray-600">
              Eliminate weeks of manual research and site visits. Our platform identifies optimal well targets in
              minutes, allowing you to bid on more projects and scale your operations faster.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Improve Bid Accuracy</h3>
            <p className="text-gray-600">
              Develop more precise cost estimates based on AI-analyzed terrain, accessibility, and historical data.
              Reduce the risk of underbidding while remaining competitive.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Unique Insights</h3>
            <p className="text-gray-600">
              Gain exclusive intelligence from our analysis of USGS Historical Topographic Maps that competitors miss.
              Identify hidden opportunities and avoid costly surprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
