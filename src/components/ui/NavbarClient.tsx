'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarClient() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: '/client/dashboard', label: 'Mes demandes', icon: '🔖' },
    { href: '/client/dashboard/messages', label: 'Messagerie', icon: '💬' },
    { href: '/client/dashboard/account', label: 'Compte', icon: '👤' },
  ];

  useEffect(() => {
    // Récupération du prénom
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const { firstName } = await res.json();
          setFirstName(firstName);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();

    // Gestion du scroll pour changer le background
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'bg-white shadow-md' : 'bg-gray-100'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/yoojo-logo.png" alt="Yoojo logo" width={80} height={30} />
          </div>
        </Link>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-all">
          Demander un service
        </button>

        <div className="relative flex items-center gap-2 border px-3 py-1 rounded-full cursor-pointer select-none">
          <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">
            {firstName?.[0] || '?'}
          </div>
          <h1 className="font-semibold">{firstName || 'Invité'}</h1>
          <Menu className="w-5 h-5" onClick={() => setMenuOpen((p) => !p)} />

          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              {links.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{icon}</span>
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}