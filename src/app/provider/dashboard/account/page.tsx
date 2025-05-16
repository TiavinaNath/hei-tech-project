// src/app/dashboard/account/page.tsx
import ProviderInfo from "@/components/ui/ProviderPageUI/ProviderInfo";
import ProviderProfile from "@/components/ui/ProviderPageUI/ProviderProfile";
import { createClient } from "@/lib/supabase/server";
import { groupProviders } from "@/lib/utils/transformProviderData";
import { redirect } from "next/navigation";

export default async function ProviderAccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: providerProfile, error: profileError } = await supabase
    .from("provider_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (profileError || !providerProfile) {
    return (
      <div className="text-center mt-10 text-red-500">
        Erreur : profil de prestataire introuvable.
      </div>
    );
  }

  const { data, error } = await supabase
    .from("full_provider_data")
    .select("*")
    .eq("provider_id", providerProfile.id);

  if (error || !data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-red-500">
        Erreur ou données du prestataire introuvables.
      </div>
    );
  }

  const [provider] = groupProviders(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3">
          <ProviderProfile provider={provider}/>
        </div>
        <div className="w-full lg:w-2/3">
          <ProviderInfo provider={provider} />
        </div>
      </div>
    </div>
  );
}
