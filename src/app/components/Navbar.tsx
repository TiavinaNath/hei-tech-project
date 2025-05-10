// components/Navbar.tsx
'use client'

import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-gradient-to-br from-[#F5F5F4] to-[#EAEAEA]">
      <h1 className="text-xl font-bold text-black">HEI Tech</h1>
      <div className="space-x-4 text-black">
        <Link href="/">Accueil</Link>
        <Link href="/Autre">Autre</Link>
        <Link href="/2">Autre2</Link>
      </div>
    </nav>
  );
};

export default Navbar;
