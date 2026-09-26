import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">MySaaS</span>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          <span>✨</span>
          <span>Now in public beta</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Build your SaaS
          <br />
          <span className="text-blue-600">faster than ever</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          The complete boilerplate with auth, billing, and dashboard built in.
          Ship your idea in days, not months.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-200 hover:border-gray-300 transition-colors text-lg"
          >
            Sign in
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required</p>
      </section>

      {/* Features section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-gray-500 text-lg">
              Stop building the same things over and over.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔐',
                title: 'Authentication',
                description: 'Email and Google OAuth login out of the box. Secure sessions with Supabase.'
              },
              {
                icon: '💳',
                title: 'Billing',
                description: 'Stripe integration with subscription management, webhooks and billing portal.'
              },
              {
                icon: '📊',
                title: 'Dashboard',
                description: 'Beautiful dashboard with sidebar navigation, settings and user profile.'
              },
              {
                icon: '👑',
                title: 'Admin Panel',
                description: 'Manage all your users, see their plans and monitor your business.'
              },
              {
                icon: '🗄️',
                title: 'Database',
                description: 'Supabase PostgreSQL with row level security. Your data is always safe.'
              },
              {
                icon: '🚀',
                title: 'Deploy Ready',
                description: 'Deploy to Vercel in one click. Production ready from day one.'
              }
            ].map(feature => (
              <div key={feature.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple pricing
            </h2>
            <p className="text-gray-500 text-lg">
              Start free, upgrade when you need to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Free plan */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  '1 project',
                  'Basic features',
                  'Email support',
                  '500MB storage'
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Get started free
              </Link>
            </div>

            {/* Pro plan */}
            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Pro</h3>
                <span className="bg-blue-500 text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Popular
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-blue-200">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited projects',
                  'All features',
                  'Priority support',
                  'Custom domain',
                  'Advanced analytics'
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                    <span className="text-white font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-white text-blue-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Get started
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-600 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to ship faster?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of developers building with MySaaS.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg inline-block"
          >
            Start for free today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="font-bold text-gray-900">MySaaS</span>
          <p className="text-sm text-gray-400">© 2026 MySaaS. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-gray-900">Login</Link>
            <Link href="/signup" className="hover:text-gray-900">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}