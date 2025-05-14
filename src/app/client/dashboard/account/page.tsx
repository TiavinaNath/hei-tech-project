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
        <div className="w-2/3 p-8">
          <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Nom</label>
              <p className="mt-1 w-full px-2 py-1">{profile.last_name || '—'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Prénom(s)</label>
              <p className="mt-1 w-full px-2 py-1">{profile.first_name || '—'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Email</label>
              <p className="mt-1 w-full px-2 py-1">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Date d'inscription</label>
              <p className="mt-1 w-full px-2 py-1">{new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
