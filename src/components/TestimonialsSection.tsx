'use client';

import { useState } from 'react';
import Section from './Section';

interface Testimonial {
  name: string;
  location: string;
  service: string;
  rating: number;
  testimonial: string;
  relationship: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Margaret Thompson",
    location: "Laurel, MD",
    service: "Skilled Nursing Care",
    rating: 5,
    testimonial: "The nurses from IAM Home Health have been absolutely wonderful. They're not just skilled professionals, but genuinely caring people who treat my mother with such respect and dignity. The peace of mind they've given our family is priceless.",
    relationship: "Daughter of patient"
  },
  {
    name: "Robert Chen",
    location: "Silver Spring, MD",
    service: "Physical Therapy",
    rating: 5,
    testimonial: "After my knee replacement, I thought I'd never walk normally again. The physical therapist from IAM worked with me patiently, and now I'm back to my daily walks. Their professionalism and encouragement made all the difference.",
    relationship: "Patient"
  },
  {
    name: "Maria Gonzalez",
    location: "College Park, MD",
    service: "Personal Care Services",
    rating: 5,
    testimonial: "The caregivers help my father with daily activities while maintaining his independence and dignity. They're punctual, reliable, and have become like family to us. We couldn't ask for better care.",
    relationship: "Daughter of patient"
  },
  {
    name: "David Williams",
    location: "Bowie, MD",
    service: "Speech Therapy",
    rating: 5,
    testimonial: "Following my stroke, I struggled with communication. The speech therapist was patient, encouraging, and helped me regain my confidence. The progress I've made at home has been remarkable.",
    relationship: "Patient"
  },
  {
    name: "Jennifer Adams",
    location: "Greenbelt, MD",
    service: "Occupational Therapy",
    rating: 5,
    testimonial: "IAM's occupational therapist helped my mother adapt our home and learn new ways to do everyday tasks safely. The independence she's regained has improved her quality of life tremendously.",
    relationship: "Daughter of patient"
  },
  {
    name: "Thomas Brown",
    location: "Hyattsville, MD",
    service: "Medication Management",
    rating: 5,
    testimonial: "Managing multiple medications was overwhelming until IAM stepped in. Their medication management service ensures I never miss a dose and helps me understand my treatments better.",
    relationship: "Patient"
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <Section
      id="testimonials"
      title="What Our Families Say"
      subtitle="Don't just take our word for it - hear from the families and patients we've had the privilege to serve"
      background="gray"
      containerClassName="max-w-6xl"
    >
      {/* Featured Testimonial Carousel */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {renderStars(testimonials[currentTestimonial].rating)}
          </div>
          
          <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
            &ldquo;{testimonials[currentTestimonial].testimonial}&rdquo;
          </blockquote>
          
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-gray-900 text-lg">
              {testimonials[currentTestimonial].name}
            </h4>
            <p className="text-blue-600 font-medium">
              {testimonials[currentTestimonial].relationship}
            </p>
            <p className="text-gray-500 text-sm">
              {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].service}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 6).map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex">
                {renderStars(testimonial.rating)}
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {testimonial.service}
              </span>
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
              &ldquo;{testimonial.testimonial}&rdquo;
            </p>
            
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
              <p className="text-blue-600 text-xs">{testimonial.relationship}</p>
              <p className="text-gray-500 text-xs">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 bg-blue-600 text-white p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">4.9/5</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Families Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-100">Would Recommend</div>
          </div>
        </div>
      </div>
    </Section>
  );
}