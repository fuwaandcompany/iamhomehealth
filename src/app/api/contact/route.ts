import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Here you would typically send this data to your email service
  // For now, we'll just return a success response
  return NextResponse.json({ 
    success: true,
    message: 'Thank you for your message. We will get back to you soon.'
  });
} 