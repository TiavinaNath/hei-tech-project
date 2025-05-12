"use client";
import ClientSignUpForm from "@/components/features/auth/ClientSignUpForm";
import WelcomeSection from "@/components/ui/WelcomeSection";

export default function SignupPageClient() {

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("Données du formulaire:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#00c896]/10 shadow-[0_0_0_1px_rgba(0,200,150,0.1)] md:flex-row">
        <WelcomeSection
          title="Cher Client"
          lines={[
            "Entrez dans un monde où vos besoins rencontrent les bonnes mains,",
            "Créez votre compte et laissez vos projets s’épanouir,",
            "Simple, rapide, sans limite.",
          ]}
          isLoginPage={false}
        />
        <ClientSignUpForm onSubmit={handleSubmit}/>
      </div>
    </div>
  );
}
