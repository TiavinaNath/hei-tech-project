'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'

export default function RequestDetailsPage() {
  const { id } = useParams()
  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequest = async () => {
      const { data, error } = await supabase
        .from('client_requests')
        .select(`
          id,
          title,
          description,
          preferred_date_time,
          address_text,
          status,
          offers(count),
          services(name)
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Erreur de chargement', error)
      } else {
        setRequest(data)
      }

      setLoading(false)
    }

    fetchRequest()
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (!request) return <p>Demande introuvable.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-900">{request.title}</h1>
      <p className="mt-2 text-gray-600">{request.description}</p>
      <p className="mt-2">📍 {request.address_text}</p>
      <p className="mt-2">
        🕒 {format(new Date(request.preferred_date_time), 'EEEE dd MMMM yyyy à HH:mm')}
      </p>
      <p className="mt-2 text-indigo-600 font-semibold">
        💬 {request.offers?.[0]?.count ?? 0} offre(s)
      </p>
      <p className="mt-2">🛠 Service : {request.services?.name}</p>
    </div>
  )
}
