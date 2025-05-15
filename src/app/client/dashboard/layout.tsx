import DashboardSidebarClient from '@/components/ui/DashboardSidebarClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <DashboardSidebarClient />
        <div className="ml-52 w-full p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
