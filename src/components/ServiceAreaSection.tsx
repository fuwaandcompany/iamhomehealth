import Section from './Section';

interface ServiceLocation {
  city: string;
  county: string;
  zipCodes: string[];
  services: string[];
  responseTime: string;
}

const serviceAreas: ServiceLocation[] = [
  {
    city: "Laurel",
    county: "Prince George's County",
    zipCodes: ["20707", "20708", "20709", "20723", "20724"],
    services: ["All Services", "24/7 Nursing", "Emergency Response"],
    responseTime: "1-2 hours"
  },
  {
    city: "College Park",
    county: "Prince George's County", 
    zipCodes: ["20740", "20741", "20742"],
    services: ["All Services", "University Area Specialists"],
    responseTime: "1-3 hours"
  },
  {
    city: "Greenbelt",
    county: "Prince George's County",
    zipCodes: ["20770", "20771"],
    services: ["All Services", "Senior Community Focus"],
    responseTime: "1-2 hours"
  },
  {
    city: "Bowie",
    county: "Prince George's County",
    zipCodes: ["20715", "20716", "20717", "20718", "20719", "20720", "20721"],
    services: ["All Services", "24/7 Coverage"],
    responseTime: "1-2 hours"
  },
  {
    city: "Silver Spring",
    county: "Montgomery County",
    zipCodes: ["20901", "20902", "20903", "20904", "20905", "20906", "20910"],
    services: ["All Services", "Multilingual Staff"],
    responseTime: "2-3 hours"
  },
  {
    city: "Hyattsville",
    county: "Prince George's County",
    zipCodes: ["20781", "20782", "20783", "20784", "20785"],
    services: ["All Services", "Community Focused"],
    responseTime: "1-2 hours"
  },
  {
    city: "Riverdale",
    county: "Prince George's County",
    zipCodes: ["20737", "20738"],
    services: ["All Services"],
    responseTime: "1-3 hours"
  },
  {
    city: "Bladensburg",
    county: "Prince George's County",
    zipCodes: ["20710", "20711"],
    services: ["All Services"],
    responseTime: "1-2 hours"
  }
];

const countyInfo = [
  {
    county: "Prince George's County",
    cities: 6,
    totalZipCodes: 25,
    population: "967,000+",
    specialties: ["Senior Care", "Post-Hospital Care", "Chronic Disease Management"]
  },
  {
    county: "Montgomery County",
    cities: 1,
    totalZipCodes: 7,
    population: "200,000+",
    specialties: ["Multilingual Services", "Cultural Competency", "Advanced Care"]
  }
];

export default function ServiceAreaSection() {
  return (
    <Section
      id="service-area"
      title="Our Service Area Coverage"
      subtitle="Comprehensive home health care services across Prince George's and Montgomery Counties"
      background="gray"
      containerClassName="max-w-7xl"
    >
      {/* County Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {countyInfo.map((county, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">{county.county}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{county.cities}</div>
                <div className="text-sm text-gray-600">Cities Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{county.totalZipCodes}</div>
                <div className="text-sm text-gray-600">Zip Codes</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-lg font-semibold text-gray-700">Population Served:</div>
              <div className="text-blue-600 font-bold">{county.population}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Specialties:</div>
              <div className="flex flex-wrap gap-2">
                {county.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Areas Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Cities & Communities We Serve
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* City Header */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-gray-900">{area.city}</h4>
                <p className="text-sm text-blue-600">{area.county}</p>
              </div>

              {/* Response Time */}
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Response Time:</span>
                  <span className="text-sm font-bold text-green-700">{area.responseTime}</span>
                </div>
              </div>

              {/* Zip Codes */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Zip Codes:</div>
                <div className="flex flex-wrap gap-1">
                  {area.zipCodes.slice(0, 4).map((zip, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {zip}
                    </span>
                  ))}
                  {area.zipCodes.length > 4 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      +{area.zipCodes.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Special Services */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Special Services:</div>
                <div className="space-y-1">
                  {area.services.map((service, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Map Placeholder */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
          Service Area Coverage Map
        </h3>
        
        {/* Simplified Visual Map */}
        <div className="relative bg-blue-50 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Maryland Service Area</h4>
            <p className="text-gray-600 mb-4">
              Covering Prince George's County and Montgomery County
            </p>
            
            {/* Service Area Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-bold text-blue-600">Primary Coverage</div>
                <div className="text-sm text-gray-600">Prince George's County</div>
                <div className="text-xs text-gray-500">1-2 hour response</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-bold text-green-600">Extended Coverage</div>
                <div className="text-sm text-gray-600">Montgomery County</div>
                <div className="text-xs text-gray-500">2-3 hour response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Statistics */}
      <div className="bg-blue-600 text-white p-8 rounded-xl mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Service Area Coverage</h3>
          <p className="text-blue-100">
            Comprehensive coverage across our service area with rapid response times
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">8+</div>
            <div className="text-blue-100 text-sm">Cities Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">32+</div>
            <div className="text-blue-100 text-sm">Zip Codes Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">1.1M+</div>
            <div className="text-blue-100 text-sm">Population Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100 text-sm">Emergency Coverage</div>
          </div>
        </div>
      </div>

      {/* Coverage Verification */}
      <div className="text-center bg-white border-2 border-blue-200 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Not Sure if We Serve Your Area?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're continuously expanding our service area. Even if your location isn't listed above, 
          contact us to check current availability and upcoming coverage expansions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:(301)502-1384"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">📞</span>
            Call to Verify Coverage
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="mr-2">📍</span>
            Check Your Area
          </a>
        </div>
      </div>
    </Section>
  );
}