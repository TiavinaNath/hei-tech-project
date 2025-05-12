"use client";
import { COMMON_FIELDS } from "./FormFields/CommonFields";
import { PROVIDER_FIELDS } from "./FormFields/ProviderFields";
import FormStep from "./FormStep";
import { useState } from "react";

interface ProviderSignUpFormProps {
  onSubmit: () => void;
}

export default function ProviderSignUpForm({
  onSubmit,
}: ProviderSignUpFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => setStep(step + 1);

  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8">
        <div className="mb-8 text-center">
          <h2>
            <span className="text-3xl font-bold text-[#457bed]">
              Inscription
            </span>{" "}
            <span className="text-sm text-gray-500">({step}/4)</span>
          </h2>
        </div>

        <form
          onSubmit={step === 4 ? onSubmit : (e) => e.preventDefault()}
          className="mx-auto max-w-md space-y-4"
        >
          {step === 1 && (
            <FormStep
              fields={COMMON_FIELDS}
              values={formData}
              onChange={handleChange}
            />
          )}

          {step === 2 && (
            <FormStep
              fields={PROVIDER_FIELDS.step2}
              values={formData}
              onChange={handleChange}
            />
          )}

          {step === 3 && (
            <FormStep
              fields={PROVIDER_FIELDS.step3}
              values={formData}
              onChange={handleChange}
            />
          )}

          {step === 4 && (
            <FormStep
              fields={PROVIDER_FIELDS.step4}
              values={formData}
              onChange={handleChange}
            />
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-[#457bed] px-6 py-3 font-medium text-[#457bed]"
              >
                Retour
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto rounded-lg bg-[#457bed] px-6 py-3 font-medium text-white hover:bg-[#3a6bd6]"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto rounded-lg bg-[#00c896] px-6 py-3 font-medium text-white hover:bg-[#00b386]"
              >
                Finaliser l'inscription
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
