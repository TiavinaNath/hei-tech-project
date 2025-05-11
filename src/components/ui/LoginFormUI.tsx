'use client';

interface LoginFormProps {
  onSubmit: () => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <div className="flex w-full items-center justify-center bg-white p-0 md:w-1/2">
      <div className="h-full w-full p-8 md:p-12"> 
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            <span className="text-[#457bed]">Connexion</span>
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-8">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
              placeholder="Votre email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
              placeholder="Votre mot de passe"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2"> 
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 rounded border-gray-200 text-[#457bed] focus:ring-[#457bed]"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <a href="#" className="text-sm text-[#457bed] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#457bed] px-6 py-4 font-medium text-white transition-all hover:bg-[#3a6bd6] focus:outline-none focus:ring-4 focus:ring-[#457bed]/50"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}