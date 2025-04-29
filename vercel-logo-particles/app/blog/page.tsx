import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  // Blog post data with images
  const blogPosts = [
    {
      id: 1,
      title: "Improving Orphan Well Identification",
      description:
        "How AI is revolutionizing the process of finding and evaluating orphan wells for plugging operations.",
      date: "April 7, 2025",
      image: "/placeholder.svg?height=200&width=400&text=AI+Well+Detection",
    },
    {
      id: 2,
      title: "The Economics of Well Plugging",
      description: "Understanding the financial aspects of orphan well plugging and how to maximize profitability.",
      date: "March 22, 2025",
      image: "/placeholder.svg?height=200&width=400&text=Well+Economics",
    },
    {
      id: 3,
      title: "Historical Maps: A Hidden Treasure",
      description: "How USGS topographic maps provide valuable data for identifying undocumented orphan wells.",
      date: "March 15, 2025",
      image: "/placeholder.svg?height=200&width=400&text=Historical+Maps",
    },
    {
      id: 4,
      title: "Terrain Analysis for Well Access",
      description: "Using satellite imagery and elevation data to determine the accessibility of orphan wells.",
      date: "February 28, 2025",
      image: "/placeholder.svg?height=200&width=400&text=Terrain+Analysis",
    },
    {
      id: 5,
      title: "Environmental Impact of Orphan Wells",
      description:
        "Understanding the environmental risks posed by unplugged orphan wells and the benefits of remediation.",
      date: "February 14, 2025",
      image: "/placeholder.svg?height=200&width=400&text=Environmental+Impact",
    },
    {
      id: 6,
      title: "Federal Funding for Well Plugging",
      description: "Navigating the landscape of federal grants and programs for orphan well plugging projects.",
      date: "January 30, 2025",
      image: "/placeholder.svg?height=200&width=400&text=Federal+Funding",
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
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Insights, news, and updates from the WellScout team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="p-0">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={`Blog post: ${post.title}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="mb-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-600">{post.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Button variant="ghost" className="text-blue-600 p-0 hover:text-blue-800 hover:bg-transparent">
                    Read More →
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
