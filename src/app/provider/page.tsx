import ProviderCard from "@/components/ui/ProviderCard";
import { createClient } from "@/lib/supabase/server";
import { groupProviders } from "@/lib/utils/transformProviderData";

export default async function ProvidersPage() {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("full_provider_data")
    .select("*");

  if (error) {
    console.error("Erreur lors du chargement des providers:", error.message);
    return <div className="text-center mt-10 text-red-500">Erreur de chargement.</div>;
  }

  const providers = groupProviders(data);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nos Prestataires</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}