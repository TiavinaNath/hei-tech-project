// src/app/provider/[id]/page.tsx
import ProviderInfo from "@/components/ui/ProviderPageUI/ProviderInfo";
import ProviderProfile from "@/components/ui/ProviderPageUI/ProviderProfile";
import { createClient } from "@/lib/supabase/server";
import { groupProviders } from "@/lib/utils/transformProviderData";

export default async function ProviderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("full_provider_data")
    .select("*")
    .eq("provider_id", params.id);

  if (error || !data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-red-500">
        Erreur ou prestataire introuvable.
      </div>
    );
  }

  const [provider] = groupProviders(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <ProviderProfile provider={provider} />
        <ProviderInfo provider={provider} />
      </div>
    </div>
  );
}