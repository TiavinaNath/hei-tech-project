'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { format } from 'date-fns'

export default function MyRequestPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('client_requests')
        .select('title, description, preferred_date_time, status')

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
    <div>
      <h1>Mes demandes</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {requests.map((req, index) => (
            <li
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
              }}
            >
              <h3>{req.title}</h3>
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
