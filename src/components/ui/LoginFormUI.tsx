"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, LoginUserFormData } from "@/lib/validators/login";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (data: LoginUserFormData) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const processSubmit = async (data: LoginUserFormData) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
    } catch (err: any) {
      setSubmitError("Email ou mot de passe incorrect.");
      console.error(err);
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8 md:p-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            <span className="text-[#457bed]">Connexion</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(processSubmit)}
          className="mx-auto max-w-md space-y-8"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
              placeholder="Votre email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
              placeholder="Votre mot de passe"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-lg bg-[#457bed] px-6 py-4 font-medium text-white transition-all hover:bg-[#3a6bd6] focus:outline-none focus:ring-4 focus:ring-[#457bed]/50"
          >
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
