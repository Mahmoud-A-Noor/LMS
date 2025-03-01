"use client";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

// Icons
import { 
  ChevronRight, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  BarChart, 
  PlayCircle,
  CheckCircle,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Extensive Course Library",
      description: "Access thousands of courses across various subjects and skill levels"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Collaborative Learning",
      description: "Connect with peers and instructors through forums and live sessions"
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Certifications",
      description: "Earn industry-recognized certificates upon course completion"
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with self-paced and scheduled courses"
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    },
    {
      icon: <PlayCircle className="h-6 w-6 text-primary" />,
      title: "Interactive Content",
      description: "Engage with multimedia lessons, quizzes, and hands-on projects"
    }
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      image: "/placeholder/100/100",
      quote: "This LMS platform transformed my career trajectory. The courses are comprehensive and the instructors are top-notch."
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image: "/placeholder/100/100",
      quote: "I've tried many learning platforms, but this one offers the perfect balance of flexibility and structure. Highly recommended!"
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      image: "/placeholder/100/100",
      quote: "The certification programs helped me stand out in a competitive job market. Worth every penny."
    }
  ];
  
  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "monthly",
      features: [
        "Access to 100+ courses",
        "Basic progress tracking",
        "Forum support",
        "Mobile access"
      ]
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "monthly",
      features: [
        "Access to 1000+ courses",
        "Advanced analytics",
        "Live webinars",
        "Certification options",
        "Priority support",
        "Offline downloads"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "monthly",
      features: [
        "Unlimited course access",
        "Team management tools",
        "Custom learning paths",
        "API integration",
        "Dedicated account manager",
        "White labeling options",
        "SSO integration"
      ]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnPro</span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#courses" className="text-sm font-medium hover:text-primary transition-colors">Courses</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Sign In</a>
                <a 
                  href="#" 
                  className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Get Started
                </a>
              </div>
              
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a 
                href="#features" 
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#courses" 
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </a>
              <a 
                href="#testimonials" 
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="block text-base font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="pt-4 border-t border-border space-y-4">
                <a 
                  href="#" 
                  className="block text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a 
                  href="#" 
                  className="block w-full px-4 py-2 rounded-md bg-primary text-white text-center text-base font-medium hover:bg-primary-dark transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Elevate Your Learning Experience
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    Access world-class courses, expert instructors, and a vibrant learning community all in one platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="#" 
                      className="px-6 py-3 rounded-md bg-primary text-white text-center font-medium hover:bg-primary-dark transition-colors"
                    >
                      Get Started Free
                    </a>
                    <a 
                      href="#" 
                      className="px-6 py-3 rounded-md border border-border bg-background hover:bg-muted text-center font-medium transition-colors flex items-center justify-center"
                    >
                      Watch Demo <PlayCircle className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
                >
                  <Image 
                    src="/api/placeholder/800/450" 
                    alt="Learning platform interface" 
                    width={800} 
                    height={450}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-multiply"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">10k+</p>
                <p className="text-sm mt-2">Courses Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">250+</p>
                <p className="text-sm mt-2">Expert Instructors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">1M+</p>
                <p className="text-sm mt-2">Active Learners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">95%</p>
                <p className="text-sm mt-2">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Learning Features</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to achieve your learning goals, all in one platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 p-2 rounded-full inline-flex bg-primary/10 w-12 h-12 items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Courses Section */}
        <section id="courses" className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Courses</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Explore our top-rated courses across various categories
                </p>
              </div>
              <a href="#" className="mt-4 md:mt-0 inline-flex items-center text-primary font-medium hover:underline">
                View all courses <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((course) => (
                <motion.div
                  key={course}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: course * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={`/api/placeholder/400/225`}
                      alt="Course thumbnail"
                      width={400}
                      height={225}
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                      {course === 1 ? "Beginner" : course === 2 ? "Intermediate" : "Advanced"}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-4 w-4" />
                      8 weeks
                      <span className="mx-2">•</span>
                      <Users className="mr-1 h-4 w-4" />
                      2.4k students
                    </div>
                    <h3 className="font-bold text-xl mb-2">
                      {course === 1 
                        ? "Introduction to Data Science" 
                        : course === 2 
                          ? "Web Development Masterclass" 
                          : "Advanced Machine Learning"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {course === 1 
                        ? "Learn the fundamentals of data analysis, visualization, and machine learning" 
                        : course === 2 
                          ? "Build responsive web applications with modern frameworks" 
                          : "Master advanced ML algorithms and techniques"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-lg">
                        ${course === 1 ? "49.99" : course === 2 ? "79.99" : "99.99"}
                      </div>
                      <a 
                        href="#" 
                        className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        Enroll Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Learners Say</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Hear from students who have transformed their careers with our platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that fits your learning goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-card p-6 rounded-lg border ${
                    plan.popular 
                      ? "border-primary shadow-md relative" 
                      : "border-border"
                  } hover:shadow-lg transition-shadow`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className={`w-full block text-center py-2 rounded-md font-medium transition-colors ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-muted hover:bg-muted-foreground/10"
                    }`}
                  >
                    {plan.popular ? "Get Started" : "Choose Plan"}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-lg overflow-hidden">
              <div className="px-6 py-12 md:p-12 md:flex items-center justify-between">
                <div className="md:max-w-2xl mb-8 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Ready to start your learning journey?
                  </h2>
                  <p className="text-primary-foreground md:text-lg">
                    Join thousands of learners already transforming their careers with LearnPro.
                    Get started today with a 7-day free trial.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="px-6 py-3 rounded-md bg-white text-primary text-center font-medium hover:bg-gray-100 transition-colors"
                  >
                    Start Free Trial
                  </a>
                  <a
                    href="#"
                    className="px-6 py-3 rounded-md border border-white/30 text-white text-center font-medium hover:bg-white/10 transition-colors"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <a href="#" className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnPro</span>
              </a>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                LearnPro is a leading learning management system empowering individuals and organizations to achieve their learning goals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Webinars</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} LearnPro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
