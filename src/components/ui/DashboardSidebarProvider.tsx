'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/provider/dashboard', label: 'Mes demandes' },
    { href: '/provider/dashboard/messages', label: 'Messagerie' },
    { href: '/provider/dashboard/account', label: 'Compte' },
  ];

  return (
    <nav className="w-52 h-screen p-4 bg-[#f9f9f9] fixed top-16 left-0 overflow-y-auto">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-2 px-3 py-2 mb-2 rounded-md text-sm no-underline ${
            pathname === href
              ? 'bg-[#f1f1f1] font-bold text-black'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
