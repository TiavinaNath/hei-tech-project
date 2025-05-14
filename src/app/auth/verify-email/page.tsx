export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Icone d'enveloppe */}
          <div className="bg-[#457bed]/10 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-[#457bed]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 7.5v9a3.75 3.75 0 01-3.75 3.75H6a3.75 3.75 0 01-3.75-3.75v-9M3.75 7.5L12 13.5l8.25-6M3.75 7.5L12 1.5l8.25 6"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-center text-[#457bed]">
            Vérifie ton adresse e-mail
          </h1>

          <p className="text-center text-gray-600">
            Nous t’avons envoyé un lien de confirmation à ton adresse. Clique
            dessus pour activer ton compte.
          </p>

          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center mt-4 bg-[#457bed] hover:bg-[#00c896] transition-colors text-white font-medium py-2 px-4 rounded-xl"
          >
            Aller sur Gmail
          </a>

          <p className="text-sm text-gray-500 text-center">
            Pas reçu d’e-mail ? Vérifie tes spams ou réessaie avec un autre
            email.
          </p>
        </div>
      </div>
    </main>
  );
}
