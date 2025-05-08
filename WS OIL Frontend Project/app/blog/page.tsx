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
      title: "Improving Orphan Well Identification with AI",
      description:
        "How AI is revolutionizing the process of finding and evaluating orphan wells for plugging operations.",
      date: "April 7, 2025",
      image: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b86?q=80&w=2070&auto=format&fit=crop",
      slug: "improving-orphan-well-identification-with-ai",
      author: "Dr. James Wilson",
      authorRole: "Chief Data Scientist",
    },
    {
      id: 2,
      title: "The Economics of Well Plugging",
      description: "Understanding the financial aspects of orphan well plugging and how to maximize profitability.",
      date: "March 22, 2025",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
      slug: "economics-of-well-plugging",
      author: "Sarah Johnson",
      authorRole: "Financial Analyst",
    },
    {
      id: 3,
      title: "Historical Maps: A Hidden Treasure for Well Identification",
      description: "How USGS topographic maps provide valuable data for identifying undocumented orphan wells.",
      date: "March 15, 2025",
      image: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=2070&auto=format&fit=crop",
      slug: "historical-maps-hidden-treasure",
      author: "Michael Chen",
      authorRole: "Geospatial Analyst",
    },
    {
      id: 4,
      title: "Terrain Analysis for Well Access",
      description: "Using satellite imagery and elevation data to determine the accessibility of orphan wells.",
      date: "February 28, 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
      slug: "terrain-analysis-for-well-access",
      author: "Dr. Emily Rodriguez",
      authorRole: "Terrain Analysis Specialist",
    },
    {
      id: 5,
      title: "Environmental Impact of Orphan Wells",
      description:
        "Understanding the environmental risks posed by unplugged orphan wells and the benefits of remediation.",
      date: "February 14, 2025",
      image: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop",
      slug: "environmental-impact-of-orphan-wells",
      author: "Dr. Thomas Green",
      authorRole: "Environmental Scientist",
    },
    {
      id: 6,
      title: "Federal Funding for Well Plugging",
      description: "Navigating the landscape of federal grants and programs for orphan well plugging projects.",
      date: "January 30, 2025",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
      slug: "federal-funding-for-well-plugging",
      author: "Lisa Martinez",
      authorRole: "Government Relations Specialist",
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
            <Card key={post.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={`Blog post: ${post.title}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="mb-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-600">{post.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="text-blue-600 p-0 hover:text-blue-800 hover:bg-transparent">
                      Read More →
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
