import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { adminClient } from '@/lib/supabase/admin'
import { createCheckoutSession, createPortalSession } from '@/lib/stripe/actions'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subscription } = await adminClient
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="p-8 max-w-4xl">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">Manage your subscription and billing.</p>
      </div>

      {/* Current plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>

        {subscription?.status === 'active' ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-gray-900">Pro</span>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Renews on{' '}
              <span className="font-medium text-gray-900">
                {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </span>
            </p>
            <form action={createPortalSession}>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Manage Subscription
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-gray-900">Free</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Current
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Upgrade to Pro to unlock all features.
            </p>
          </div>
        )}
      </div>

      {/* Pricing plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Free plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">Free</h3>
          <div className="mt-2 mb-4">
            <span className="text-3xl font-bold text-gray-900">$0</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            {['1 project', 'Basic features', 'Email support'].map(feature => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button
            disabled
            className="w-full border border-gray-300 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* Pro plan */}
        <div className="bg-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Pro</h3>
          <div className="mt-2 mb-4">
            <span className="text-3xl font-bold">$29</span>
            <span className="text-blue-200 text-sm">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            {['Unlimited projects', 'All features', 'Priority support', 'Custom domain'].map(feature => (
              <li key={feature} className="flex items-center gap-2 text-sm text-blue-100">
                <span className="text-white">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <form action={createCheckoutSession.bind(null, 'price_placeholder')}>
            <button
              type="submit"
              className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Upgrade to Pro
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}