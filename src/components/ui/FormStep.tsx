"use client";

interface Field {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  showIf?: string;
}

interface FormStepProps {
  fields: Field[];
  values: any;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function FormStep({ fields, values, onChange }: FormStepProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (field.showIf && !values[field.showIf]) return null;

        return (
          <div key={field.id}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                name={field.id}
                value={values[field.id] || ""}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
                placeholder={field.placeholder}
              />
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.id}
                checked={values[field.id] || false}
                onChange={onChange}
                className="h-5 w-5 rounded border-gray-200 focus:ring-[#457bed]"
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.id}
                value={values[field.id] || ""}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
                placeholder={field.placeholder}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
