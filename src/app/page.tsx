import Link from "next/link";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            IAM Home Health Care Services LLC
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Compassionate Care in the Comfort of Your Home
          </p>
          <Link
            href="#contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Home Health Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Contact Us
          </h2>
          <div className="mb-8 text-center space-y-2">
            <div>
              <span className="font-semibold">Address: </span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=14201+Laurel+Park+Drive+%23118,+Laurel,+Maryland+20707"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                14201 Laurel Park Drive #118, Laurel, Maryland 20707
              </a>
            </div>
            <div>
              <span className="font-semibold">Phone: </span>
              <a href="tel:3015021384" className="text-blue-600 hover:underline">(301) 502-1384</a>
            </div>
            <div>
              <span className="font-semibold">Business Hours: </span>
              <span>9:00AM to 5:00PM, Monday to Friday</span>
            </div>
          </div>
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
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
          <form
            name="contact"
            method="POST"
            action="/api/contact"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label className="block font-semibold mb-2">I am a:</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="contactType" value="Patient" required className="accent-blue-600" /> Patient
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="contactType" value="Healthcare provider" className="accent-blue-600" /> Healthcare provider
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="contactType" value="Vendor" className="accent-blue-600" /> Vendor
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="contactType" value="Other" className="accent-blue-600" /> Other
                </label>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

const services = [
  {
    icon: "🏥",
    title: "Skilled Nursing Care",
    description: "Professional nursing services provided by licensed nurses in the comfort of your home.",
  },
  {
    icon: "💊",
    title: "Medication Management",
    description: "Expert assistance with medication administration and management.",
  },
  {
    icon: "👨‍⚕️",
    title: "Physical Therapy",
    description: "Personalized physical therapy programs to improve mobility and strength.",
  },
  {
    icon: "👩‍⚕️",
    title: "Occupational Therapy",
    description: "Help with daily living activities and adaptive equipment training.",
  },
  {
    icon: "💬",
    title: "Speech Therapy",
    description: "Specialized speech and language therapy services.",
  },
  {
    icon: "❤️",
    title: "Personal Care",
    description: "Assistance with daily activities and personal hygiene.",
  },
  {
    icon: "💓",
    title: "Echocardiogram",
    description: "On-site heart ultrasound services for comprehensive cardiac assessment.",
  },
  {
    icon: "🚑",
    title: "Non-medical Emergency Transportation",
    description: "Reliable transportation services for medical appointments and emergencies.",
  },
];
