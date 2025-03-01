import React from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

const Footer = () => {

  // Define footer links based on user role
  const footerLinks = [
    { name: 'Browse Courses', href: '/browse' },
    { name: 'My Learning', href: '/courses' },
    { name: 'Certificates', href: '/certificates' },
  ]

  const resources = [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com' },
    { icon: FaTwitter, href: 'https://twitter.com' },
    { icon: FaInstagram, href: 'https://instagram.com' },
    { icon: FaLinkedin, href: 'https://linkedin.com' },
  ]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Logo and About */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-xl font-bold">
              LMS
            </Link>
            <p className="text-gray-300 text-sm">
              Our learning management system offers comprehensive courses to help you master new skills and advance your career.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-6">
              {socialLinks.map((item, index) => {
                const Icon = item.icon
                return (
                  <a key={index} href={item.href} className="text-gray-400 hover:text-white">
                    <Icon className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
          </div>
          
          {/* Links Sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              {/* User Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-gray-300 hover:text-white text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Resources */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  {resources.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-gray-300 hover:text-white text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Company */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {company.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-gray-300 hover:text-white text-sm">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} LMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer