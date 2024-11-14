'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Send a POST request to your server to create the checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { id } = await response.json();

      // Initialize Stripe.js with the publishable key
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout page using the session ID
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error('Stripe error:', error.message);
        alert('Something went wrong with the Stripe redirect.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create checkout session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Redirecting...' : 'Checkout'}
    </button>
  );
}
