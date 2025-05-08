"use client"

import { useEffect, useRef } from "react"

export default function CTA() {
  const jotformContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up any existing scripts first
    if (jotformContainerRef.current) {
      const existingScripts = jotformContainerRef.current.querySelectorAll("script")
      existingScripts.forEach((script) => script.remove())
    }

    // Create and append the script
    const script = document.createElement("script")
    script.src = "https://form.jotform.com/jsform/251266656681162"
    script.type = "text/javascript"
    script.async = true

    if (jotformContainerRef.current) {
      jotformContainerRef.current.appendChild(script)
    }

    // Cleanup function
    return () => {
      if (jotformContainerRef.current && jotformContainerRef.current.contains(script)) {
        jotformContainerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <section id="contact" className="py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Ready to Find Profitable Wells?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Contact us today to learn how WS OIL can transform your plugging operations with AI-powered insights.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">(614) 546-9965</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@wellscout.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">Columbus, OH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <div ref={jotformContainerRef} className="min-h-[400px]">
            {/* Jotform will be loaded here */}
          </div>
        </div>
      </div>
    </section>
  )
}
