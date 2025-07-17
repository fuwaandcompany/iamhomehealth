'use client';

import { useState } from 'react';
import Section from './Section';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "How do I get started with IAM Home Health Care Services?",
    answer: "Getting started is simple! Contact us for a free consultation where we'll assess your needs, verify insurance coverage, and create a personalized care plan. We can typically begin services within 24-48 hours of your initial consultation."
  },
  {
    category: "Getting Started", 
    question: "Do I need a doctor's referral for home health services?",
    answer: "For skilled nursing, physical therapy, occupational therapy, and speech therapy, a physician's order is required. For personal care services and some other non-medical services, an assessment may be sufficient. We'll help coordinate with your doctor if needed."
  },
  {
    category: "Getting Started",
    question: "What should I expect during the first visit?",
    answer: "During your first visit, we'll conduct a comprehensive assessment of your needs, discuss your health history, review your home environment for safety, create a personalized care plan, and answer all your questions. We'll also review insurance coverage and payment options."
  },

  // Services
  {
    category: "Services",
    question: "What services do you offer?",
    answer: "We offer comprehensive home health services including Skilled Nursing Care, Physical Therapy, Occupational Therapy, Speech Therapy, Personal Care Services, Medication Management, Echocardiogram, and Non-medical Emergency Transportation."
  },
  {
    category: "Services",
    question: "What is the difference between skilled nursing and personal care?",
    answer: "Skilled nursing involves medical care provided by licensed nurses, such as wound care, IV therapy, and medication administration. Personal care focuses on daily living activities like bathing, dressing, meal preparation, and companionship."
  },
  {
    category: "Services",
    question: "Do you provide 24/7 care?",
    answer: "Yes, we provide 24/7 nursing supervision and emergency response. Our care services are available around the clock, and we have staff on-call for urgent situations and emergencies."
  },
  {
    category: "Services",
    question: "Can you help with medication management?",
    answer: "Absolutely! Our medication management service includes organizing medications, setting up reminders, monitoring for side effects, coordinating with pharmacies, and ensuring proper administration by trained professionals."
  },

  // Insurance & Payment
  {
    category: "Insurance & Payment",
    question: "Do you accept insurance?",
    answer: "Yes, we work with most major insurance providers including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, UnitedHealthcare, Humana, Cigna, and many others. We provide free insurance verification and handle billing directly."
  },
  {
    category: "Insurance & Payment",
    question: "What does Medicare cover for home health services?",
    answer: "Medicare typically covers skilled nursing, physical therapy, occupational therapy, and speech therapy when medically necessary and ordered by your physician. Coverage includes services, equipment, and supplies. Personal care services are generally not covered by Medicare."
  },
  {
    category: "Insurance & Payment",
    question: "What if I don't have insurance or my insurance doesn't cover services?",
    answer: "We offer private pay options with transparent pricing. We'll work with you to create an affordable care plan that meets your needs and budget. Contact us to discuss payment arrangements and options."
  },
  {
    category: "Insurance & Payment",
    question: "How much will I have to pay out of pocket?",
    answer: "Your out-of-pocket costs depend on your insurance plan and the services needed. We provide free insurance verification and will explain your coverage and any potential costs before starting services. We believe in transparent pricing with no surprises."
  },

  // Staff & Quality
  {
    category: "Staff & Quality",
    question: "Are your caregivers licensed and qualified?",
    answer: "Yes, all our healthcare providers are fully licensed, certified, and undergo thorough background checks. Our team includes registered nurses, licensed therapists, and certified nursing assistants with extensive training and experience."
  },
  {
    category: "Staff & Quality",
    question: "How do you ensure quality of care?",
    answer: "We maintain quality through regular supervision by licensed professionals, ongoing training programs, comprehensive care plan reviews, patient feedback systems, and strict adherence to healthcare protocols and best practices."
  },
  {
    category: "Staff & Quality",
    question: "Can I request a specific caregiver?",
    answer: "We strive to match caregivers based on your specific needs, personality, and preferences. While we can't guarantee specific individuals due to scheduling, we consider your preferences for gender, language, cultural background, and personality compatibility."
  },
  {
    category: "Staff & Quality",
    question: "What if I'm not satisfied with my caregiver?",
    answer: "Your satisfaction is our priority. If you're not completely satisfied with your caregiver, please contact us immediately. We'll work with you to address concerns and, if necessary, assign a different caregiver who better meets your needs."
  },

  // Scheduling & Availability
  {
    category: "Scheduling & Availability",
    question: "What are your hours of operation?",
    answer: "Our care services are available 24/7. Our administrative office is open Monday through Friday, 8 AM to 6 PM, but we provide round-the-clock care and emergency response services."
  },
  {
    category: "Scheduling & Availability",
    question: "How quickly can you start services?",
    answer: "We can typically begin services within 24-48 hours of your initial consultation, depending on your specific needs and insurance authorization requirements. For urgent situations, we can often start same-day."
  },
  {
    category: "Scheduling & Availability",
    question: "Can I change my care schedule?",
    answer: "Yes, we understand that your needs may change. We offer flexible scheduling and can adjust your care plan as needed. Please give us advance notice when possible to ensure continued quality care."
  },
  {
    category: "Scheduling & Availability",
    question: "What happens if my regular caregiver is sick or unavailable?",
    answer: "We maintain adequate staffing to ensure continuity of care. If your regular caregiver is unavailable, we'll send a qualified replacement who is familiar with your care plan and needs."
  },

  // Medical & Safety
  {
    category: "Medical & Safety",
    question: "Do you provide care for specific medical conditions?",
    answer: "Yes, we provide specialized care for various conditions including post-surgery recovery, chronic illnesses (diabetes, heart disease, COPD), wound care, medication management, rehabilitation, and age-related conditions. Our staff has experience with complex medical needs."
  },
  {
    category: "Medical & Safety",
    question: "How do you handle medical emergencies?",
    answer: "We have a 24/7 emergency response system. Our caregivers are trained in emergency protocols and can quickly coordinate with emergency services, family members, and healthcare providers. For life-threatening emergencies, we call 911 immediately."
  },
  {
    category: "Medical & Safety",
    question: "Can you coordinate with my existing healthcare team?",
    answer: "Absolutely! We work closely with your physicians, specialists, hospitals, and other healthcare providers to ensure coordinated care. We share updates on your progress and follow treatment plans as directed by your medical team."
  },
  {
    category: "Medical & Safety",
    question: "Do you provide medical equipment?",
    answer: "We can arrange for medical equipment as needed and covered by your insurance or care plan. This includes items like hospital beds, wheelchairs, walkers, and other durable medical equipment through our network of suppliers."
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Section
      id="faq"
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our home health care services"
      background="white"
      containerClassName="max-w-6xl"
    >
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setOpenFAQ(null);
            }}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </h3>
              <div className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            
            {openFAQ === index && (
              <div className="px-6 pb-6">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 bg-blue-50 p-8 rounded-xl text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Still Have Questions?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team is here to help! If you don&apos;t see your question answered above, 
          please don&apos;t hesitate to contact us. We&apos;re happy to discuss your specific 
          needs and how we can help you or your loved one.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:(301)502-1384"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">📞</span>
            Call (301) 502-1384
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="mr-2">💬</span>
            Ask a Question
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-2">Quick Response</h4>
          <p className="text-gray-600 text-sm">
            We respond to inquiries within 2 hours during business hours
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-2">Personalized Care</h4>
          <p className="text-gray-600 text-sm">
            Every care plan is customized to meet your specific needs
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💙</span>
          </div>
          <h4 className="font-bold text-lg text-gray-900 mb-2">Compassionate Support</h4>
          <p className="text-gray-600 text-sm">
            Our team provides not just medical care, but emotional support too
          </p>
        </div>
      </div>
    </Section>
  );
}