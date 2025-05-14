export default function ProviderEquipments({ equipments }: { equipments: any[] }) {
  return (
    <div className="mt-2 border-t pt-2 text-sm text-gray-700">
      <p>
        🧰 Équipements :{' '}
        {equipments.map(e => e.label ?? 'Non renseigné').join(', ')}
      </p>
    </div>
  )
}
