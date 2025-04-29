import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: April 7, 2025
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              WellScout ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Register for an account</li>
              <li>Sign up for our newsletter</li>
              <li>Request a demo</li>
              <li>Contact our support team</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
            </p>
            
            <h3>2.2 Usage Data</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate our platform. This information does not reveal your specific identity but may include:
            </p>
            <ul>
              <li>Device and browser information</li>
              <li>IP address</li>
              <li>Usage patterns and preferences</li>
              <li>Referring website</li>
              <li>Pages viewed on our site</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Sending administrative information, updates, and marketing communications</li>
              <li>Monitoring and analyzing usage trends</li>
              <li>Protecting our services and users from fraudulent or illegal activity</li>
            </ul>
            
            <h2>4. Disclosure of Your Information</h2>
            <p>
              We may share your information in the following situations:
            </p>
            <ul>
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With your consent or at your direction</li>
              <li>In connection with a business transfer (e.g., merger or acquisition)</li>
            </ul>
            
            <h2>5. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to request deletion of your information</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
            
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2>7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              WellScout<br />
              123 Tech Avenue, Suite 400<br />
              Columbus, OH 43215<br />
              (614)-546-9965
