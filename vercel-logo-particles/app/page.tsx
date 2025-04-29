import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import Benefits from "@/components/benefits"
import Technology from "@/components/technology"
import Platform from "@/components/platform"
import Pricing from "@/components/pricing"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <HowItWorks />
        <Separator className="bg-gray-200" />
        <Benefits />
        <Separator className="bg-gray-200" />
        <Technology />
        <Separator className="bg-gray-200" />
        <Platform />
        <Separator className="bg-gray-200" />
        <Pricing />
        <Separator className="bg-gray-200" />
        <Testimonials />
        <Separator className="bg-gray-200" />
        <CTA />
        <Separator className="bg-gray-200" />
        <FAQ />
      </div>
    </main>
  )
}
