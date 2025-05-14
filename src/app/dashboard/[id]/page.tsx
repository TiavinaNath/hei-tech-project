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
        .select(
          `
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
                provider_equipments(label)
              ),
              provider_review_counts_by_service(
                service_name,
                total_reviews
              )
            )
          )
          `
        )
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
      <p className="mt-2">🛠 Service : {request.services?.name}</p>

      {request.offers?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Offres reçues :</h2>
          <ul className="space-y-4">
            {request.offers.map((offer: any) => (
              <li key={offer.id} className="p-4 border rounded-lg bg-gray-50 shadow">
                <p className="text-sm text-gray-600">📝 {offer.message}</p>
                <p className="font-medium text-green-700 mt-1">
                  💰 {offer.proposed_price} Ar
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  📅 {format(new Date(offer.created_at), 'dd/MM/yyyy à HH:mm')}
                </p>

                {/* User info */}
                {offer.users && (
                  <div className="mt-2 border-t pt-2 text-sm text-gray-700">
                    <p>👤 Prénom : {offer.users.first_name ?? 'Non renseigné'}</p>
                  </div>
                )}

                {offer.users.provider_profiles && (
                  <div className="mt-2 border-t pt-2 text-sm text-gray-700">
                    <p>🧾 Bio : {offer.users.provider_profiles.bio ?? 'Non renseigné'}</p>
                    <p>📍 Rayon de déplacement : {offer.users.provider_profiles.travel_radius_km ?? 'Non renseigné'} km</p>
                    <p>📱 Mobile : {offer.users.provider_profiles.is_mobile ? 'Oui' : 'Non'}</p>

                    {offer.users.provider_profiles.profile_photo_url && (
                      <img
                        src={offer.users.provider_profiles.profile_photo_url}
                        alt="Photo de profil"
                        className="mt-2 w-20 h-20 object-cover rounded-full border"
                      />
                    )}
                  </div>
                )}

                {offer.users.provider_profiles.provider_services.length > 0 && (
                  <div className="mt-2 border-t pt-2 text-sm text-gray-700">
                    <p className="font-semibold">🛠 Services proposés :</p>
                    {offer.users.provider_profiles.provider_services.map(
                      (
                        service: {
                          experience_years: number | null
                          services?: { name: string }
                        },
                        index: number
                      ) => (
                        <p key={index}>
                          - {service.services?.name ?? 'Service inconnu'} — {service.experience_years ?? 'Non renseigné'} an(s)
                        </p>
                      )
                    )}
                  </div>
                )}

                {offer.users.provider_profiles.provider_equipments.length > 0 && (
                  <div className="mt-2 border-t pt-2 text-sm text-gray-700">
                    <p>
                      🧰 Équipements :{' '}
                      {offer.users.provider_profiles.provider_equipments
                        .map((equipment: { label: string | null }) => equipment.label ?? 'Non renseigné')
                        .join(', ')}
                    </p>
                  </div>
                )}

                {offer.users.provider_review_counts_by_service.length > 0 && (
                  <div className="mt-2 border-t pt-2 text-sm text-gray-700">
                    <p className="font-semibold">⭐ Avis reçus :</p>
                    <ul className="list-disc ml-5">
                      {offer.users.provider_review_counts_by_service.map(
                        (
                          review: {
                            service_name: string | null
                            total_reviews: number | null
                          },
                          index: number
                        ) => (
                          <li key={index}>
                            {review.service_name ?? 'Service inconnu'} : {review.total_reviews ?? 0} avis
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
