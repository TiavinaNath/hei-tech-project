// app/components/UsersList.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')

      if (error) {
        console.error('Erreur de chargement :', error)
      } else {
        setUsers(data)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Chargement des utilisateurs...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold">{user.nom ?? 'Nom inconnu'}</h2>
          <p>Email : {user.email ?? 'Non fourni'}</p>
          <p>Ville : {user.first_name ?? 'Non précisé'}</p>
        </div>
      ))}
    </div>
  )
}
