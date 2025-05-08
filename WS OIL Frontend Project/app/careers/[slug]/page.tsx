import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Job listings data
const jobListings = {
  "senior-ml-engineer": {
    title: "Senior Machine Learning Engineer",
    department: "Engineering",
    location: "Columbus, OH (Hybrid)",
    employmentType: "Full-time",
    salary: "$130,000 - $160,000",
    description:
      "Join our AI team to develop and improve our machine learning models for well identification and cost prediction. You'll be working on cutting-edge computer vision and geospatial analysis models that help identify orphan wells and predict plugging costs.",
    responsibilities: [
      "Design, develop, and implement machine learning models for geospatial data analysis",
      "Optimize existing models for improved accuracy and performance",
      "Collaborate with data scientists and engineers to integrate models into production systems",
      "Stay current with the latest advancements in machine learning and AI",
      "Mentor junior team members and contribute to the team's technical direction",
      "Participate in research and development of new AI approaches for well identification",
      "Contribute to technical documentation and knowledge sharing",
    ],
    requirements: [
      "5+ years of experience in machine learning engineering",
      "Strong Python skills and experience with ML frameworks (TensorFlow, PyTorch)",
      "Experience with computer vision and geospatial data analysis",
      "MS or PhD in Computer Science, Machine Learning, or related field",
      "Experience with cloud-based ML infrastructure (AWS, GCP, or Azure)",
      "Strong understanding of deep learning architectures and techniques",
      "Experience with model deployment and monitoring in production environments",
      "Excellent problem-solving and communication skills",
    ],
    preferred: [
      "Experience with satellite imagery or remote sensing data",
      "Knowledge of the oil and gas industry",
      "Experience with historical map processing or document analysis",
      "Publications in relevant ML/AI conferences or journals",
      "Experience with MLOps and CI/CD for machine learning",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work schedule and hybrid work environment",
      "Professional development budget",
      "Paid time off and company holidays",
      "Parental leave",
      "Company-sponsored events and team building activities",
    ],
  },
  "geospatial-data-scientist": {
    title: "Geospatial Data Scientist",
    department: "Data Science",
    location: "Remote",
    employmentType: "Full-time",
    salary: "$110,000 - $140,000",
    description:
      "Help us extract valuable insights from historical maps, satellite imagery, and terrain data. You'll be working with a diverse set of geospatial data sources to identify patterns and features relevant to orphan well identification and accessibility analysis.",
    responsibilities: [
      "Analyze geospatial data to identify patterns and extract features relevant to well identification",
      "Develop and implement algorithms for processing historical maps and satellite imagery",
      "Create and maintain data pipelines for geospatial data processing",
      "Collaborate with ML engineers to develop training datasets for machine learning models",
      "Perform terrain analysis to assess well accessibility and equipment requirements",
      "Develop methodologies for validating and improving geospatial data quality",
      "Document processes and findings for knowledge sharing across the team",
    ],
    requirements: [
      "3+ years of experience in geospatial data analysis",
      "Strong Python skills and experience with geospatial libraries (GDAL, Rasterio, GeoPandas)",
      "Experience with remote sensing data and image processing",
      "MS or PhD in GIS, Remote Sensing, Geography, or related field",
      "Proficiency with GIS software (ArcGIS, QGIS)",
      "Experience with spatial databases and SQL",
      "Strong analytical and problem-solving skills",
    ],
    preferred: [
      "Knowledge of oil and gas industry",
      "Experience with historical map analysis",
      "Familiarity with machine learning techniques for geospatial data",
      "Experience with cloud-based geospatial processing (AWS, GCP)",
      "Background in environmental science or geology",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible remote work policy",
      "Home office stipend",
      "Professional development budget",
      "Paid time off and company holidays",
      "Quarterly in-person team gatherings (travel expenses covered)",
    ],
  },
  "frontend-developer": {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Columbus, OH (Hybrid)",
    employmentType: "Full-time",
    salary: "$100,000 - $130,000",
    description:
      "Build intuitive and powerful interfaces for our well analysis platform. You'll be creating interactive maps, data visualizations, and user interfaces that help our clients make data-driven decisions about well plugging operations.",
    responsibilities: [
      "Develop and maintain the user interface for our web-based platform",
      "Implement interactive maps and data visualization components",
      "Collaborate with UX designers and backend developers",
      "Optimize application performance and responsiveness",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and contribute to technical decisions",
      "Stay current with frontend development best practices and emerging technologies",
    ],
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern CSS",
      "Experience with mapping libraries (Mapbox, Leaflet, or similar)",
      "Knowledge of data visualization libraries (D3.js, Chart.js, or similar)",
      "BS in Computer Science or equivalent experience",
      "Understanding of responsive design principles",
      "Experience with frontend testing frameworks",
    ],
    preferred: [
      "Experience with Next.js or similar React frameworks",
      "Knowledge of GIS concepts and geospatial data visualization",
      "Experience with state management libraries (Redux, MobX, Zustand)",
      "Understanding of accessibility standards and best practices",
      "Experience with design systems and component libraries",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work schedule and hybrid work environment",
      "Professional development budget",
      "Paid time off and company holidays",
      "Parental leave",
      "Company-sponsored events and team building activities",
    ],
  },
  "account-executive": {
    title: "Account Executive",
    department: "Sales",
    location: "Remote",
    employmentType: "Full-time",
    salary: "$90,000 - $120,000 + Commission",
    description:
      "Drive growth by building relationships with plugging companies and state agencies. You'll be responsible for demonstrating the value of our platform to potential clients and helping them understand how our technology can improve their operations.",
    responsibilities: [
      "Develop and maintain relationships with key clients in the well plugging industry",
      "Conduct product demonstrations and presentations",
      "Collaborate with the product team to address client needs",
      "Meet and exceed sales targets",
      "Represent the company at industry events and conferences",
      "Maintain accurate records in our CRM system",
      "Provide feedback to product and marketing teams based on client interactions",
    ],
    requirements: [
      "5+ years of sales experience, preferably in SaaS or the energy sector",
      "Strong understanding of the oil and gas industry",
      "Excellent communication and presentation skills",
      "Track record of meeting or exceeding sales targets",
      "Bachelor's degree in Business, Marketing, or related field",
      "Experience with CRM systems (Salesforce preferred)",
      "Ability to travel up to 25% of the time",
    ],
    preferred: [
      "Experience selling to state agencies or government entities",
      "Knowledge of well plugging operations or environmental remediation",
      "Understanding of GIS or data analytics platforms",
      "Experience with consultative selling approaches",
      "Network of contacts in the oil and gas industry",
    ],
    benefits: [
      "Competitive base salary plus uncapped commission",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible remote work policy",
      "Home office stipend",
      "Paid time off and company holidays",
      "Sales incentive trips for top performers",
      "Professional development opportunities",
    ],
  },
}

export default function JobPostingPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const job = jobListings[slug as keyof typeof jobListings]

  if (!job) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/careers">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.department}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{job.location}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.employmentType}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.salary}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About the Role</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Preferred Qualifications</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.preferred.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-gray-600 mb-6">
            Send your resume and a brief cover letter explaining why you're interested in this role.
          </p>
          <a href={`mailto:info@wellscout.com?subject=Application for ${job.title} Position`}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Apply Now
            </Button>
          </a>
        </div>
      </div>
    </main>
  )
}
