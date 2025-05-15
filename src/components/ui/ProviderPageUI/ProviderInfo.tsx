// src/components/provider/ProviderInfo.tsx
import LocationSection from "./LocationSection";
import { Provider } from "@/type/provider";

export default function ProviderInfo({ provider }: { provider: Provider }) {
  const averageRating =
    provider.reviews.length > 0
      ? (
          provider.reviews.reduce(
            (sum: number, review: any) => sum + review.rating,
            0
          ) / provider.reviews.length
        ).toFixed(1)
      : "Pas encore évalué";

  return (
    <div className="lg:w-2/3 lg:ml-[33.333333%] p-8">
      {/* Titre (visible sur mobile) */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 lg:hidden">
        {provider.user.first_name} {provider.user.last_name}
      </h1>

      {/* Section À propos */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#457bed] mb-4">À propos</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {provider.bio ||
            "Ce prestataire n'a pas encore rédigé de description."}
        </p>
      </section>

      {/* Section Engagements */}
      {provider.provider_engagements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#457bed] mb-4">
            Engagements clients
          </h2>
          <div className="flex flex-wrap gap-3">
            {provider.provider_engagements.map((engagement: any) => (
              <span
                key={engagement.id}
                className="px-4 py-2 bg-[#457bed]/10 text-[#457bed] rounded-full text-sm font-medium"
              >
                {engagement.label}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Section Équipements */}
      {provider.provider_equipments.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#457bed] mb-4">
            Équipements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {provider.provider_equipments.map((equipment: any) => (
              <div
                key={equipment.id}
                className="p-3 border border-gray-200 rounded-lg flex items-center"
              >
                <svg
                  className="w-5 h-5 text-[#00c896] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{equipment.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section Évaluations */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#457bed]">Évaluations</h2>
          {provider.reviews.length > 3 && (
            <button className="text-[#457bed] hover:underline font-medium">
              Voir toutes les évaluations ({provider.reviews.length})
            </button>
          )}
        </div>

        {provider.reviews.length > 0 ? (
          <div className="space-y-4">
            {provider.reviews.slice(0, 3).map((review: any) => (
              <div
                key={review.id}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Ce prestataire n'a pas encore reçu d'évaluation.
          </p>
        )}
      </section>

      {/* Section Localisation */}
      <LocationSection fixed_location={provider.fixed_location} travel_radius_km={provider.travel_radius_km} />
    </div>
  );
}
