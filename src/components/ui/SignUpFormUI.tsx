"use client";

interface AuthFormProps {
  onSubmit: () => void;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-[#457bed]">Compte</span>
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
          {[
            { id: "last_name", label: "Nom", placeholder: "Entrez votre nom" },
            {
              id: "first_name",
              label: "Prénom",
              placeholder: "Entrez votre prénom",
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "Entrez votre email",
            },
            {
              id: "mdp",
              label: "Mot de passe",
              type: "password",
              placeholder: "Créez un mot de passe",
            },
            {
              id: "mdp_confirmation",
              label: "Confirmer le mot de passe",
              type: "password",
              placeholder: "Confirmez votre mot de passe",
            },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type || "text"}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#457bed] px-6 py-3 font-medium text-white transition-all hover:bg-[#3a6bd6] focus:outline-none focus:ring-4 focus:ring-[#457bed]/50"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
