export default function ProviderServices({ services }: { services: any[] }) {
  return (
    <div className="mt-2 pt-2 border-t border-t-stone-200  text-m text-gray-700">
      <p>Services proposés :</p>
      {services.map((service, index) => (
        <p key={index}>
           {service.services?.name ?? 'Service inconnu'} — {service.experience_years ?? 'Non renseigné'} an(s)
        </p>
      ))}
    </div>
  )
}
