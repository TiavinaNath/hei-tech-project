import { calculateAverageRating } from "@/lib/utils/calculateAverageRating";
import Link from "next/link";

export default function ProviderCard({ provider }: { provider: any }) {
  const { average, total } = calculateAverageRating(provider.reviews || []);

  return (
    <Link href={`/provider/${provider.id}`} className="block">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md space-y-4 max-w-sm mx-auto hover:shadow-lg transition-shadow duration-200">
        {/* PHOTO DE PROFIL */}
        <div className="w-32 h-32 relative">
          <img
            src={provider.profile_photo_url}
            alt="Photo de profil"
            className="w-16 h-16 rounded-full"
          />
        </div>

        {/* NOM DU PROVIDER */}
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            {provider.user.first_name} {provider.user.last_name}
          </h2>

          {/* SERVICES */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {provider.provider_services?.length > 0 ? (
              provider.provider_services.map((ps: any, idx: number) => (
                <span
                  key={ps.service?.id ?? idx}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {ps.service?.name}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                Aucun service renseigné
              </span>
            )}
          </div>
        </div>

        {/* RATING */}
        {average !== null && (
          <div className="flex items-center justify-center text-sm text-yellow-500 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-yellow-500 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.285-3.967z" />
            </svg>
            <span>{average.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">({total} avis)</span>
          </div>
        )}

        {/* ENGAGEMENTS */}
        <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {provider.provider_engagements?.length > 0 ? (
            provider.provider_engagements.map(
              (engagement: any, idx: number) => (
                <div
                  key={engagement.id ?? idx}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <p className="text-gray-700 font-medium">
                    {engagement.label}
                  </p>
                </div>
              )
            )
          ) : (
            <p className="col-span-full text-sm text-gray-500 text-center">
              Aucun engagement renseigné
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
