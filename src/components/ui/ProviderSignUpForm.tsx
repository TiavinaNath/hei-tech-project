"use client";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "@/lib/validators/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import FormStep from "@/components/ui/FormStep";
import { COMMON_FIELDS } from "@/components/ui/FormFields/CommonFields";
import { PROVIDER_FIELDS } from "@/components/ui/FormFields/ProviderFields";

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;
type Step4 = z.infer<typeof step4Schema>;

type AllSteps = Step1 &
  Step2 &
  Step3 &
  Step4 & {
    coordinates?: { lat: number; lon: number };
  };

interface ProviderSignUpFormProps {
  onSubmit: (data: AllSteps) => Promise<void>;
}

const schemas = [step1Schema, step2Schema, step3Schema, step4Schema];
const fieldsPerStep = [
  COMMON_FIELDS,
  PROVIDER_FIELDS.step2,
  PROVIDER_FIELDS.step3,
  PROVIDER_FIELDS.step4,
];

export default function ProviderSignUpForm({
  onSubmit,
}: ProviderSignUpFormProps) {
  const [step, setStep] = useState(0);
  const [collectedData, setCollectedData] = useState<Partial<AllSteps>>({});
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const currentSchema = schemas[step];
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: collectedData,
  });

  const handleAddressSelect = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const currentData = getValues();
    setCollectedData((prev) => ({
      ...prev,
      ...currentData,
      ...(coordinates && { coordinates }), // Ajoute les coordonnées
    }));

    if (step < schemas.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      const finalData = {
        ...collectedData,
        ...currentData,
        coordinates, // Inclut les coordonnées dans les données finales
        role: "PROVIDER",
      } as AllSteps;
      await onSubmit(finalData);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-[#457bed]">Inscription Prestataire</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(handleNext)}
          className="mx-auto max-w-md space-y-4"
        >
          <FormStep
            fields={fieldsPerStep[step]}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onAddressSelect={handleAddressSelect}
          />

          <div className="mt-6 flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="text-[#457bed]"
              >
                Retour
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto rounded-lg bg-[#457bed] px-6 py-3 font-medium text-white transition-all hover:bg-[#3a6bd6] disabled:opacity-70"
            >
              {step === schemas.length - 1
                ? "Finaliser l'inscription"
                : "Suivant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
