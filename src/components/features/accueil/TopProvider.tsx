'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TopProvider() {
  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          first_name,
          last_name,
          role,
          reviews (
            rating
          ),
          provider_profiles (
            id,
            profile_photo_url,
            provider_services (
              experience_years,
              services (
                id,
                name
              )
            ),
            provider_engagements (
              id,
              label
            )
          )
        `)
        .eq('role', 'PROVIDER')

      if (error) {
        console.error('Erreur lors du fetch:', error)
      } else {
        const withRating = data
          .filter((provider: any) => provider.reviews?.length > 0)
          .map((provider: any) => {
            const ratings = provider.reviews.map((r: any) => r.rating)
            const avgRating = ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
            return { ...provider, avgRating }
          })
          .sort((a, b) => b.avgRating - a.avgRating)

        const withoutRating = data.filter((p: any) => !p.reviews || p.reviews.length === 0)
        const shuffled = withoutRating.sort(() => 0.5 - Math.random())

        const combined = [...withRating]
        while (combined.length < 4 && shuffled.length > 0) {
          combined.push({ ...shuffled.pop(), avgRating: 0 })
        }

        setProviders(combined.slice(0, 4))
      }

      setLoading(false)
    }

    fetchProviders()
  }, [])

  if (loading) return <p>Chargement...</p>

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {providers.map((provider, index) => {
          const profile = provider.provider_profiles
          const services = profile?.provider_services || []
          const engagements = profile?.provider_engagements || []

          return (
            <Link key={index} href={`/provider/${profile.id}`} className="block group">
              <div className="h-full flex flex-col p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#457bed]/20 transition-all duration-200 group-hover:border-[#457bed]/40 min-h-[280px]">
                {/* Photo et nom */}
                <div className="flex items-center space-x-5 mb-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border-2 border-[#00c896] p-0.5">
                      <img
                        src={profile?.profile_photo_url || "/default-avatar.jpg"}
                        alt={provider.first_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#457bed] transition-colors truncate">
                      {provider.first_name} {provider.last_name}
                    </h2>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center bg-[#457bed]/10 px-3 py-1 rounded-full">
                        <svg
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1.5 text-base font-medium text-gray-700">
                          {provider.avgRating?.toFixed(1) ?? '0.0'}{' '}
                          <span className="text-gray-500 text-sm">({provider.reviews?.length ?? 0})</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Services
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {services.length > 0 ? (
                      services.slice(0, 3).map((s: any) => (
                        <span
                          key={s.services?.id}
                          className="bg-[#457bed]/10 text-[#457bed] text-sm font-medium px-3 py-1.5 rounded-full"
                        >
                          {s.services?.name ?? 'Service inconnu'}
                        </span>
                      ))
                    ) : (
                      <span className="text-base text-gray-400">Aucun service</span>
                    )}
                    {services.length > 3 && (
                      <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1.5 rounded-full">
                        +{services.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Engagements */}
                {engagements.length > 0 && (
                  <div className="mt-auto pt-5 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Engagements
                    </h3>
                    <div className="space-y-2.5">
                      {engagements.slice(0, 2).map((e: any) => (
                        <div
                          key={e.id}
                          className="flex items-center space-x-3 text-base"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00c896] flex-shrink-0"></div>
                          <span className="text-gray-700">{e.label}</span>
                        </div>
                      ))}
                      {engagements.length > 2 && (
                        <div className="text-sm text-gray-500">
                          +{engagements.length - 2} autres
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
       <div className="flex justify-end mt-6">
  <Link href="/provider">
    <button className="bg-[#457bed] text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-[#2e5fc1] transition flex items-center gap-2">
      Voir plus
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </Link>
</div>
    </div>
  )
}
