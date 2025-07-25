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

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  insurance?: string;
}

// Create appointment confirmation email template
const createAppointmentEmailTemplate = (appointmentData: AppointmentData) => {
  const subject = `Appointment Request Confirmation - ${appointmentData.name}`;
  
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
            Appointment Request Received
          </h2>
          
          <p>Dear ${appointmentData.name},</p>
          
          <p>Thank you for choosing IAM Home Health Care Services. We have received your appointment request and will contact you within 2 hours to confirm the details.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c5aa0;">Appointment Details</h3>
            <p><strong>Service Requested:</strong> ${appointmentData.service}</p>
            <p><strong>Patient Name:</strong> ${appointmentData.name}</p>
            <p><strong>Phone:</strong> ${appointmentData.phone}</p>
            <p><strong>Email:</strong> ${appointmentData.email}</p>
            <p><strong>Preferred Date:</strong> ${appointmentData.date}</p>
            <p><strong>Preferred Time:</strong> ${appointmentData.time}</p>
            ${appointmentData.insurance ? `<p><strong>Insurance:</strong> ${appointmentData.insurance}</p>` : ''}
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c5aa0;">Next Steps</h3>
            <ul>
              <li>Our team will call you at ${appointmentData.phone} within 2 hours</li>
              <li>We'll confirm your appointment details and answer any questions</li>
              <li>If you need immediate assistance, call us at (301) 535-1344</li>
              <li>Please have your insurance information and physician orders ready</li>
            </ul>
          </div>
          
          <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #2c5aa0;">Contact Information</h4>
            <p style="margin: 5px 0;"><strong>Phone:</strong> (301) 535-1344</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> 14201 Laurel Park Drive #118, Laurel, Maryland 20707</p>
            <p style="margin: 5px 0;"><strong>Business Hours:</strong> 9:00AM to 5:00PM, Monday to Friday</p>
            <p style="margin: 5px 0;"><strong>Emergency Line:</strong> Available 24/7</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #666; font-size: 12px;">
            <p>This appointment request was submitted through our website chatbot.</p>
            <p>Time: ${new Date().toLocaleString()}</p>
            <p>If you did not request this appointment, please call us immediately at (301) 535-1344</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const textBody = `
    Appointment Request Confirmation
    
    Dear ${appointmentData.name},
    
    Thank you for choosing IAM Home Health Care Services. We have received your appointment request and will contact you within 2 hours to confirm the details.
    
    Appointment Details:
    Service Requested: ${appointmentData.service}
    Patient Name: ${appointmentData.name}
    Phone: ${appointmentData.phone}
    Email: ${appointmentData.email}
    Preferred Date: ${appointmentData.date}
    Preferred Time: ${appointmentData.time}
    ${appointmentData.insurance ? `Insurance: ${appointmentData.insurance}\n` : ''}
    
    Next Steps:
    - Our team will call you at ${appointmentData.phone} within 2 hours
    - We'll confirm your appointment details and answer any questions
    - If you need immediate assistance, call us at (301) 535-1344
    - Please have your insurance information and physician orders ready
    
    Contact Information:
    Phone: (301) 535-1344
    Address: 14201 Laurel Park Drive #118, Laurel, Maryland 20707
    Business Hours: 9:00AM to 5:00PM, Monday to Friday
    Emergency Line: Available 24/7
    
    Time: ${new Date().toLocaleString()}
  `;
  
  return { subject, htmlBody, textBody };
};

// Create internal notification email for staff
const createStaffNotificationTemplate = (appointmentData: AppointmentData) => {
  const subject = `NEW APPOINTMENT REQUEST - ${appointmentData.service} - ${appointmentData.name}`;
  
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
            🚨 NEW APPOINTMENT REQUEST 🚨
          </h2>
          
          <div style="background: #fff3cd; padding: 20px; border: 1px solid #ffeaa7; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #856404;">PRIORITY: Contact within 2 hours</h3>
            <p><strong>Service:</strong> ${appointmentData.service}</p>
            <p><strong>Patient:</strong> ${appointmentData.name}</p>
            <p><strong>Phone:</strong> <a href="tel:${appointmentData.phone}">${appointmentData.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${appointmentData.email}">${appointmentData.email}</a></p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c5aa0;">Full Details</h3>
            <p><strong>Requested Date:</strong> ${appointmentData.date}</p>
            <p><strong>Requested Time:</strong> ${appointmentData.time}</p>
            ${appointmentData.insurance ? `<p><strong>Insurance:</strong> ${appointmentData.insurance}</p>` : ''}
            <p><strong>Source:</strong> Website Chatbot</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #d4edda; padding: 15px; border: 1px solid #c3e6cb; border-radius: 8px;">
            <h4 style="margin-top: 0; color: #155724;">Action Required</h4>
            <ol>
              <li>Call patient within 2 hours</li>
              <li>Confirm service details and requirements</li>
              <li>Schedule appointment in system</li>
              <li>Send calendar invite if confirmed</li>
              <li>Update patient record</li>
            </ol>
          </div>
        </div>
      </body>
    </html>
  `;
  
  return { subject, htmlBody, textBody: htmlBody.replace(/<[^>]*>/g, '') };
};

export async function POST(request: Request) {
  try {
    const appointmentData = await request.json();
    console.log('Received appointment data:', appointmentData);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return NextResponse.json(
          { 
            success: false,
            message: `Missing required field: ${field}`
          },
          { status: 400 }
        );
      }
    }

    // Create email templates
    const patientEmailTemplate = createAppointmentEmailTemplate(appointmentData);
    const staffEmailTemplate = createStaffNotificationTemplate(appointmentData);

    // Parse multiple email recipients for staff notification
    const staffRecipients = process.env.CONTACT_EMAIL 
      ? process.env.CONTACT_EMAIL.split(',').map(email => email.trim()).filter(email => email.length > 0)
      : process.env.GMAIL_USER ? [process.env.GMAIL_USER] : [];

    // Send confirmation email to patient
    await transporter.sendMail({
      from: `"IAM Home Health Care Services" <${process.env.GMAIL_USER}>`,
      to: appointmentData.email,
      subject: patientEmailTemplate.subject,
      text: patientEmailTemplate.textBody,
      html: patientEmailTemplate.htmlBody,
    });

    // Send notification email to staff
    await transporter.sendMail({
      from: `"IAM Home Health Care Services" <${process.env.GMAIL_USER}>`,
      to: staffRecipients,
      subject: staffEmailTemplate.subject,
      text: staffEmailTemplate.textBody,
      html: staffEmailTemplate.htmlBody,
    });

    // Log successful submission
    console.log('Appointment request processed:', {
      name: appointmentData.name,
      service: appointmentData.service,
      date: appointmentData.date,
      time: appointmentData.time,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true,
      message: 'Appointment request submitted successfully. You will receive a confirmation email shortly.',
    });

  } catch (error) {
    console.error('Error processing appointment request:', error);
    
    return NextResponse.json(
      { 
        success: false,
        message: 'There was an error processing your appointment request. Please call us directly at (301) 535-1344.'
      },
      { status: 500 }
    );
  }
}