"use client";
import { COMMON_FIELDS } from "../../ui/FormFields/CommonFields";
import FormStep from "../../ui/FormStep";
import { useState } from "react";

interface ClientSignUpFormProps {
  onSubmit: (formData: Record<string, string>) => void;
}

export default function ClientSignUpForm({ onSubmit }: ClientSignUpFormProps) {
  const initialFormData = {
    last_name: "",
    first_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-[#457bed]">Inscription</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
          <FormStep
            fields={COMMON_FIELDS}
            values={formData}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#457bed] px-6 py-3 font-medium text-white transition-all hover:bg-[#3a6bd6]"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
