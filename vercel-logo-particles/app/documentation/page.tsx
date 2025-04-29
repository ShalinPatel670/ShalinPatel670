import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationPage() {
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
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides and resources for using the WellScout platform.
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="user-guide">User Guide</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Getting Started with WellScout</h2>
              <p className="text-gray-600 mb-6">
                Welcome to WellScout! This guide will help you get up and running with our platform quickly.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Creating Your Account</h3>
                  <p className="text-gray-600">
                    After signing up for a plan, you'll receive an email with instructions to set up your account. Click
                    the link in the email and follow the steps to create your password and complete your profile.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Setting Up Your First Project</h3>
                  <p className="text-gray-600">
                    Once logged in, click "New Project" from the dashboard. Give your project a name and select the
                    geographic area you want to analyze. You can choose counties or draw custom boundaries.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Running Your First Analysis</h3>
                  <p className="text-gray-600">
                    After setting up your project, click "Run Analysis" to start the AI processing. This may take a few
                    minutes depending on the size of your selected area. You'll receive a notification when it's
                    complete.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">4. Exploring Results</h3>
                  <p className="text-gray-600">
                    Once the analysis is complete, you'll see a map with identified wells color-coded by estimated
                    plugging cost. Click on any well to see detailed information and cost breakdowns.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700">View Full Getting Started Guide</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user-guide" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">User Guide</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive documentation for all WellScout features and functionality.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Map Interface</h3>
                  <p className="text-gray-600 mb-2">Learn how to use the interactive map to explore well data.</p>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Cost Analytics</h3>
                  <p className="text-gray-600 mb-2">Understanding the cost estimation models and confidence scores.</p>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Exporting Data</h3>
                  <p className="text-gray-600 mb-2">How to export well data in various formats for your workflows.</p>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Account Management</h3>
                  <p className="text-gray-600 mb-2">Managing users, permissions, and subscription settings.</p>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">API Reference</h2>
              <p className="text-gray-600 mb-6">Technical documentation for integrating with the WellScout API.</p>

              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                <p className="text-gray-600 mb-2">
                  All API requests require an API key that can be generated in your account settings.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>
                    {`curl -X GET https://api.wellscout.com/v1/wells \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </code>
                </pre>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Endpoints</h3>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">GET /v1/wells</h4>
                  <p className="text-gray-600">Retrieve a list of wells based on query parameters.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">GET /v1/wells/{"{id}"}</h4>
                  <p className="text-gray-600">Retrieve detailed information about a specific well.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">POST /v1/projects</h4>
                  <p className="text-gray-600">Create a new analysis project.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">GET /v1/projects/{"{id}"}/results</h4>
                  <p className="text-gray-600">Retrieve analysis results for a specific project.</p>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700">View Full API Documentation</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Tutorials</h2>
              <p className="text-gray-600 mb-6">Step-by-step guides for common tasks and workflows.</p>

              <div className="space-y-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Creating a Custom Region for Analysis</h3>
                  <p className="text-gray-600 mb-2">
                    Learn how to draw custom boundaries to focus your analysis on specific areas of interest.
                  </p>
                  <Button variant="outline">View Tutorial</Button>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Exporting Data for Bid Preparation</h3>
                  <p className="text-gray-600 mb-2">
                    How to export well data in formats optimized for preparing bids on plugging contracts.
                  </p>
                  <Button variant="outline">View Tutorial</Button>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Analyzing Cost Factors</h3>
                  <p className="text-gray-600 mb-2">
                    Understanding the different factors that influence plugging cost estimates.
                  </p>
                  <Button variant="outline">View Tutorial</Button>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Integrating with GIS Software</h3>
                  <p className="text-gray-600 mb-2">
                    How to export WellScout data for use in popular GIS applications.
                  </p>
                  <Button variant="outline">View Tutorial</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
