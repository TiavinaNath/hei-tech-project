import { MapPin, Truck } from 'lucide-react'
import { useState } from 'react'

export default function ProviderProfile({ profile }: { profile: any }) {
    const [showFullBio, setShowFullBio] = useState(false)
  const bio = profile.bio ?? 'Non renseigné'
  const isLong = bio.length > 100
  return (
    <div className="mt-2 pt-2 border-t border-t-stone-200  text-m text-gray-700 space-y-2">
      <div className="mt-2 pt-2 text-m text-gray-700 space-y-2">
      <div className="flex items-center">
        <p className={`${!showFullBio && isLong ? 'truncate' : ''}`}>
          {showFullBio || !isLong ? bio : bio.slice(0, 100) + '...'}
        </p>
        {isLong && (
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="ml-2 text-[#457bed] hover:underline text-xs"
          >
            {showFullBio ? 'Voir moins' : 'Voir plus'}
          </button>
        )}
      </div>
    </div>

      <div className="flex items-center gap-2">
        <MapPin size={18} className="text-[#457bed]" />
        <span>Rayon de déplacement : {profile.travel_radius_km ?? 'Non renseigné'} km</span>
      </div>

      <div className="flex items-center gap-2">
        <Truck size={18} className="text-[#457bed]" />
        <span>{profile.is_mobile ? 'Peux se déplacer à domicile' : 'Ne se déplace pas'}</span>
      </div>
    </div>
  )
}


