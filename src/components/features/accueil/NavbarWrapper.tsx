'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import NavbarClient from '@/components/ui/NavbarClient';
import Navbar from '@/components/ui/Navbar';

export default function NavbarWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Erreur de session:', error);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!session?.user);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  console.log(isAuthenticated);
  

  return isAuthenticated ? <NavbarClient /> : <Navbar />;
}