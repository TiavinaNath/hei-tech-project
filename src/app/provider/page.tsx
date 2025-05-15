import ProviderCard from "@/components/ui/ProviderCard";
import { createClient } from "@/lib/supabase/server";
import { groupProviders } from "@/lib/utils/transformProviderData";

export default async function ProvidersPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("full_provider_data").select("*");

  if (error) {
    console.error("Erreur lors du chargement des providers:", error.message);
    return (
      <div className="text-center mt-10 text-red-500">
        Erreur de chargement.
      </div>
    );
  }

  const providers = groupProviders(data);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* En-tête amélioré */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Nos Prestataires</h1>
        <p className="text-gray-500">
          {providers.length}{" "}
          {providers.length > 1
            ? "professionnels disponibles"
            : "professionnel disponible"}
        </p>
      </div>

      {/* Grille améliorée */}
      {providers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Aucun prestataire disponible
          </h3>
          <p className="text-gray-500">
            Revenez plus tard pour découvrir nos professionnels.
          </p>
        </div>
      )}

      {/* Pied de page optionnel */}
      {providers.length > 8 && (
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Vous avez vu tous nos {providers.length} prestataires.
            Contactez-nous pour plus d'informations.
          </p>
        </div>
      )}
    </div>
  );
}
