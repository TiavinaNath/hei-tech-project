export default function ProviderEquipments({ equipments }: { equipments: any[] }) {
  return (
    <div className="mt-2 pt-2 border-t border-t-stone-200 text-m text-gray-700">
      <p>
        Possède :{' '}
        {equipments.map(e => e.label ?? 'Non renseigné').join(', ')}
      </p>
    </div>
  )
}