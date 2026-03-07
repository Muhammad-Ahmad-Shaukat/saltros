import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;
    
    // GMAIL Auth
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let subject = '';
    let text = '';
    
    if (type === 'contact') {
      subject = 'New Contact Form Submission';
      text = `You have received a new contact form submission:\n\nName: ${data.name || 'N/A'}\nEmail: ${data.email || 'N/A'}\nMessage: ${data.message || 'N/A'}`;
    } else if (type === 'subscribe') {
      subject = 'New Newsletter Subscriber';
      text = `A user has subscribed to the newsletter:\n\nEmail: ${data.email}`;
    } else if (type === 'order') {
      subject = `New Order Placed - [${data.email}]`;
      text = `You have received a new order!\n\nEmail: ${data.email}\nPayment Method: ${data.paymentMethod}\n\nShipping Details:\n${JSON.stringify(data.shippingAddress, null, 2)}`;
    } else {
      return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }

    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.GMAIL,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('Email send failed:', error.message);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
