import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Pricing() {
  return (
    <section id="pricing" className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Pricing</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Flexible plans designed to scale with your plugging operations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-2">Starter</h3>
          <p className="text-gray-600 mb-4">For small plugging operations</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$499</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Access to 3 counties of your choice</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Up to 100 well analyses per month</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Basic cost estimation</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>CSV exports</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Email support</span>
            </li>
          </ul>
          <Link href="/request-demo">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg shadow-md border border-blue-200 relative">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            MOST POPULAR
          </div>
          <h3 className="text-xl font-bold mb-2">Professional</h3>
          <p className="text-gray-600 mb-4">For growing plugging companies</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$1,499</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Access to entire states (up to 3)</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Unlimited well analyses</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Advanced cost estimation with confidence scores</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>All export formats</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Priority support with 24-hour response</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>API access</span>
            </li>
          </ul>
          <Link href="/request-demo">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-2">Enterprise</h3>
          <p className="text-gray-600 mb-4">For large-scale operations</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">Custom</span>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Nationwide access</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Unlimited well analyses</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Custom cost models</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>White-labeled reports</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Dedicated account manager</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Custom integrations</span>
            </li>
          </ul>
          <Link href="/request-demo">
            <Button className="w-full" variant="outline">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Not sure which plan is right for you? Contact us for a personalized demo and consultation.
        </p>
        <Link href="/request-demo">
          <Button className="bg-blue-600 hover:bg-blue-700">Schedule a Consultation</Button>
        </Link>
      </div>
    </section>
  )
}
