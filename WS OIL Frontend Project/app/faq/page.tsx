import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import FAQ from "@/components/faq"

export default function FAQPage() {
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
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about WellScout's platform and services.
          </p>
        </div>

        <FAQ />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Our team is ready to help you with any additional questions you might have about our platform.
          </p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">Contact Us</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
