"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { COMMON_FIELDS } from "@/components/ui/FormFields/CommonFields";
import FormStep from "@/components/ui/FormStep";
import { SignUpUserFormData, signUpUserSchema } from "@/lib/validators/user";

interface ClientSignUpFormProps {
  onSubmit: (data: SignUpUserFormData) => Promise<void>;
}

export default function ClientSignUpForm({ onSubmit }: ClientSignUpFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpUserFormData>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const processSubmit = async (data: SignUpUserFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-[#457bed]">Inscription</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(processSubmit)}
          className="mx-auto max-w-md space-y-4"
        >
          <FormStep
            fields={COMMON_FIELDS}
            register={register}
            errors={errors}
            watch={watch}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-[#457bed] px-6 py-3 font-medium text-white transition-all hover:bg-[#3a6bd6] disabled:opacity-70"
          >
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}
