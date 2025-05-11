// components/Navbar.tsx
'use client'

import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-gradient-to-br from-[#F5F5F4] to-[#EAEAEA]">
      <h1 className="text-xl font-bold text-black">HEI Tech</h1>
      <div className="space-x-4 text-black">
        <Link href="/">Accueil</Link>
        <Link href="/auth/signup/provider">Devenir Prestataire</Link>
        <Link href="/auth/login">Connexion</Link>
        <Link href="/auth/signup">Inscription</Link>
      </div>
    </nav>
  );
};

export default Navbar;
