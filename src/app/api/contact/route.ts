import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email templates
const createEmailTemplate = (contactType: string, name: string, email: string, message: string) => {
  const subject = `New ${contactType} Contact Form Submission - ${name}`;
  
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c5aa0;">Contact Information</h3>
            <p><strong>Contact Type:</strong> ${contactType}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2c5aa0;">${email}</a></p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #2c5aa0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #666; font-size: 12px;">
            <p>This email was sent from the IAM Home Health Care Services contact form.</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const textBody = `
    New Contact Form Submission
    
    Contact Type: ${contactType}
    Name: ${name}
    Email: ${email}
    
    Message:
    ${message}
    
    Time: ${new Date().toLocaleString()}
  `;
  
  return { subject, htmlBody, textBody };
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const contactType = formData.get('contactType') as string;

    // Validate required fields
    if (!name || !email || !message || !contactType) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please fill in all required fields.'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please enter a valid email address.'
        },
        { status: 400 }
      );
    }

    // Create email template
    const emailTemplate = createEmailTemplate(contactType, name, email, message);

    // Send email using Gmail SMTP
    await transporter.sendMail({
      from: `"IAM Home Health Care Services" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: emailTemplate.subject,
      text: emailTemplate.textBody,
      html: emailTemplate.htmlBody,
    });

    // Log successful submission
    console.log('Email sent successfully:', {
      name,
      email,
      contactType,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Handle specific Gmail SMTP errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('Username and Password not accepted')) {
        return NextResponse.json(
          { 
            success: false,
            message: 'Email service configuration error. Please contact support.'
          },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        success: false,
        message: 'There was an error sending your message. Please try again or contact us directly.'
      },
      { status: 500 }
    );
  }
} 