export default function ProviderServices({ services }: { services: any[] }) {
  return (
    <div className="mt-2 border-t pt-2 text-sm text-gray-700">
      <p className="font-semibold">🛠 Services proposés :</p>
      {services.map((service, index) => (
        <p key={index}>
          - {service.services?.name ?? 'Service inconnu'} — {service.experience_years ?? 'Non renseigné'} an(s)
        </p>
      ))}
    </div>
  )
}
