"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function RequestDemoPage() {
  // This useEffect ensures the script is loaded after component mount
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://form.jotform.com/jsform/251266636886167"
    script.type = "text/javascript"
    script.async = true

    const container = document.getElementById("jotform-demo-container")
    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script)
      }
    }
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Request a Demo</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how WS OIL can transform your plugging operations with AI-powered insights.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div id="jotform-demo-container">{/* Jotform will be loaded here via useEffect */}</div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Schedule a Call</h3>
              <p className="text-gray-600">Our team will reach out within 24 hours to schedule a personalized demo.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Personalized Demo</h3>
              <p className="text-gray-600">See how our platform can address your specific plugging operation needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Implementation Plan</h3>
              <p className="text-gray-600">Get a customized plan for integrating our solution into your workflow.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
