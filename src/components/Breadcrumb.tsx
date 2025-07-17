'use client';

import { useEffect, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleSectionDetection = () => {
      const sections = ['home', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'hero' : section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    // Initial detection
    handleSectionDetection();

    window.addEventListener('scroll', handleSectionDetection);
    return () => window.removeEventListener('scroll', handleSectionDetection);
  }, []);

  // Auto-generate breadcrumbs based on current section if not provided
  const breadcrumbItems = items || [
    { label: 'Home', href: '#hero' },
    { 
      label: currentSection === 'services' ? 'Our Services' :
             currentSection === 'about' ? 'About Us' :
             currentSection === 'contact' ? 'Contact Us' : 'Home',
      href: `#${currentSection === 'home' ? 'hero' : currentSection}`,
      active: true
    }
  ];

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Don't show breadcrumbs on home section
  if (currentSection === 'home' && !items) {
    return null;
  }

  return (
    <nav className={`bg-gray-50 border-b border-gray-200 ${className}`} aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                )}
                {item.active ? (
                  <span className="text-gray-500 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}