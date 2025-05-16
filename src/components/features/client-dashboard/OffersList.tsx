import OfferItem from '@/components/features/client-dashboard/OfferItem'

export default function OffersList({
  offers,
  requestId,
  clientId,
  isClientView
}: {
  offers: any[]
  requestId: string
  clientId: string
  isClientView: boolean
}) {
  if (!offers?.length) return null

  return (
    <div className="mt-6 p-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Offres reçues :</h2>
      <ul className="space-y-4">
        {offers.map(offer => (
          <OfferItem
            key={offer.id}
            offer={offer}
            requestId={requestId}
            clientId={clientId}
            isClientView={isClientView}
          />
        ))}
      </ul>
    </div>
  )
}
