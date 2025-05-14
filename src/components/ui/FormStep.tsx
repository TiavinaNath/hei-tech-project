"use client";
import { SignUpUserFormData } from "@/lib/validators/user";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import Field from "@/type/field";
import AddressAutocomplete from "../features/provider-address/AddressAutoCompletedField";

interface FormStepProps {
  fields: Field[];
  register: UseFormRegister<SignUpUserFormData>;
  errors: FieldErrors<SignUpUserFormData>;
  watch?: UseFormWatch<SignUpUserFormData>;
  setValue?: UseFormSetValue<SignUpUserFormData>;
  onAddressSelect?: (lat: number, lon: number) => void;
}

export default function FormStep({
  fields,
  register,
  errors,
  watch,
  setValue,
  onAddressSelect,
}: FormStepProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (
          field.showIf &&
          watch &&
          !watch(field.showIf as keyof SignUpUserFormData)
        ) {
          return null;
        }

        return (
          <div key={field.id}>
            {/* Ne pas afficher le label pour les checkbox et address-autocomplete */}
            {field.type !== "checkbox" && field.type !== "address-autocomplete" && (
              <label
                htmlFor={field.id}
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
            )}

            {/* Gestion des différents types de champs */}
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                {...register(field.id)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
                placeholder={field.placeholder}
                aria-invalid={errors[field.id] ? "true" : "false"}
              />
            ) : field.type === "checkbox" ? (
              <div className="flex items-center">
                <input
                  id={field.id}
                  type="checkbox"
                  {...register(field.id)}
                  className="h-5 w-5 rounded border-gray-200 focus:ring-[#457bed]"
                />
                <label
                  htmlFor={field.id}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
              </div>
            ) : field.type === "file" ? (
              <input
                id={field.id}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    (window as any).selectedFiles = {
                      ...(window as any).selectedFiles,
                      [field.id]: file,
                    };
                  }
                }}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
              />
            ) : field.type === "address-autocomplete" ? (
              <AddressAutocomplete
                id={field.id}
                value={watch ? watch(field.id as keyof SignUpUserFormData) || "" : ""}
                onChange={(value) => {
                  if (setValue) {
                    setValue(field.id, value);
                  }
                }}
                onSelect={(address, lat, lon) => {
                  if (setValue) {
                    setValue(field.id, address);
                  }
                  if (onAddressSelect) {
                    onAddressSelect(lat, lon);
                  }
                }}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                id={field.id}
                type={field.type || "text"}
                {...register(field.id)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
                placeholder={field.placeholder}
                aria-invalid={errors[field.id] ? "true" : "false"}
              />
            )}

            {errors[field.id] && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors[field.id]?.message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}