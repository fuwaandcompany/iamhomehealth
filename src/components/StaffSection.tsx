import Section from './Section';

interface StaffMember {
  name: string;
  title: string;
  credentials: string[];
  specialties: string[];
  experience: string;
  photo: string;
}

const staffMembers: StaffMember[] = [
  {
    name: "Dr. Sarah Johnson, RN",
    title: "Director of Nursing",
    credentials: ["Registered Nurse", "BSN", "15+ Years Experience"],
    specialties: ["Wound Care", "Medication Management", "Care Coordination"],
    experience: "15+ years in home health and hospital settings",
    photo: "👩‍⚕️"
  },
  {
    name: "Michael Chen, PT",
    title: "Senior Physical Therapist",
    credentials: ["Licensed Physical Therapist", "DPT", "12+ Years Experience"],
    specialties: ["Mobility Training", "Fall Prevention", "Post-Surgical Rehab"],
    experience: "12+ years specializing in home-based rehabilitation",
    photo: "👨‍⚕️"
  },
  {
    name: "Lisa Rodriguez, OTR/L",
    title: "Occupational Therapist",
    credentials: ["Occupational Therapist", "MS-OT", "10+ Years Experience"],
    specialties: ["Daily Living Skills", "Home Safety", "Adaptive Equipment"],
    experience: "10+ years helping patients maintain independence",
    photo: "👩‍⚕️"
  },
  {
    name: "James Wilson, SLP",
    title: "Speech-Language Pathologist",
    credentials: ["Speech-Language Pathologist", "MS-SLP", "8+ Years Experience"],
    specialties: ["Swallowing Therapy", "Communication Disorders", "Cognitive Therapy"],
    experience: "8+ years in neurological and geriatric care",
    photo: "👨‍⚕️"
  }
];

export default function StaffSection() {
  return (
    <Section
      id="staff"
      title="Meet Our Licensed Healthcare Team"
      subtitle="Our experienced, compassionate professionals are dedicated to providing the highest quality care"
      background="white"
      containerClassName="max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {staffMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
          >
            {/* Photo */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-4">
                {member.photo}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-semibold text-sm">{member.title}</p>
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Credentials</h4>
                <div className="space-y-1">
                  {member.credentials.map((credential, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {credential}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 italic">{member.experience}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Stats */}
      <div className="mt-16 bg-blue-600 text-white p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-blue-100">Licensed Staff Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-blue-100">Background Checked</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Nursing Supervision</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-blue-100">Average Years Experience</div>
          </div>
        </div>
      </div>
    </Section>
  );
}