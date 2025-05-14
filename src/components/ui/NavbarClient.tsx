'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarClient() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/client/dashboard', label: 'Mes demandes', icon: '🔖' },
    { href: '/client/dashboard/messages', label: 'Messagerie', icon: '💬' },
    { href: '/client/dashboard/account', label: 'Compte', icon: '👤' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const data = await res.json();
          setFirstName(data.firstName);
        } else {
          console.error('Failed to fetch user:', res.status);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="relative flex items-center justify-between px-6 py-2 shadow-sm bg-white">
<Link href="/">
  <div className="flex items-center cursor-pointer">
    <Image src="/yoojo-logo.png" alt="Yoojo logo" width={80} height={30} />
  </div>
</Link>
      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-all">
        <span className="text-xl">➕</span>
        Demander un service
      </button>

      <div className="relative flex items-center gap-2 border px-3 py-1 rounded-full cursor-pointer select-none">
        <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">
          {firstName?.[0] || '?'}
        </div>
        <h1 className="font-semibold">{firstName || 'Invité'}</h1>
        <Menu
          className="w-5 h-5 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        />

        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                onClick={() => setMenuOpen(false)} // Fermer le menu après clic
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
