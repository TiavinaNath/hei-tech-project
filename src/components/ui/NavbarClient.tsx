'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, ClipboardList, MessageCircle, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarClient() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: '/client/dashboard', label: 'Mes demandes', icon: <ClipboardList className="w-4 h-4" /> },
    { href: '/client/dashboard/messages', label: 'Messagerie', icon: <MessageCircle className="w-4 h-4" /> },
    { href: '/client/dashboard/account', label: 'Compte', icon: <User className="w-4 h-4" /> },
  ];

  useEffect(() => {
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

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-[#f9f9f9]'
      }`}
    >
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/yoojo-logo.png" alt="Yoojo logo" width={80} height={30} />
          </div>
        </Link>

        <button className="hidden md:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md">
          Demander un service
        </button>

        <div
          ref={menuRef}
          className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer select-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <div className="bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm shadow">
            {firstName?.[0]?.toUpperCase() || '?'}
          </div>
          <h1 className="font-medium text-gray-800 text-sm select-none">
            {firstName || 'Invité'}
          </h1>
          <Menu className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-150" />

          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-blue-200 rounded-md shadow-xl z-50 animate-fade-in-down">
              {links.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
