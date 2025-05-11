"use client";
import AuthForm from "@/components/ui/SignUpFormUI";
import WelcomeSection from "@/components/ui/WelcomeSection";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#00c896]/10 shadow-[0_0_0_1px_rgba(0,200,150,0.1)] md:flex-row">
        <WelcomeSection />
        <AuthForm onSubmit={() => console.log("submitted")} />
      </div>
    </div>
  );
}
