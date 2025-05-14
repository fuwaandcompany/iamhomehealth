import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Log the form submission (in production, you'd want to store this in a database)
    console.log('Form submission:', { name, email, message });

    // Here you would typically send this data to your email service
    // For now, we'll just return a success response
    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      data: {
        name,
        email,
        message
      }
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'There was an error processing your submission. Please try again.'
      },
      { status: 500 }
    );
  }
} 