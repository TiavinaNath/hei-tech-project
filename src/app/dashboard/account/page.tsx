'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FaUserCircle } from 'react-icons/fa' 

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const user = session.user
  const profile = user.user_metadata || {}

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto flex">
        <div className="w-1/3 p-6 flex flex-col items-center justify-center">
        <FaUserCircle className="text-gray-400 w-28 h-28 mb-4" />
      </div>

        {/* Right panel */}
        <div className="w-full max-w-4xl p-8 mx-auto bg-white shadow-md rounded-2xl">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Informations personnelles</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Nom</label>
      <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800">
        {profile.last_name || '—'}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Prénom(s)</label>
      <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800">
        {profile.first_name || '—'}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
      <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800">
        {user.email}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Date d'inscription</label>
      <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800">
        {new Date(user.created_at).toLocaleDateString('fr-FR')}
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}
