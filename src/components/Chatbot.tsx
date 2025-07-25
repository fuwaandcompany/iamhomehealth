'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isBot: boolean;
  options?: string[];
}

type ConversationState =
  | null
  | 'appointment_flow'
  | 'service_inquiry'
  | 'insurance_verification'
  | 'emergency_escalation'
  | 'collect_name'
  | 'collect_email'
  | 'collect_phone'
  | 'collect_date'
  | 'collect_time'
  | 'collect_service_type'
  | 'collect_insurance_provider'
  | 'collect_insurance_details'
  | 'emergency_assessment'
  | 'confirm';

const initialMessages: Message[] = [
  {
    text: "Hello! I'm your IAM Home Health Care Services assistant. How can I help you today?",
    isBot: true,
    options: [
      "Schedule an appointment",
      "Learn about our services",
      "Insurance verification",
      "Emergency assistance",
      "General questions"
    ]
  }
];

// Service-specific detailed information
const serviceDetails = {
  "Skilled Nursing Care": {
    description: "Professional nursing services provided by licensed RNs and LPNs in your home.",
    includes: ["Wound care and dressing changes", "IV therapy and injections", "Medication administration", "Health monitoring and assessment", "Care plan coordination with physicians"],
    duration: "Visits typically range from 30 minutes to 2 hours",
    frequency: "Daily, weekly, or as prescribed by your physician",
    requirements: "Physician order required"
  },
  "Physical Therapy": {
    description: "Personalized rehabilitation programs to improve mobility, strength, and function.",
    includes: ["Mobility and balance training", "Strength and endurance exercises", "Pain management techniques", "Fall prevention education", "Adaptive equipment training"],
    duration: "45-60 minutes per session",
    frequency: "2-3 times per week typically",
    requirements: "Physician referral required"
  },
  "Occupational Therapy": {
    description: "Help with daily living activities and adaptive strategies for independence.",
    includes: ["Activities of daily living training", "Home safety assessments", "Adaptive equipment recommendations", "Cognitive rehabilitation", "Energy conservation techniques"],
    duration: "45-60 minutes per session",
    frequency: "1-3 times per week typically",
    requirements: "Physician referral required"
  },
  "Speech Therapy": {
    description: "Specialized therapy for communication and swallowing disorders.",
    includes: ["Speech and language therapy", "Swallowing assessment and treatment", "Voice therapy", "Cognitive-communication therapy", "Hearing aid orientation"],
    duration: "45-60 minutes per session",
    frequency: "1-2 times per week typically",
    requirements: "Physician referral required"
  },
  "Personal Care": {
    description: "Assistance with daily personal care activities to maintain dignity and independence.",
    includes: ["Bathing and grooming assistance", "Dressing and mobility help", "Meal preparation", "Light housekeeping", "Medication reminders"],
    duration: "2-8 hours per visit",
    frequency: "Daily or several times per week",
    requirements: "Assessment required"
  },
  "Medication Management": {
    description: "Expert assistance ensuring safe and effective medication use.",
    includes: ["Medication administration", "Pill box organization", "Side effect monitoring", "Drug interaction checks", "Coordination with pharmacy"],
    duration: "15-30 minutes per visit",
    frequency: "Daily or as needed",
    requirements: "Physician order may be required"
  },
  "Echocardiogram": {
    description: "Mobile cardiac ultrasound services performed in your home.",
    includes: ["Complete echocardiogram", "Real-time heart function assessment", "Report to your cardiologist", "Follow-up recommendations"],
    duration: "45-60 minutes",
    frequency: "As ordered by physician",
    requirements: "Physician order required"
  },
  "Non-medical Emergency Transportation": {
    description: "Safe, reliable transportation for medical appointments and urgent situations.",
    includes: ["Medical appointment transport", "Dialysis transportation", "Wheelchair accessible vehicles", "Trained drivers", "Emergency transportation"],
    duration: "Variable based on distance",
    frequency: "As needed",
    requirements: "24-hour advance notice preferred"
  }
};

// Insurance providers and verification guidance
const insuranceProviders = [
  "Medicaid", "Aetna", "Blue Cross Blue Shield", "Cigna", 
  "Humana", "UnitedHealthcare", "Kaiser Permanente", "Anthem", "Other"
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
    answer: "We accept various payment methods including insurance, Medicaid (where applicable), private pay, and long-term care insurance. We can help you understand your coverage options."
  },
  {
    question: "How do you match caregivers with patients?",
    answer: "We carefully match caregivers based on your specific needs, personality, and preferences. We consider medical requirements, language preferences, and cultural considerations to ensure the best fit."
  }
];

// Patterns for sensitive data (SSN, credit card, insurance, etc.)
const sensitivePatterns = [
  /\b\d{3}-?\d{2}-?\d{4}\b/, // SSN
  /\b\d{16}\b/, // 16-digit card
  /\b\d{4} \d{4} \d{4} \d{4}\b/, // 4x4 card
  /insurance/i,
  /medical history/i,
  /password/i,
  /social security/i,
  /ssn/i,
  /credit card/i,
  /debit card/i,
  /bank account/i,
  /account number/i,
];

function sanitize(input: string) {
  // Basic sanitization to prevent XSS
  return input.replace(/[<>]/g, '');
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [conversationState, setConversationState] = useState<ConversationState>(null);
  const [appointmentData, setAppointmentData] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    date?: string;
    time?: string;
    insurance?: string;
  }>({});
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

    // Sanitize input
    const sanitizedInput = sanitize(input);

    // Security: block sensitive info
    for (const pattern of sensitivePatterns) {
      if (pattern.test(sanitizedInput)) {
        setMessages(prev => [
          ...prev,
          { text: "For your privacy and security, please do not share sensitive information such as SSN, insurance numbers, or medical history here. If you need to discuss sensitive matters, please call us directly at (301) 535-1344.", isBot: true }
        ]);
        setInput('');
        return;
      }
    }

    // Add user message
    const userMessage: Message = { text: sanitizedInput, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Handle different conversation flows
    if (conversationState) {
      handleConversationFlow(sanitizedInput);
      setInput('');
      return;
    }

    // Main menu options
    if (/schedule.*appointment|book.*appointment|appointment/i.test(sanitizedInput)) {
      handleMenuOption("Schedule an appointment");
    } else if (/service|what.*do.*you.*offer|learn.*service/i.test(sanitizedInput)) {
      handleMenuOption("Learn about our services");
    } else if (/insurance|coverage|verify/i.test(sanitizedInput)) {
      handleMenuOption("Insurance verification");
    } else if (/emergency|urgent|help.*now|crisis/i.test(sanitizedInput)) {
      handleMenuOption("Emergency assistance");
    } else {
      // Default to general questions
      handleGeneralQuestions(sanitizedInput);
    }
    
    setInput('');
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMessage: Message = { text: option, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    
    // Check if this is a main menu option or a conversation flow option
    const mainMenuOptions = [
      "Schedule an appointment",
      "Learn about our services", 
      "Insurance verification",
      "Emergency assistance",
      "General questions"
    ];
    
    if (mainMenuOptions.includes(option)) {
      handleMenuOption(option);
    } else if (conversationState) {
      // This is part of an ongoing conversation flow
      handleConversationFlow(option);
    } else {
      // Handle special options that can appear in different contexts
      if (option === "Back to main menu") {
        setConversationState(null);
        setMessages(prev => [
          ...prev,
          {
            text: "How can I help you today?",
            isBot: true,
            options: [
              "Schedule an appointment",
              "Learn about our services",
              "Insurance verification", 
              "Emergency assistance",
              "General questions"
            ]
          }
        ]);
      } else if (option.startsWith("Call now:") || option.includes("(301) 535-1344")) {
        setMessages(prev => [
          ...prev,
          { text: "Please call us at (301) 535-1344. Our staff is ready to assist you immediately.", isBot: true }
        ]);
        setConversationState(null);
      } else {
        // Fallback to menu option handling
        handleMenuOption(option);
      }
    }
  };

  const handleMenuOption = (option: string) => {
    setTimeout(() => {
      switch (option) {
        case "Schedule an appointment":
          setMessages(prev => [
            ...prev,
            { 
              text: "I'd be happy to help you schedule an appointment! First, what type of service are you interested in?", 
              isBot: true,
              options: Object.keys(serviceDetails)
            }
          ]);
          setConversationState('appointment_flow');
          break;

        case "Learn about our services":
          setMessages(prev => [
            ...prev,
            { 
              text: "We offer comprehensive home health care services. Which service would you like to learn more about?", 
              isBot: true,
              options: Object.keys(serviceDetails)
            }
          ]);
          setConversationState('service_inquiry');
          break;

        case "Insurance verification":
          setMessages(prev => [
            ...prev,
            { 
              text: "I can help you understand your insurance coverage. What insurance provider do you have?", 
              isBot: true,
              options: insuranceProviders
            }
          ]);
          setConversationState('insurance_verification');
          break;

        case "Emergency assistance":
          setMessages(prev => [
            ...prev,
            { 
              text: "If this is a life-threatening emergency, please call 911 immediately.\n\nFor urgent home health needs, are you experiencing:\n• Medication-related emergency\n• Equipment malfunction\n• Caregiver no-show\n• Other urgent health concern", 
              isBot: true,
              options: ["Call 911 (Life-threatening)", "Medication emergency", "Equipment issue", "Caregiver issue", "Other urgent concern"]
            }
          ]);
          setConversationState('emergency_escalation');
          break;

        case "General questions":
          setMessages(prev => [
            ...prev,
            { text: "What would you like to know about our services? You can ask about our hours, service areas, staff qualifications, or anything else.", isBot: true }
          ]);
          break;
      }
    }, 700);
  };

  const handleConversationFlow = (userInput: string) => {
    const sanitizedInput = sanitize(userInput);
    
    // Security check
    for (const pattern of sensitivePatterns) {
      if (pattern.test(sanitizedInput)) {
        setMessages(prev => [
          ...prev,
          { text: "For your privacy and security, please do not share sensitive information such as SSN, insurance numbers, or medical history here. If you need to discuss sensitive matters, please call us directly at (301) 535-1344.", isBot: true }
        ]);
        return;
      }
    }

    setTimeout(() => {
      switch (conversationState) {
        case 'service_inquiry':
          handleServiceInquiry(sanitizedInput);
          break;
        case 'appointment_flow':
          handleAppointmentFlow(sanitizedInput);
          break;
        case 'insurance_verification':
          handleInsuranceVerification(sanitizedInput);
          break;
        case 'emergency_escalation':
          handleEmergencyEscalation(sanitizedInput);
          break;
        case 'collect_name':
        case 'collect_email':
        case 'collect_phone':
        case 'collect_date':
        case 'collect_time':
        case 'collect_service_type':
        case 'collect_insurance_provider':
        case 'collect_insurance_details':
          handleDataCollection(sanitizedInput);
          break;
        default:
          handleGeneralQuestions(sanitizedInput);
      }
    }, 700);
  };

  const handleServiceInquiry = (userInput: string) => {
    // Handle follow-up options
    if (userInput === "Schedule this service") {
      setMessages(prev => [
        ...prev,
        { 
          text: "Great! Let's schedule your appointment. What type of service are you interested in?", 
          isBot: true,
          options: Object.keys(serviceDetails)
        }
      ]);
      setConversationState('appointment_flow');
      return;
    }
    
    if (userInput === "Learn about another service") {
      setMessages(prev => [
        ...prev,
        { 
          text: "Which service would you like to learn more about?", 
          isBot: true,
          options: Object.keys(serviceDetails)
        }
      ]);
      return;
    }

    const service = Object.keys(serviceDetails).find(s => 
      userInput.toLowerCase().includes(s.toLowerCase()) || 
      s.toLowerCase().includes(userInput.toLowerCase())
    );

    if (service && serviceDetails[service as keyof typeof serviceDetails]) {
      const details = serviceDetails[service as keyof typeof serviceDetails];
      const response = `**${service}**\n\n${details.description}\n\n**What's included:**\n${details.includes.map(item => `• ${item}`).join('\n')}\n\n**Duration:** ${details.duration}\n**Frequency:** ${details.frequency}\n**Requirements:** ${details.requirements}\n\nWould you like to schedule this service or learn about another service?`;
      
      setMessages(prev => [
        ...prev,
        { 
          text: response, 
          isBot: true,
          options: ["Schedule this service", "Learn about another service", "Back to main menu"]
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        { 
          text: "Please select a specific service you'd like to learn about:", 
          isBot: true,
          options: Object.keys(serviceDetails)
        }
      ]);
    }
  };

  const handleAppointmentFlow = (userInput: string) => {
    const service = Object.keys(serviceDetails).find(s => 
      userInput.toLowerCase().includes(s.toLowerCase())
    );

    if (service) {
      setAppointmentData(prev => ({ ...prev, service }));
      setMessages(prev => [
        ...prev,
        { text: `Great choice! ${service} is an excellent service. What's your full name?`, isBot: true }
      ]);
      setConversationState('collect_name');
    } else {
      setMessages(prev => [
        ...prev,
        { 
          text: "Please select the service you'd like to schedule:", 
          isBot: true,
          options: Object.keys(serviceDetails)
        }
      ]);
    }
  };

  const handleInsuranceVerification = (userInput: string) => {
    // Handle follow-up options from insurance verification
    if (userInput === "Yes, verify my benefits") {
      setMessages(prev => [
        ...prev,
        { 
          text: "I'd be happy to help verify your benefits! Please call us at (301) 535-1344 and have your insurance card ready. Our staff can verify your coverage and explain your benefits in detail.\n\nWould you like to schedule an appointment in the meantime?", 
          isBot: true,
          options: ["Schedule an appointment", "Back to main menu"]
        }
      ]);
      setConversationState(null);
      return;
    }

    const provider = insuranceProviders.find(p => 
      userInput.toLowerCase().includes(p.toLowerCase())
    );

    if (provider) {
      setAppointmentData(prev => ({ ...prev, insurance: provider }));
      
      let guidance = "";
      switch (provider) {
        case "Medicaid":
          guidance = "Medicaid coverage varies by state but often includes our medical services. You'll need:\n• Medicaid card\n• Physician's order\n• Prior authorization may be required\n\nPersonal care services may be covered under some Medicaid waiver programs.";
          break;
        default:
          guidance = `For ${provider}, coverage varies by your specific plan. We recommend:\n• Calling the number on your insurance card\n• Asking about home health benefits\n• Requesting prior authorization if required\n\nWe'll be happy to help verify your benefits - just provide your member ID (not the full number for security).`;
      }

      setMessages(prev => [
        ...prev,
        { 
          text: guidance + "\n\nWould you like us to help verify your specific benefits?", 
          isBot: true,
          options: ["Yes, verify my benefits", "Schedule an appointment", "Back to main menu"]
        }
      ]);
      setConversationState('collect_insurance_details');
    } else {
      setMessages(prev => [
        ...prev,
        { 
          text: "Please select your insurance provider:", 
          isBot: true,
          options: insuranceProviders
        }
      ]);
    }
  };

  const handleEmergencyEscalation = (userInput: string) => {
    if (userInput.includes("911") || userInput.includes("Life-threatening")) {
      setMessages(prev => [
        ...prev,
        { text: "Please call 911 immediately for life-threatening emergencies. If you need additional support after emergency services, please call us at (301) 535-1344.", isBot: true }
      ]);
      setConversationState(null);
      return;
    }

    let response = "";
    if (userInput.includes("Medication")) {
      response = "For medication emergencies:\n• Call our 24/7 nursing line: (301) 535-1344\n• Have your medication list ready\n• If experiencing severe reactions, call 911\n• Contact your physician or pharmacy if needed\n\nShould I connect you with our nursing staff immediately?";
    } else if (userInput.includes("Equipment")) {
      response = "For equipment issues:\n• Call our equipment hotline: (301) 535-1344\n• Have your equipment model/serial number ready\n• We provide 24/7 equipment support\n• Emergency replacements available\n\nWould you like me to connect you with our equipment team?";
    } else if (userInput.includes("Caregiver")) {
      response = "For caregiver no-shows or issues:\n• Call our staffing coordinator: (301) 535-1344\n• We'll send a replacement caregiver immediately\n• Document the incident for quality improvement\n\nShall I connect you with our staffing team right away?";
    } else {
      response = "For urgent concerns:\n• Call our main line: (301) 535-1344\n• Press 1 for nursing emergencies\n• Press 2 for equipment issues\n• Press 3 for staffing problems\n\nOur staff is available 24/7 for urgent situations.";
    }

    setMessages(prev => [
      ...prev,
      { 
        text: response, 
        isBot: true,
        options: ["Call now: (301) 535-1344", "Back to main menu"]
      }
    ]);
    setConversationState(null);
  };

  const handleDataCollection = (userInput: string) => {
    switch (conversationState) {
      case 'collect_name':
        setAppointmentData(prev => ({ ...prev, name: userInput }));
        setMessages(prev => [
          ...prev,
          { text: "Thank you! What's your email address?", isBot: true }
        ]);
        setConversationState('collect_email');
        break;

      case 'collect_email':
        setAppointmentData(prev => ({ ...prev, email: userInput }));
        setMessages(prev => [
          ...prev,
          { text: "What's your phone number?", isBot: true }
        ]);
        setConversationState('collect_phone');
        break;

      case 'collect_phone':
        setAppointmentData(prev => ({ ...prev, phone: userInput }));
        setMessages(prev => [
          ...prev,
          { text: "What date would you prefer for your appointment? (e.g., March 15, 2024)", isBot: true }
        ]);
        setConversationState('collect_date');
        break;

      case 'collect_date':
        setAppointmentData(prev => ({ ...prev, date: userInput }));
        setMessages(prev => [
          ...prev,
          { text: "What time works best for you? (e.g., 2:00 PM)", isBot: true }
        ]);
        setConversationState('collect_time');
        break;

      case 'collect_time':
        const completeAppointmentData = { ...appointmentData, time: userInput };
        setAppointmentData(completeAppointmentData);
        sendAppointmentConfirmation(completeAppointmentData);
        break;
    }
  };

  const sendAppointmentConfirmation = async (dataToSend = appointmentData) => {
    try {
      console.log('Sending appointment data:', dataToSend); // Debug log
      
      // Send appointment data to your backend
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        setMessages(prev => [
          ...prev,
          { text: `Perfect! Your appointment request has been submitted:\n\n**Service:** ${dataToSend.service}\n**Date:** ${dataToSend.date}\n**Time:** ${dataToSend.time}\n\nWe'll send a confirmation email to ${dataToSend.email} within 2 hours and call you at ${dataToSend.phone} to confirm details.\n\nThank you for choosing IAM Home Health Care Services!`, isBot: true }
        ]);
      } else {
        const errorData = await response.json();
        console.error('Appointment submission failed:', errorData);
        throw new Error(errorData.message || 'Failed to submit appointment');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setMessages(prev => [
        ...prev,
        { text: "There was an issue submitting your appointment. Please call us directly at (301) 535-1344 to schedule. We apologize for the inconvenience.", isBot: true }
      ]);
    }

    setConversationState(null);
    setAppointmentData({});
  };

  const handleGeneralQuestions = (userInput: string) => {
    const question = userInput.toLowerCase();
    let response = "I'm here to help! For specific questions, please contact us at (301) 535-1344 or use our contact form. You can also ask me about:\n• Our services\n• Scheduling appointments\n• Insurance verification\n• Emergency assistance";
    
    for (const q of commonQuestions) {
      if (question.includes(q.question.toLowerCase())) {
        response = q.answer;
        break;
      }
    }

    setMessages(prev => [
      ...prev,
      { 
        text: response, 
        isBot: true,
        options: ["Schedule an appointment", "Learn about services", "Insurance verification", "Back to main menu"]
      }
    ]);
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
              <div key={index}>
                <div
                  className={`flex ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  } mb-2`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
                
                {/* Quick action buttons for bot messages */}
                {message.isBot && message.options && (
                  <div className="flex flex-wrap gap-2 mb-2 ml-2">
                    {message.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
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
                placeholder={conversationState ? "Type your answer..." : "Type your message or click an option above..."}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={conversationState === 'confirm'}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={conversationState === 'confirm'}
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