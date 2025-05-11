"use client";
import SignUpFormUI from "@/components/ui/SignUpFormUI";
import WelcomeSection from "@/components/ui/WelcomeSection";

export default function SignupPageProvider() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#00c896]/10 shadow-[0_0_0_1px_rgba(0,200,150,0.1)] md:flex-row">
        <WelcomeSection
          title="Cher Prestataire"
          lines={[
            "Rejoignez ceux qui transforment les idées en actions,",
            "Créez votre profil et faites briller votre savoir-faire,",
            "Simple, rapide, sans limite.",
          ]}
        />
        <SignUpFormUI
          onSubmit={() => console.log("Inscription prestataire soumise")}
          userType="provider"
        />
      </div>
    </div>
  );
}
