export default function ProviderProfile({ profile }: { profile: any }) {
  return (
    <div className="mt-2 border-t pt-2 text-sm text-gray-700">
      <p>🧾 Bio : {profile.bio ?? 'Non renseigné'}</p>
      <p>📍 Rayon de déplacement : {profile.travel_radius_km ?? 'Non renseigné'} km</p>
      <p>📱 Mobile : {profile.is_mobile ? 'Oui' : 'Non'}</p>
      {profile.profile_photo_url && (
        <img
          src={profile.profile_photo_url}
          alt="Photo de profil"
          className="mt-2 w-20 h-20 object-cover rounded-full border"
        />
      )}
    </div>
  )
}
