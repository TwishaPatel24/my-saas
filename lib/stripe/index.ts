import Stripe from 'stripe'

// Initialize Stripe with your secret key
// This file is server-only — never import this in client components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})