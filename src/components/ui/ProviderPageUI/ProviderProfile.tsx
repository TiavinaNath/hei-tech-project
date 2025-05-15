type Provider = {
  user: {
    first_name: string;
    last_name: string;
  };
  profile_photo_url: string;
  provider_services: any[];
  reviews: any[];
};

export default function ProviderProfile({ provider }: { provider: Provider }) {
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
    <div className="lg:w-1/3 lg:fixed lg:h-screen lg:overflow-hidden bg-gray-100 flex flex-col items-center pt-12 px-6">
      {/* Photo ronde avec bordure bleue */}
      <div className="relative w-64 h-64 mb-8 rounded-full overflow-hidden border-4 border-[#00c896] shadow-lg">
        <img
          src={provider.profile_photo_url || "/default-profile.jpg"}
          alt={`${provider.user.first_name} ${provider.user.last_name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Infos texte */}
      <div className="text-center bg-white p-6 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800">
          {provider.user.first_name} {provider.user.last_name}
        </h2>

        {provider.provider_services.length > 0 && (
          <p className="text-[#457bed] font-medium mt-2 text-lg">
            {provider.provider_services[0].service.name}
          </p>
        )}

        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center bg-[#457bed]/10 px-4 py-2 rounded-full">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-2 text-gray-700 font-medium">
              {averageRating}{" "}
              {typeof averageRating === "string"
                ? ""
                : `(${provider.reviews.length} avis)`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
