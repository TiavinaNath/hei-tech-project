import DashboardSidebarProvider from '@/components/ui/DashboardSidebarProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <DashboardSidebarProvider />
        <div className="ml-52 w-full p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
