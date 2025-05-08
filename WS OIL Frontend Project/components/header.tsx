"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()

    if (isHomePage) {
      // If on home page, just scroll to the section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    } else {
      // If on another page, navigate to home page with hash
      window.location.href = `/#${sectionId}`
    }
  }

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.location.href = "/"
    }
  }

  return (
    <header className="bg-black text-white fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="#" className="flex items-end" onClick={scrollToTop}>
              <Image
                src="/images/ws-oil-logo-shine.png"
                alt="WS OIL"
                width={180}
                height={58}
                className="h-10 w-auto mb-[-4px]"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={(e) => scrollToSection(e, "how-it-works")}
            >
              How It Works
            </a>
            <a
              href="#technology"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={(e) => scrollToSection(e, "technology")}
            >
              Technology
            </a>
            <a
              href="#platform"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={(e) => scrollToSection(e, "platform")}
            >
              Platform
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={(e) => scrollToSection(e, "pricing")}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={(e) => scrollToSection(e, "contact")}
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center">
            <Link href="/request-demo">
              <Button className="bg-blue-600 hover:bg-blue-700">Request Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="#how-it-works"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                scrollToSection(e, "how-it-works")
                setIsMenuOpen(false)
              }}
            >
              How It Works
            </a>
            <a
              href="#technology"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                scrollToSection(e, "technology")
                setIsMenuOpen(false)
              }}
            >
              Technology
            </a>
            <a
              href="#platform"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                scrollToSection(e, "platform")
                setIsMenuOpen(false)
              }}
            >
              Platform
            </a>
            <a
              href="#pricing"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                scrollToSection(e, "pricing")
                setIsMenuOpen(false)
              }}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                scrollToSection(e, "contact")
                setIsMenuOpen(false)
              }}
            >
              Contact
            </a>
            <div className="pt-4 flex flex-col">
              <Link href="/request-demo">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">Request Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
