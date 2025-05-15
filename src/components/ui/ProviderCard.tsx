import { calculateAverageRating } from "@/lib/utils/calculateAverageRating";
import Link from "next/link";

export default function ProviderCard({ provider }: { provider: any }) {
  const { average, total } = calculateAverageRating(provider.reviews || []);

  return (
    <Link href={`/provider/${provider.id}`} className="block group">
      <div className="h-full flex flex-col p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#457bed]/20 transition-all duration-200 group-hover:border-[#457bed]/40 min-h-[280px]">
        {/* Photo de profil + Nom - Partie agrandie */}
        <div className="flex items-center space-x-5 mb-5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-[#00c896] p-0.5">
              <img
                src={provider.profile_photo_url || "/default-avatar.jpg"}
                alt={`${provider.user.first_name} ${provider.user.last_name}`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#457bed] transition-colors truncate">
              {provider.user.first_name} {provider.user.last_name}
            </h2>
            {average !== null && (
              <div className="flex items-center mt-2">
                <div className="flex items-center bg-[#457bed]/10 px-3 py-1 rounded-full">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1.5 text-base font-medium text-gray-700">
                    {average.toFixed(1)} <span className="text-gray-500 text-sm">({total})</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services - Partie agrandie */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Services
          </h3>
          <div className="flex flex-wrap gap-3">
            {provider.provider_services?.length > 0 ? (
              provider.provider_services.slice(0, 3).map((ps: any) => (
                <span
                  key={ps.service?.id}
                  className="bg-[#457bed]/10 text-[#457bed] text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {ps.service?.name}
                </span>
              ))
            ) : (
              <span className="text-base text-gray-400">Aucun service</span>
            )}
            {provider.provider_services?.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1.5 rounded-full">
                +{provider.provider_services.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Engagements - Partie agrandie */}
        {provider.provider_engagements?.length > 0 && (
          <div className="mt-auto pt-5 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Engagements
            </h3>
            <div className="space-y-2.5">
              {provider.provider_engagements.slice(0, 2).map((engagement: any) => (
                <div
                  key={engagement.id}
                  className="flex items-center space-x-3 text-base"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00c896] flex-shrink-0"></div>
                  <span className="text-gray-700">{engagement.label}</span>
                </div>
              ))}
              {provider.provider_engagements.length > 2 && (
                <div className="text-sm text-gray-500">
                  +{provider.provider_engagements.length - 2} autres
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}