'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import NavbarClient from '@/components/ui/NavbarClient';
import NavbarProvider from '@/components/ui/NavbarProvider';
import Navbar from '@/components/ui/Navbar';

type Role = 'CLIENT' | 'PROVIDER' | null;

export default function NavbarWrapper() {
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async () => {
    try {
      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Non authentifié');

      const user = await res.json();
      if (user.role === 'CLIENT') setRole('CLIENT');
      else if (user.role === 'PROVIDER') setRole('PROVIDER');
    } catch (error) {
      setRole(null);
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };

  // Vérifie la session initiale
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        fetchUserRole();
      } else {
        setRole(null);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Met à jour lors des changements de session
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserRole();
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loading) return null; // ou un spinner

  if (role === 'CLIENT') return <NavbarClient />;
  if (role === 'PROVIDER') return <NavbarProvider />;
  return <Navbar />;
}
