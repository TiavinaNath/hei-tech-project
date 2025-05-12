"use client";
import { COMMON_FIELDS } from "./FormFields/CommonFields";
import FormStep from "./FormStep";

interface ClientSignUpFormProps {
  onSubmit: () => void;
}

export default function ClientSignUpForm({ onSubmit }: ClientSignUpFormProps) {
  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-[#457bed]">Inscription</span>
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
          <FormStep fields={COMMON_FIELDS} values={{}} onChange={() => {}} />

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
