import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";
import { TopNav } from "@/components/TopNav";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNav />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1">
            <DashboardContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
