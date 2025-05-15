'use client';

import { useEffect, useState } from 'react';
import NavbarClient from '@/components/ui/NavbarClient'; // ton navbar connecté
import Navbar from '@/components/ui/Navbar'; // ton navbar non connecté

export default function NavbarWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user');
        setIsAuthenticated(res.ok); // 200 = connecté, 401 = non
      } catch (err) {
        console.error('Erreur auth:', err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null; // ou un loader si tu veux
  }

  return isAuthenticated ? <NavbarClient /> : <Navbar />;
}

