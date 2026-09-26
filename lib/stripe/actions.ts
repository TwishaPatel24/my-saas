'use server'

import { stripe } from '.'
import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(priceId: string) {
  // Get the currently logged in user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // If not logged in, send to login
  if (!user) redirect('/login')

  // Check if this user already has a Stripe customer ID
  const { data: customer } = await adminClient
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  let customerId = customer?.stripe_customer_id

  // If no Stripe customer exists yet, create one
  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user.email!,
      metadata: {
        // Store supabase user id in Stripe so we can link them later
        supabase_user_id: user.id
      }
    })
    customerId = stripeCustomer.id

    // Save the new Stripe customer ID to our database
    await adminClient
      .from('customers')
      .insert({ id: user.id, stripe_customer_id: customerId })
  }

  // Create a Stripe checkout session
  // This is the payment page Stripe hosts for you
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',           // recurring payment, not one-time
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,             // which plan they're buying
        quantity: 1
      }
    ],
    // Where to send them after payment
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  // Redirect user to Stripe's hosted checkout page
  if (session.url) redirect(session.url)
}

export async function createPortalSession() {
  // Get logged in user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get their Stripe customer ID
  const { data: customer } = await adminClient
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!customer) redirect('/dashboard/billing')

  // Create a billing portal session
  // This is where users can cancel, upgrade, update payment method etc
  const session = await stripe.billingPortal.sessions.create({
    customer: customer.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  redirect(session.url)
}