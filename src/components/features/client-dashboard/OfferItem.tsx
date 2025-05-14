import { format } from 'date-fns'
import ProviderProfile from '@/components/features/client-dashboard/ProviderProfile'
import ProviderServices from '@/components/features/client-dashboard/ProviderServices'
import ProviderEquipments from '@/components/features/client-dashboard/ProviderEquipments'
import ProviderReviews from '@/components/features/client-dashboard/ProviderReviews'
import { Star } from 'lucide-react'

export default function OfferItem({ offer }: { offer: any }) {
  const user = offer.users
  const profile = user?.provider_profiles

  return (
    <li className="flex flex-col gap-4  rounded-xl p-4 bg-white shadow-md w-3/4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            {profile?.profile_photo_url && (
              <img
                src={profile.profile_photo_url}
                alt="Profil"
                className="w-30 h-30 rounded-full object-cover border"
              />
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">{user?.first_name ?? 'Nom inconnu'}</p>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {user?.provider_review_counts_by_service?.length > 0 && (
                    <ProviderReviews reviews={user.provider_review_counts_by_service} />
                    )}
            </div>
            <div className="mt-1 flex gap-2 text-xs">
            {profile?.provider_engagements?.map((e: any, i: number) => (
          <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-800">
            {e.label}
          </span>
        ))}
            </div>
          </div>
        </div>
        <p className="text-lg font-bold">{offer.proposed_price} Ar</p>
      </div>
        <div style={{padding: '8px', borderRadius: '8px', background: ''}}className="bg-gray-100 text-gray-800">
      {/* Message de l'offre */}
      <p className="text-m text-gray-600 pt-2">{offer.message}</p>

      {/* Bio / Services / Équipements */}
      {profile && <ProviderProfile profile={profile} />}
      {profile?.provider_services?.length > 0 && <ProviderServices services={profile.provider_services} />}
      {profile?.provider_equipments?.length > 0 && <ProviderEquipments equipments={profile.provider_equipments} />}
        </div>
    </li>
  )
}
