'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function TopProvider() {
  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          first_name,
          provider_profiles (
            profile_photo_url,
            services (
              name
            ),
            reviews (
              rating
            ),
            provider_engagements (
              label
            )
          )
        `)

      if (error) {
        console.error('Erreur lors du fetch:', error)
      } else {
        setProviders(data)
      }

      setLoading(false)
    }

    fetchProviders()
  }, [])

  if (loading) return <p>Chargement...</p>

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-bold mb-2">{provider.first_name ?? 'Prénom inconnu'}</h3>
            <img
              src={provider.provider_profiles?.profile_photo_url ?? '/default.png'}
              alt="Profil"
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
            <p><strong>Services:</strong></p>
            <ul className="list-disc pl-5">
              {provider.provider_profiles?.services?.map((service: any, i: number) => (
                <li key={i}>{service.name}</li>
              ))}
            </ul>
            <p className="mt-2"><strong>Engagements:</strong></p>
            <ul className="list-disc pl-5">
              {provider.provider_profiles?.provider_engagements?.map((engagement: any, i: number) => (
                <li key={i}>{engagement.label}</li>
              ))}
            </ul>
            <p className="mt-2"><strong>Notes:</strong></p>
            <ul className="list-disc pl-5">
              {provider.provider_profiles?.reviews?.map((review: any, i: number) => (
                <li key={i}>{review.rating} ⭐</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}