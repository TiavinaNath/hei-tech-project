import Link from "next/link";

export default function WelcomeSection() {
  return (
    <div className="relative flex w-full items-center justify-center bg-white p-8 md:w-1/2">
      <div
        className="absolute left-[10%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffd6e8,#d4f1f4,#e1e1f0)] opacity-65 blur-xl"
        style={{
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      ></div>

      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold leading-tight text-gray-900">
          <span className="block">Bienvenue</span>
          <span className="relative inline-block">
            <span className="text-[#457bed]">Chez Nous</span>
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#457bed] to-transparent"></span>
          </span>
        </h1>

        <p className="mt-10 text-gray-600">
          Entrez dans un monde où vos besoins rencontrent les bonnes mains,
          <br />
          Créez votre compte et laissez vos projets s’épanouir,
          <br />
          Simple, rapide, sans limite.
        </p>

        <div className="mt-8">
          <p className="text-gray-500">Vous avez déjà un compte?</p>
          <Link
            href="/auth/login"
            className="mt-4 inline-block rounded-lg border border-[#457bed] px-6 py-2 font-medium text-[#457bed] transition-all hover:bg-[#457bed] hover:text-white"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
