'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'

export default function MyRequestPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session?.user) {
        console.error('Utilisateur non connecté ou erreur session:', sessionError)
        setLoading(false)
        return
      }

      const userId = session.user.id

      const { data, error } = await supabase
        .from('client_requests')
        .select('title, description, preferred_date_time, status')
        .eq('client_id', userId)

      if (error) {
        console.error('Erreur lors du fetch:', error)
      } else {
        setRequests(data)
      }

      setLoading(false)
    }

    fetchRequests()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mes demandes</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : requests.length === 0 ? (
        <p>Aucune demande trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, index) => (
            <li
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-bold">{req.title}</h3>
              <p>{req.description}</p>
              <p>
                <strong>Date préférée :</strong>{' '}
                {format(new Date(req.preferred_date_time), 'dd/MM/yyyy HH:mm')}
              </p>
              <p>
                <strong>Statut :</strong> {req.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
