import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'gray' | 'blue' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  textAlign?: 'left' | 'center' | 'right';
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  containerClassName = '',
  background = 'white',
  padding = 'large',
  textAlign = 'center'
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-600 text-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
  };

  const paddingClasses = {
    none: '',
    small: 'py-8 px-4',
    medium: 'py-16 px-4',
    large: 'py-20 px-4'
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <section
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>
        {(title || subtitle) && (
          <div className={`mb-12 ${textAlignClasses[textAlign]}`}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl ${
                background === 'blue' || background === 'gradient' 
                  ? 'text-white/90' 
                  : 'text-gray-600'
              } max-w-3xl ${textAlign === 'center' ? 'mx-auto' : ''}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}