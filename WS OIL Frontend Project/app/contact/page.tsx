import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CTA from "@/components/cta"

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team to learn more about WellScout or request a demo.
          </p>
        </div>

        <CTA />

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Visit Our Office</h2>
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5123616755213!2d-83.00324638429787!3d39.96226897941787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388f2f5cae7857%3A0x2f4dab1f1a5ef2bb!2sColumbus%2C%20OH!5e0!3m2!1sen!2sus!4v1649357591123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="WellScout Office Location"
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">WellScout Headquarters</p>
            <p className="text-gray-600">123 Tech Avenue, Suite 400</p>
            <p className="text-gray-600">Columbus, OH 43215</p>
            <p className="text-gray-600 mt-2">(614)-546-9965</p>
            <p className="text-gray-600">info@wellscout.com</p>
          </div>
        </div>
      </div>
    </main>
  )
}
