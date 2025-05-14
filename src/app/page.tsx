import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            IAM Home Health Services, LLC
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
          <form
            name="contact"
            method="POST"
            action="/api/contact"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
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
]
