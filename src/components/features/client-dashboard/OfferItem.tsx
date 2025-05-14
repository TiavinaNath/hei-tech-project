import { format } from 'date-fns'
import ProviderProfile from '@/components/features/client-dashboard/ProviderProfile'
import ProviderServices from '@/components/features/client-dashboard/ProviderServices'
import ProviderEquipments from '@/components/features/client-dashboard/ProviderEquipments'
import ProviderReviews from '@/components/features/client-dashboard/ProviderReviews'

export default function OfferItem({ offer }: { offer: any }) {
  const user = offer.users
  const profile = user?.provider_profiles

  return (
    <li className="p-4 border rounded-lg bg-gray-50 shadow">
      <p className="text-sm text-gray-600">📝 {offer.message}</p>
      <p className="font-medium text-green-700 mt-1">💰 {offer.proposed_price} Ar</p>
      <p className="text-xs text-gray-400 mt-1">
        📅 {format(new Date(offer.created_at), 'dd/MM/yyyy à HH:mm')}
      </p>

      {user && <p className="mt-2 border-t pt-2 text-sm">👤 Prénom : {user.first_name ?? 'Non renseigné'}</p>}
      {profile && <ProviderProfile profile={profile} />}
      {profile?.provider_services?.length > 0 && <ProviderServices services={profile.provider_services} />}
      {profile?.provider_equipments?.length > 0 && <ProviderEquipments equipments={profile.provider_equipments} />}
      {user?.provider_review_counts_by_service?.length > 0 && (
        <ProviderReviews reviews={user.provider_review_counts_by_service} />
      )}
    </li>
  )
}
