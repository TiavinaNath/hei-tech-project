import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ServicesProvider } from '../contexts/ServicesContext';
import Navbar from '../components/ui/Navbar';
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
      <body>
        <ServicesProvider initialServices={services}>
          <Navbar />
          {children}
        </ServicesProvider>
      </body>
    </html>
  );
}
