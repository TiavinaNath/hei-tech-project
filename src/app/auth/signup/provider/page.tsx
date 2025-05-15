"use client";
import { registerProvider } from "@/app/actions/auth";
import ProviderSignUpForm from "@/components/ui/ProviderSignUpForm";
import WelcomeSection from "@/components/ui/WelcomeSection";
import { uploadToCloudinary } from "@/lib/utils/uploadToCloudinary";

export default function SignupPageProvider() {
  const handleSubmit = async (formData: Record<string, any>) => {
    console.log("Données brutes du formulaire :", formData);

    if (typeof window !== "undefined" && (window as any).selectedFiles) {
      Object.entries((window as any).selectedFiles).forEach(([key, file]) => {
        formData[key] = file;
      });
    }

    try {
      if (
        formData.profile_picture &&
        typeof window !== "undefined" &&
        formData.profile_picture instanceof File
      ) {
        const uploadedUrl = await uploadToCloudinary(formData.profile_picture);
        formData.profile_photo_url = uploadedUrl;
      }

      delete formData.profile_picture;

      console.log("Données finales envoyées à Supabase :", formData);
      await registerProvider(formData);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
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
