import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Not logged in at all
  if (!user) redirect('/login')

  // Check their role in profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Not an admin — send them to dashboard
  // Regular users should never see the admin panel
  if (profile?.role !== 'admin') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg text-gray-900">MySaaS</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-red-600">Admin Panel</span>
        </div>
        <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to Dashboard
        </a>
      </div>
      
      <main className="p-8">{children}</main>
    </div>
  )
}