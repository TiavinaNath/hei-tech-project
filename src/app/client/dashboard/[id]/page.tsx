'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import RequestHeader from '@/components/features/client-dashboard/RequestHeader'
import OffersList from '@/components/features/client-dashboard/OffersList'

export default function RequestDetailsPage() {
  const { id } = useParams()
  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

useEffect(() => {
  const fetchData = async () => {
    // 1. Récupérer userId
    const userRes = await fetch('/api/user')
    const userData = await userRes.json()
    setUserId(userData.userId)

    // 2. Charger la requête depuis Supabase
    const { data, error } = await supabase
      .from('client_requests')
      .select(`
        id,
        title,
        description,
        preferred_date_time,
        address_text,
        status,
        services(name),
        offers(
          id,
          message,
          proposed_price,
          created_at,
          users(
            id,
            first_name,
            provider_profiles(
              bio,
              is_mobile,
              travel_radius_km,
              profile_photo_url,
              provider_services(
                experience_years,
                services(name)
              ),
              provider_equipments(label),
              provider_engagements(label)
            ),
            provider_review_counts_by_service(
              service_name,
              total_reviews
            )
          )
        )
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

  fetchData()
}, [id])


  if (loading) return <p>Chargement...</p>
  if (!request) return <p>Demande introuvable.</p>

  return (
    <div className="p-6" style={{border: '1px solid red'}}>
      <RequestHeader request={request} />
      {userId && (<OffersList
        offers={request.offers}
        requestId={request.id}
        clientId={userId}
        isClientView={true}
      />)}
    </div>
  )
}