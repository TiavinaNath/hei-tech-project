import DashboardSidebar from '@/components/ui/DashboardSidebar';

export default function DashboardLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex' }}>
      <DashboardSidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
