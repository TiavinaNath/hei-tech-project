"use client";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import Field from "@/type/field";
import AddressAutocomplete from "../features/provider-address/AddressAutoCompletedField";
import {
  getCurrentPosition,
  reverseGeocode,
} from "@/lib/utils/geolocalisation";

interface FormStepProps {
  fields: Field[];
  register: UseFormRegister<any>; // Utilisation de 'any' pour plus de flexibilité
  errors: FieldErrors<any>;
  watch?: UseFormWatch<any>;
  setValue?: UseFormSetValue<any>;
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
  const handleGeolocation = async (fieldId: string) => {
    try {
      const position = await getCurrentPosition();
      if (setValue && onAddressSelect) {
        // Stocke les coordonnées GPS
        setValue("userLocation", {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        // Remplit automatiquement le champ d'adresse
        const address = await reverseGeocode(
          position.coords.latitude,
          position.coords.longitude
        );
        if (address) {
          setValue(fieldId, address);
        }

        // Met à jour les coordonnées pour le formulaire
        onAddressSelect(position.coords.latitude, position.coords.longitude);
      }
    } catch (error) {
      console.error("Erreur de géolocalisation:", error);
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (field.showIf && watch && !watch(field.showIf)) {
          return null;
        }

        return (
          <div key={field.id}>
            {field.type !== "checkbox" &&
              field.type !== "address-autocomplete" && (
                <label
                  htmlFor={field.id}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
              )}

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
                  if (file && setValue) {
                    setValue(field.id, file);
                  }
                }}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
              />
            ) : field.type === "address-autocomplete" ? (
              <>
                <AddressAutocomplete
                  id={field.id}
                  value={watch ? watch(field.id) || "" : ""}
                  onChange={(value) => {
                    if (setValue) {
                      setValue(field.id, value);
                    }
                  }}
                  onSelect={(address, lat, lon) => {
                    if (setValue) {
                      setValue(field.id, address);
                      setValue("userLocation", undefined);
                    }
                    if (onAddressSelect) {
                      onAddressSelect(lat, lon);
                    }
                  }}
                  placeholder={field.placeholder}
                />
                <div className="mt-2 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleGeolocation(field.id)}
                    className="flex items-center text-sm text-[#457bed] underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Me localiser automatiquement
                  </button>
                  {watch && watch("userLocation") && (
                    <span className="ml-2 text-xs text-green-600">
                      ✓ Localisation activée
                    </span>
                  )}
                </div>
              </>
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
                {errors[field.id]?.message?.toString()}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
