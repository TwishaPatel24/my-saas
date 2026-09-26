'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Nav items — we'll add more as we build more pages
const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '▦' },
  { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar({ profile }: { profile: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    // Sign out from Supabase — clears the session cookie
    await supabase.auth.signOut()
    // Send user back to login
    router.push('/login')
  }

  // Get initials for avatar — "John Doe" → "JD"
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : profile?.email?.[0]?.toUpperCase()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      
      {/* Logo */}
      <div className="px-6 h-16 flex items-center border-b border-gray-100">
        <span className="font-bold text-lg text-gray-900">MySaaS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon }) => {
          // Check if this nav item is the current page
          const isActive = pathname === href
          
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-50 text-blue-700'        // active state
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'  // inactive
                }`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          )
        })}

        {/* Admin link — only shows if user is admin */}
        {profile?.role === 'admin' && (
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${pathname.startsWith('/admin')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span>👑</span>
            Admin
          </Link>
        )}
      </nav>

      {/* User info + sign out at bottom */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          
          {/* Avatar circle with initials */}
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {initials}
          </div>
          
          {/* Name and email */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {profile?.full_name ?? 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
          </div>

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="text-gray-400 hover:text-gray-600 transition-colors text-xs"
          >
            ✕
          </button>
        </div>
      </div>

    </aside>
  )
}