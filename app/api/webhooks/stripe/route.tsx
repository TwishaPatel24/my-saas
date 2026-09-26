import { stripe } from '@/lib/stripe'
import { adminClient } from '@/lib/supabase/admin'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    // Verify the request actually came from Stripe
    // If someone tries to fake a webhook, this will throw
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  // Handle different event types from Stripe
  if (event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated') {

    const subscription = event.data.object as Stripe.Subscription
    const customerId = subscription.customer as string

    // Find which user this Stripe customer belongs to
    const { data: customer } = await adminClient
      .from('customers')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single()

    if (!customer) {
      return new Response('Customer not found', { status: 404 })
    }

    // Update or insert subscription in our database
    await adminClient.from('subscriptions').upsert({
      id: subscription.id,
      user_id: customer.id,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription

    // Remove subscription from database when cancelled
    await adminClient
      .from('subscriptions')
      .delete()
      .eq('id', subscription.id)
  }

  return new Response('OK')
}