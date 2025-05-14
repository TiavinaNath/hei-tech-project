import DashboardSidebar from '@/components/ui/DashboardSidebar';
import NavbarClient from '@/components/features/client-dashboard/NavbarClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar en haut, pleine largeur */}
      <NavbarClient />

      {/* Contenu en dessous : sidebar + main */}
      <div style={{ display: 'flex', flex: 1 }}>
        <DashboardSidebar />
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
