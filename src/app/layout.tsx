import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ServicesProvider } from '../contexts/ServicesContext';
import NavbarWrapper from '@/components/features/accueil/NavbarWrapper';
import './globals.css';

export const metadata = {
  title: 'HEI Tech',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('services')
    .select('id, name');

  if (error) {
    console.error("Erreur lors de la récupération des services:", error);
  }

  const services = data ?? [];

  return (
    <html lang="fr">
      <body className="bg-white">
        <ServicesProvider initialServices={services}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <NavbarWrapper />
          </div>
          <div className="pt-20">
            {children}
          </div>
        </ServicesProvider>
      </body>
    </html>
  );
}
