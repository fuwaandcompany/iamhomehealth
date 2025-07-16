'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  contactType: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    contactType: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message || !formData.contactType) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending your message...'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement)
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: result.message
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
          contactType: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'There was an error sending your message.'
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again or contact us directly.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="form-name" value="contact" />
      
      {/* Status Message */}
      {status.type !== 'idle' && (
        <div className={`p-4 rounded-lg ${
          status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
          'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {status.type === 'loading' && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>{status.message}</span>
            </div>
          )}
          {status.type !== 'loading' && status.message}
        </div>
      )}

      <div>
        <label className="block font-semibold mb-2">I am a:</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="contactType" 
              value="Patient" 
              required 
              className="accent-blue-600"
              checked={formData.contactType === 'Patient'}
              onChange={handleInputChange}
            /> 
            Patient
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="contactType" 
              value="Healthcare provider" 
              className="accent-blue-600"
              checked={formData.contactType === 'Healthcare provider'}
              onChange={handleInputChange}
            /> 
            Healthcare provider
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="contactType" 
              value="Vendor" 
              className="accent-blue-600"
              checked={formData.contactType === 'Vendor'}
              onChange={handleInputChange}
            /> 
            Vendor
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="contactType" 
              value="Other" 
              className="accent-blue-600"
              checked={formData.contactType === 'Other'}
              onChange={handleInputChange}
            /> 
            Other
          </label>
        </div>
      </div>
      
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <button
        type="submit"
        disabled={status.type === 'loading'}
        className={`w-full px-8 py-3 rounded-lg font-semibold transition-colors ${
          status.type === 'loading' 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}