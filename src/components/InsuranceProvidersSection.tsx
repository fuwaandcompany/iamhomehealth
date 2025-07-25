import Section from './Section';

interface InsuranceProvider {
  name: string;
  logo: string;
  description: string;
  coverage: string[];
  website?: string;
}

const insuranceProviders: InsuranceProvider[] = [
  {
    name: "Medicaid",
    logo: "🏛️",
    description: "State and federal program providing healthcare coverage for eligible low-income individuals",
    coverage: ["Personal Care", "Skilled Nursing", "Medical Transportation", "Therapy Services"],
    website: "medicaid.gov"
  },
  {
    name: "Blue Cross Blue Shield",
    logo: "🔵",
    description: "Leading health insurance provider with comprehensive coverage options",
    coverage: ["All Home Health Services", "Preventive Care", "Emergency Services", "Specialist Care"],
    website: "bcbs.com"
  },
  {
    name: "Aetna",
    logo: "🩺",
    description: "Nationwide health insurance with focus on quality care and wellness",
    coverage: ["Home Health Services", "Chronic Care Management", "Rehabilitation Services"],
    website: "aetna.com"
  },
  {
    name: "UnitedHealthcare",
    logo: "⚕️",
    description: "One of the largest health insurance providers in the United States",
    coverage: ["Health Insurance Plans", "Home Health Services", "Care Coordination"],
    website: "uhc.com"
  },
  {
    name: "Humana",
    logo: "❤️",
    description: "Health insurance focused on wellness and preventive care",
    coverage: ["Health Insurance Plans", "Home Health", "Wellness Programs", "Chronic Care"],
    website: "humana.com"
  },
  {
    name: "Cigna",
    logo: "🌟",
    description: "Global health service company with comprehensive coverage",
    coverage: ["Medical Services", "Home Health", "Behavioral Health", "Pharmacy Benefits"],
    website: "cigna.com"
  },
  {
    name: "Kaiser Permanente",
    logo: "🏨",
    description: "Integrated healthcare system with focus on coordinated care",
    coverage: ["Integrated Care", "Home Health Services", "Preventive Care"],
    website: "kp.org"
  },
  {
    name: "Anthem",
    logo: "🛡️",
    description: "Leading health benefits company serving millions of members",
    coverage: ["Home Health", "Specialty Care", "Wellness Programs", "Care Management"],
    website: "anthem.com"
  }
];

export default function InsuranceProvidersSection() {
  return (
    <Section
      id="insurance"
      title="Insurance Partners & Coverage"
      subtitle="We work with most major insurance providers to ensure you get the care you need with minimal out-of-pocket costs"
      background="white"
      containerClassName="max-w-7xl"
    >
      {/* Main Insurance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {insuranceProviders.map((provider, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
          >
            {/* Provider Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl mr-4">
                {provider.logo}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
                {provider.website && (
                  <p className="text-blue-600 text-sm">{provider.website}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {provider.description}
            </p>

            {/* Coverage Areas */}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Covered Services:</h4>
              <div className="space-y-1">
                {provider.coverage.slice(0, 3).map((service, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {service}
                  </div>
                ))}
                {provider.coverage.length > 3 && (
                  <div className="text-xs text-blue-600 font-medium">
                    +{provider.coverage.length - 3} more services
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insurance Benefits Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Insurance Benefits & Coverage</h3>
          <p className="text-blue-100 max-w-3xl mx-auto">
            We handle the insurance verification process for you, ensuring maximum coverage and minimal hassle. 
            Our dedicated insurance specialists work directly with your provider to secure authorization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Free Benefits Verification</h4>
            <p className="text-blue-100 text-sm">
              We verify your coverage and benefits before starting services, so you know exactly what&apos;s covered.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Maximize Your Benefits</h4>
            <p className="text-blue-100 text-sm">
              Our team works to ensure you receive the maximum coverage available under your plan.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Direct Insurance Billing</h4>
            <p className="text-blue-100 text-sm">
              We bill your insurance directly, reducing paperwork and out-of-pocket expenses for you.
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Statistics */}
      <div className="bg-gray-50 p-8 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600 text-sm">Insurance Acceptance Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24hrs</div>
            <div className="text-gray-600 text-sm">Verification Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">$0</div>
            <div className="text-gray-600 text-sm">Verification Cost to You</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm">Transparent Pricing</div>
          </div>
        </div>
      </div>

      {/* Contact for Insurance Questions */}
      <div className="mt-12 text-center bg-white border-2 border-blue-200 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Questions About Your Insurance Coverage?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our insurance specialists are here to help you understand your benefits and ensure you receive 
          the maximum coverage available. We make the process simple and stress-free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:(301)535-1344"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">📞</span>
            Call (301) 535-1344
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="mr-2">📧</span>
            Get Insurance Help
          </a>
        </div>
      </div>
    </Section>
  );
}