export default function ProviderReviews({ reviews }: { reviews: any[] }) {
  return (
    <div className="mt-2 border-t pt-2 text-sm text-gray-700">
      <p className="font-semibold">⭐ Avis reçus :</p>
      <ul className="list-disc ml-5">
        {reviews.map((review, index) => (
          <li key={index}>
            {review.service_name ?? 'Service inconnu'} : {review.total_reviews ?? 0} avis
          </li>
        ))}
      </ul>
    </div>
  )
}
