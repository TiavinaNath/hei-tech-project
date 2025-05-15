export default function ProviderEngagements({ engagements }: { engagements: any[] }) {
  return (
    <div className="mt-2 pt-2 text-sm text-gray-700 ">
      <p>
        Engagements :{' '}
        {engagements.map(e => e.label ?? 'Non renseigné').join(', ')}
      </p>
    </div>
  )
}