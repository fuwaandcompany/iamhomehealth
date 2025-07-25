'use client';

import Image from 'next/image';
import Chatbot from "@/components/Chatbot";
import ContactForm from "@/components/ContactForm";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import InsuranceProvidersSection from "@/components/InsuranceProvidersSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          >
            <source src="/images/hero-bg.mp4" type="video/mp4" />
            <Image
              src="/images/hero-bg-fallback.jpg"
              alt="Healthcare professionals providing compassionate care"
              fill
              className="object-cover"
            />
          </video>
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/50" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
              IAM Home Health Care Services LLC
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto drop-shadow-md">
              Compassionate Care in the Comfort of Your Home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => scrollToSection('#contact')}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Schedule Free Consultation
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all backdrop-blur-sm"
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('#services')}
            className="text-white/80 hover:text-white transition-colors animate-bounce drop-shadow-lg"
            aria-label="Scroll to services"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Services Section */}
      <Section
        id="services"
        title="Our Home Health Services"
        subtitle="Comprehensive care services delivered with compassion and expertise in the comfort of your own home"
        background="gray"
        containerClassName="max-w-6xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-6 flex justify-center">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-900">{service.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* About Us Section */}
      <Section
        id="about"
        title="About IAM Home Health Care Services"
        subtitle="Dedicated to providing exceptional home health care with a personal touch"
        background="white"
        containerClassName="max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg">
              <p className="text-gray-600 leading-relaxed">
                IAM Home Health Care Services LLC is committed to delivering compassionate, 
                professional healthcare services in the comfort and privacy of your own home. 
                Our team of licensed healthcare professionals brings years of experience and 
                dedication to every patient we serve.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We understand that every patient has unique needs, which is why we create 
                personalized care plans that address your specific health goals and lifestyle requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Emergency Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Licensed</div>
                <div className="text-sm text-gray-600">Healthcare Professionals</div>
                <div className="text-xs text-blue-600 font-medium mt-1">RSA-02989</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Personalized</div>
                <div className="text-sm text-gray-600">Care Plans</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To enhance the quality of life for our patients by providing exceptional, 
                compassionate home health care services that promote healing, independence, 
                and dignity.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Compassionate Care
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Professional Excellence
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Patient-Centered Approach
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Continuous Improvement
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Licensed & Certified</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">RSA License</span>
                  <span className="text-blue-600 font-bold text-lg">RSA-02989</span>
                </div>
                <p className="text-sm text-gray-600">
                  Fully licensed home health care agency in the state of Maryland, 
                  ensuring compliance with all regulatory standards and quality care requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Insurance Providers Section */}
      <InsuranceProvidersSection />

      {/* Service Area Section */}
      <ServiceAreaSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <Section
        id="contact"
        title="Contact Us"
        subtitle="Ready to get started? Contact us today for a free consultation"
        background="gray"
        containerClassName="max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=14201+Laurel+Park+Drive+%23118,+Laurel,+Maryland+20707"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      14201 Laurel Park Drive #118<br />
                      Laurel, Maryland 20707
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:3015351344" className="text-blue-600 hover:underline text-lg">
                      (301) 535-1344
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Business Hours</p>
                    <p className="text-gray-600">9:00AM to 5:00PM<br />Monday to Friday</p>
                    <p className="text-sm text-blue-600 font-medium">24/7 Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.013964295679!2d-76.8729646846496!3d39.08528297954316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7d1e2e2e2e2e2%3A0x0!2s14201%20Laurel%20Park%20Dr%20%23118%2C%20Laurel%2C%20MD%2020707!5e0!3m2!1sen!2sus!4v1718040000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

const services = [
  {
    image: "/images/services/skilled-nursing.png",
    title: "Skilled Nursing Care",
    description: "Professional nursing services provided by licensed nurses in the comfort of your home.",
  },
  {
    image: "/images/services/medication-management.png",
    title: "Medication Management",
    description: "Expert assistance with medication administration and management.",
  },
  {
    image: "/images/services/physical-therapy.png",
    title: "Physical Therapy",
    description: "Personalized physical therapy programs to improve mobility and strength.",
  },
  {
    image: "/images/services/occupational-therapy.png",
    title: "Occupational Therapy",
    description: "Help with daily living activities and adaptive equipment training.",
  },
  {
    image: "/images/services/speech-therapy.png",
    title: "Speech Therapy",
    description: "Specialized speech and language therapy services.",
  },
  {
    image: "/images/services/personal-care.png",
    title: "Personal Care",
    description: "Assistance with daily activities and personal hygiene.",
  },
  {
    image: "/images/services/echocardiogram.png",
    title: "Echocardiogram",
    description: "On-site heart ultrasound services for comprehensive cardiac assessment.",
  },
  {
    image: "/images/services/emergency-transport.png",
    title: "Non-medical Emergency Transportation",
    description: "Reliable transportation services for medical appointments and emergencies.",
  },
];
