"use client"
import { registerProvider } from "@/app/actions/auth";
import ProviderSignUpForm from "@/components/ui/ProviderSignUpForm";
import WelcomeSection from "@/components/ui/WelcomeSection";

export default function SignupPageProvider() {
  const handleSubmit = async (formData: Record<string, any>) => {
    console.log("Données finales envoyées à Supabase :", formData);
    await registerProvider(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#00c896]/10 shadow-[0_0_0_1px_rgba(0,200,150,0.1)] md:flex-row">
        <WelcomeSection
          title="Cher Prestataire"
          lines={[
            "Votre talent mérite d’être découvert.",
            "Rejoignez-nous et connectez-vous à ceux qui ont besoin de vous.",
            "Créer votre compte n’a jamais été aussi fluide.",
          ]}
          isLoginPage={false}
        />
        <ProviderSignUpForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
