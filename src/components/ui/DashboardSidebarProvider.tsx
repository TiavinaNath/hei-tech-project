'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/provider/dashboard', label: 'Les demandes', icon: '🔖' },
    { href: '/provider/dashboard/messages', label: 'Messagerie', icon: '💬' },
    { href: '/provider/dashboard/account', label: 'Compte', icon: '👤' },
  ];

  return (
    <nav style={{ width: 200, padding: '1rem', background: '#f9f9f9' }}>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            borderRadius: '8px',
            background: pathname === link.href ? '#f1f1f1' : 'transparent',
            fontWeight: pathname === link.href ? 'bold' : 'normal',
            color: pathname === link.href ? 'black' : '#666',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
