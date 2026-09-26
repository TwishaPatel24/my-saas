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
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated') {

    const sub = event.data.object as any

    const { data: customer } = await adminClient
      .from('customers')
      .select('id')
      .eq('stripe_customer_id', sub.customer)
      .single()

    if (!customer) {
      return new Response('Customer not found', { status: 404 })
    }

    await adminClient.from('subscriptions').upsert({
      id: sub.id,
      user_id: customer.id,
      status: sub.status,
      price_id: sub.items.data[0].price.id,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as any
    await adminClient
      .from('subscriptions')
      .delete()
      .eq('id', sub.id)
  }

  return new Response('OK')
}