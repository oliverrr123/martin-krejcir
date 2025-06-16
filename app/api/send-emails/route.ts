import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const transporter = nodemailer.createTransport({
  host: 'smtp.seznam.cz',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendConfirmationEmail(customerEmail: string, customerName: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: 'Potvrzení objednávky konzultací - Martin Krejčíř',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Děkujeme za Vaši objednávku!</h2>
        <p>Vážený zákazníku,</p>
        <p>Vaše objednávka "4 konzultace" byla úspěšně zpracována.</p>
        <p>V nejbližší době Vás budeme kontaktovat ohledně domluvení termínu první konzultace.</p>
        <p>Těšíme se na spolupráci!</p>
        <br>
        <p>S pozdravem,<br>Martin Krejčíř</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendAdminNotificationEmail(formData: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'Nová objednávka konzultací',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Nová objednávka konzultací</h2>
        <h3>Údaje zákazníka:</h3>
        <ul>
          <li><strong>Jméno:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Telefon:</strong> ${formData.phone}</li>
          <li><strong>Firma:</strong> ${formData.company || 'Neuvedeno'}</li>
          <li><strong>Zpráva:</strong> ${formData.message || 'Neuvedeno'}</li>
        </ul>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
    const { customer, sessionId } = await request.json();

    // Check if session exists and hasn't been processed
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    if (session.metadata?.emailsSent === 'true') {
      return NextResponse.json(
        { error: 'Emails already sent for this session' },
        { status: 400 }
      );
    }

    // Send emails
    await Promise.all([
      sendConfirmationEmail(customer.email, customer.name),
      sendAdminNotificationEmail(customer),
    ]);

    // Mark session as processed
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { 
        ...session.metadata,
        emailsSent: 'true' 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
} 