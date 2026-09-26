import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="p-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {profile?.full_name ?? user.email} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Plan</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">Free</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Member since</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Role</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 capitalize">{profile?.role}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-24">Name</span>
            <span className="text-sm text-gray-900">{profile?.full_name ?? '—'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-24">Email</span>
            <span className="text-sm text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-24">Role</span>
            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">{profile?.role}</span>
          </div>
        </div>
      </div>

    </div>
  )
}