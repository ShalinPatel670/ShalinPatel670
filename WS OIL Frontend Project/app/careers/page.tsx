import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareersPage() {
  const jobListings = [
    {
      id: 1,
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "Columbus, OH (Hybrid)",
      slug: "senior-ml-engineer",
      description:
        "Join our AI team to develop and improve our machine learning models for well identification and cost prediction.",
      responsibilities: [
        "Design, develop, and implement machine learning models for geospatial data analysis",
        "Optimize existing models for improved accuracy and performance",
        "Collaborate with data scientists and engineers to integrate models into production systems",
        "Stay current with the latest advancements in machine learning and AI",
      ],
      requirements: [
        "5+ years of experience in machine learning engineering",
        "Strong Python skills and experience with ML frameworks (TensorFlow, PyTorch)",
        "Experience with computer vision and geospatial data analysis",
        "MS or PhD in Computer Science, Machine Learning, or related field",
        "Experience with cloud-based ML infrastructure (AWS, GCP, or Azure)",
      ],
    },
    {
      id: 2,
      title: "Geospatial Data Scientist",
      department: "Data Science",
      location: "Remote",
      slug: "geospatial-data-scientist",
      description: "Help us extract valuable insights from historical maps, satellite imagery, and terrain data.",
      responsibilities: [
        "Analyze geospatial data to identify patterns and extract features relevant to well identification",
        "Develop and implement algorithms for processing historical maps and satellite imagery",
        "Create and maintain data pipelines for geospatial data processing",
        "Collaborate with ML engineers to develop training datasets for machine learning models",
      ],
      requirements: [
        "3+ years of experience in geospatial data analysis",
        "Strong Python skills and experience with geospatial libraries (GDAL, Rasterio, GeoPandas)",
        "Experience with remote sensing data and image processing",
        "MS or PhD in GIS, Remote Sensing, Geography, or related field",
        "Knowledge of oil and gas industry is a plus",
      ],
    },
    {
      id: 3,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Columbus, OH (Hybrid)",
      slug: "frontend-developer",
      description: "Build intuitive and powerful interfaces for our well analysis platform.",
      responsibilities: [
        "Develop and maintain the user interface for our web-based platform",
        "Implement interactive maps and data visualization components",
        "Collaborate with UX designers and backend developers",
        "Optimize application performance and responsiveness",
      ],
      requirements: [
        "3+ years of experience in frontend development",
        "Strong proficiency in React, TypeScript, and modern CSS",
        "Experience with mapping libraries (Mapbox, Leaflet, or similar)",
        "Knowledge of data visualization libraries (D3.js, Chart.js, or similar)",
        "BS in Computer Science or equivalent experience",
      ],
    },
    {
      id: 4,
      title: "Account Executive",
      department: "Sales",
      location: "Remote",
      slug: "account-executive",
      description: "Drive growth by building relationships with plugging companies and state agencies.",
      responsibilities: [
        "Develop and maintain relationships with key clients in the well plugging industry",
        "Conduct product demonstrations and presentations",
        "Collaborate with the product team to address client needs",
        "Meet and exceed sales targets",
      ],
      requirements: [
        "5+ years of sales experience, preferably in SaaS or the energy sector",
        "Strong understanding of the oil and gas industry",
        "Excellent communication and presentation skills",
        "Track record of meeting or exceeding sales targets",
        "Bachelor's degree in Business, Marketing, or related field",
      ],
    },
  ]

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
          <h1 className="text-4xl font-bold mb-4">Careers at WellScout</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our team and help revolutionize the orphan well plugging industry with AI.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Work With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Meaningful Impact</h3>
              <p className="text-gray-600">
                Our work directly contributes to environmental remediation by helping plug abandoned oil and gas wells
                more efficiently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovative Environment</h3>
              <p className="text-gray-600">
                We're constantly pushing the boundaries of what's possible with AI, geospatial analysis, and machine
                learning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Team</h3>
              <p className="text-gray-600">
                Work with a diverse team of experts in data science, geospatial analysis, and oil industry veterans.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-6">
            {jobListings.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    {job.department} | {job.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        {job.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        {job.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/careers/${job.slug}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">View Job Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            We're always interested in connecting with talented individuals. Send us your resume and let us know how you
            can contribute to our mission.
          </p>
          <a href="mailto:info@wellscout.com">
            <Button className="bg-blue-600 hover:bg-blue-700">Submit Your Resume</Button>
          </a>
        </div>
      </div>
    </main>
  )
}
