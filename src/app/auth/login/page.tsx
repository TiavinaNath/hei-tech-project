"use client";
import { loginUser } from "@/app/actions/auth";
import LoginForm from "@/components/ui/LoginFormUI";
import WelcomeSection from "@/components/ui/WelcomeSection";
import { LoginUserFormData } from "@/lib/validators/provider";

export default function LoginPage() {
  const handleSubmit = async (formData: LoginUserFormData) => {
    await loginUser(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#00c896]/10 shadow-[0_0_0_1px_rgba(0,200,150,0.1)] md:flex-row">
        <WelcomeSection
          title="à vous"
          lines={[
            "Connectez-vous pour retrouver vos projets, vos contacts et vos opportunités en un instant.",
            "Votre espace personnel, sécurisé et pensé pour vous simplifier la vie.",
          ]}
          isLoginPage={true}
        />
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
