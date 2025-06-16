import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const customer = {
      name: session.metadata?.name,
      email: session.metadata?.email,
      phone: session.metadata?.phone,
      company: session.metadata?.company,
      message: session.metadata?.message,
    };

    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error retrieving session data:', error);
    return NextResponse.json(
      { error: 'Error retrieving session data' },
      { status: 500 }
    );
  }
} 