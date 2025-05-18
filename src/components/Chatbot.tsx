'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isBot: boolean;
}

const initialMessages: Message[] = [
  {
    text: "Hello! I'm your IAM Home Health Care Services assistant. How can I help you today?",
    isBot: true
  }
];

const commonQuestions = [
  {
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of services including Skilled Nursing Care, Medication Management, Physical Therapy, Occupational Therapy, Speech Therapy, Personal Care, Echocardiogram, and Non-medical Emergency Transportation."
  },
  {
    question: "How do I schedule a consultation?",
    answer: "You can schedule a free consultation by filling out our contact form on the website or calling us directly. We'll get back to you within 24 hours to discuss your needs."
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we work with most major insurance providers. Please contact us to verify your specific coverage and benefits."
  },
  {
    question: "What areas do you serve?",
    answer: "We provide services throughout [Your Service Area]. Contact us to confirm if we serve your specific location."
  },
  {
    question: "How quickly can you start services?",
    answer: "We can typically begin services within 24-48 hours of your initial consultation, depending on your specific needs and requirements."
  },
  {
    question: "What is skilled nursing care?",
    answer: "Skilled nursing care involves professional medical services provided by licensed nurses in your home. This includes wound care, medication administration, health monitoring, and coordination with your doctor."
  },
  {
    question: "How does medication management work?",
    answer: "Our medication management service ensures proper medication administration, including organizing medications, setting up reminders, monitoring side effects, and coordinating with healthcare providers to prevent medication errors."
  },
  {
    question: "What is the difference between physical and occupational therapy?",
    answer: "Physical therapy focuses on improving mobility, strength, and balance. Occupational therapy helps with daily living activities and adapting your home environment. Both are crucial for recovery and maintaining independence."
  },
  {
    question: "What is an echocardiogram?",
    answer: "An echocardiogram is a non-invasive ultrasound test that examines your heart's structure and function. Our mobile service brings this diagnostic tool to your home, making it convenient and comfortable."
  },
  {
    question: "How does non-medical emergency transportation work?",
    answer: "Our non-medical emergency transportation service provides safe, reliable rides to medical appointments and emergencies. We ensure timely transportation with trained drivers and accessible vehicles."
  },
  {
    question: "What is speech therapy?",
    answer: "Speech therapy helps with communication disorders, swallowing difficulties, and cognitive-communication issues. Our therapists work with you to improve speech, language, and swallowing abilities."
  },
  {
    question: "What does personal care include?",
    answer: "Personal care services include assistance with daily activities like bathing, dressing, grooming, meal preparation, and light housekeeping. We help maintain your dignity and independence at home."
  },
  {
    question: "Are your caregivers licensed?",
    answer: "Yes, all our healthcare providers are fully licensed, certified, and undergo thorough background checks. We maintain high standards of care and professionalism."
  },
  {
    question: "What are your hours of operation?",
    answer: "We provide 24/7 care services. Our administrative office is open Monday through Friday, 8 AM to 6 PM, but our care services are available around the clock."
  },
  {
    question: "How do you ensure quality of care?",
    answer: "We maintain quality through regular supervision, ongoing training, care plan reviews, and patient feedback. Our team follows strict protocols and best practices in home healthcare."
  },
  {
    question: "What should I expect during the first visit?",
    answer: "During the first visit, we'll conduct a comprehensive assessment, discuss your needs, create a personalized care plan, and answer any questions. We'll also review insurance coverage and payment options."
  },
  {
    question: "Do you provide care for specific conditions?",
    answer: "Yes, we provide specialized care for various conditions including post-surgery recovery, chronic illnesses, rehabilitation, and age-related conditions. Contact us to discuss your specific needs."
  },
  {
    question: "How do you handle emergencies?",
    answer: "We have a 24/7 emergency response system. Our caregivers are trained in emergency protocols and can quickly coordinate with emergency services if needed."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including insurance, Medicare, Medicaid (where applicable), private pay, and long-term care insurance. We can help you understand your coverage options."
  },
  {
    question: "How do you match caregivers with patients?",
    answer: "We carefully match caregivers based on your specific needs, personality, and preferences. We consider medical requirements, language preferences, and cultural considerations to ensure the best fit."
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const question = input.toLowerCase();
      let response = "I'm sorry, I don't have information about that. Please contact us directly for more details.";

      // Check for common questions
      for (const q of commonQuestions) {
        if (question.includes(q.question.toLowerCase())) {
          response = q.answer;
          break;
        }
      }

      const botMessage: Message = { text: response, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 