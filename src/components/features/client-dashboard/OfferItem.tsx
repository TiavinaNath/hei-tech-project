import styles from '@/app/style/OfferItem.module.css'
import ContactButton from '@/components/features/offer/ContactButton'
import ProviderProfile from '@/components/features/client-dashboard/ProviderProfile'
import ProviderServices from '@/components/features/client-dashboard/ProviderServices'
import ProviderEquipments from '@/components/features/client-dashboard/ProviderEquipments'
import ProviderReviews from '@/components/features/client-dashboard/ProviderReviews'
import Link from 'next/link'


export default function OfferItem({
  offer,
  requestId,
  clientId,
  isClientView
}: {
  offer: any
  requestId: string
  clientId: string
  isClientView: boolean
}) {
  const user = offer.users
  const profile = user?.provider_profiles

  return (
    <li className={`${styles.offerCard} ${styles.fadeIn}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div>
            {profile?.profile_photo_url && (
              <img
                src={profile.profile_photo_url}
                alt="Profil"
                className={styles.profileImage}
              />
            )}
          </div>
          <div>
           
          <Link
  href={`/provider/${profile?.id}`}
  className="text-gray-800 hover:text-[#457bed] transition-colors duration-200 font-medium"
>
  {user?.first_name ?? 'Nom inconnu'}
</Link>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {user?.provider_review_counts_by_service?.length > 0 && (
                <ProviderReviews reviews={user.provider_review_counts_by_service} />
              )}
            </div>
            <div className={styles.engagements}>
              {profile?.provider_engagements?.map((e: any, i: number) => (
                <span key={i} className={styles.engagementBadge}>
                  {e.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prix */}
        <p className={styles.price}>{offer.proposed_price} Ar</p>
      </div>

      {/* Corps du contenu */}
      <div className={styles.bodyContent}>
        <p className={styles.message}>{offer.message}</p>

        {profile && <ProviderProfile profile={profile} />}
        {profile?.provider_services?.length > 0 && (
          <ProviderServices services={profile.provider_services} />
        )}
        {profile?.provider_equipments?.length > 0 && (
          <ProviderEquipments equipments={profile.provider_equipments} />
        )}
      </div>
        <div className={styles.buttonsGroup}>
        <ContactButton
          requestId={requestId}
          clientId={clientId}
          providerId={user?.id}
          isClientView={isClientView}
        />
        <button>Accepter</button>
      </div>
    </li>
  )
}
