"use client";
import { SignUpUserFormData } from "@/lib/validators/user";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import Field from "@/type/field";

interface FormStepProps {
  fields: Field[];
  register: UseFormRegister<SignUpUserFormData>;
  errors: FieldErrors<SignUpUserFormData>;
  watch?: UseFormWatch<SignUpUserFormData>;
}

export default function FormStep({
  fields,
  register,
  errors,
  watch,
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
            {field.type !== "checkbox" && (
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
