import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section id="faq" className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get answers to common questions about our platform and services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How accurate are your cost estimates?</AccordionTrigger>
            <AccordionContent>
              Our cost estimates are typically within 15-20% of actual plugging costs. Each estimate includes a
              confidence score based on the quality and quantity of data available. We continuously refine our models
              based on feedback from completed projects to improve accuracy over time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What regions do you currently cover?</AccordionTrigger>
            <AccordionContent>
              We currently cover major oil-producing states including Texas, Oklahoma, Pennsylvania, West Virginia,
              Ohio, New Mexico, Colorado, Wyoming, and California. We're rapidly expanding to additional states and can
              prioritize specific regions based on client needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How do you identify wells that aren't in state databases?</AccordionTrigger>
            <AccordionContent>
              We use machine learning algorithms to analyze USGS Historical Topographic Maps dating back to the early
              1900s. These maps often show well locations that were never properly documented or have been lost from
              official records. Our AI can identify characteristic symbols and patterns that indicate well locations,
              even when partially obscured or in degraded map sections.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I export data to my existing systems?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer multiple export formats including CSV, Excel, PDF, and GIS-compatible formats (Shapefile,
              KML, GeoJSON). Our Professional and Enterprise plans include API access for direct integration with your
              existing systems. We can also develop custom integrations for Enterprise clients.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How often is your data updated?</AccordionTrigger>
            <AccordionContent>
              Our base datasets (historical maps, terrain data) are updated quarterly. State regulatory databases are
              synchronized monthly. Satellite imagery is updated annually or more frequently in areas of high interest.
              Our AI models are retrained every six months to incorporate new data patterns and improve accuracy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Do you offer training and support?</AccordionTrigger>
            <AccordionContent>
              All plans include access to our knowledge base and video tutorials. Professional plans include email
              support with 24-hour response time and monthly training webinars. Enterprise plans include a dedicated
              account manager, custom training sessions, and priority support with 4-hour response time during business
              hours.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
