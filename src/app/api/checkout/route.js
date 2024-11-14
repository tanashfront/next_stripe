// app/api/checkout/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// const stripe = new Stripe(`${process.env.SECRET_KEY}`);
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export async function POST(req) {
  console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product Name',
            },
            unit_amount: 4900, // price in cents (49.00 USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // success_url: `${req.headers.get('origin')}/success`,
      // cancel_url: `${req.headers.get('origin')}/cancel`,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
