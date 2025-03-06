import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";
import Overview from "@/components/overview";
import Transactions from "@/components/transactions";
import { AppSidebar } from "@/components/app-sidebar";
import CreateExpense from "@/components/create-expense";
import { UserCircle } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardProvider } from "@/contexts/dashboard-context";

const Dashboard = async () => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <div className="w-full flex h-screen bg-background text-foreground">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="w-full pt-6 px-12 flex flex-col items-center space-y-6 lg:hidden">
              <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl font-medium text-primary">ExpenseTracker</h1>
                <div className="flex items-center gap-4">
                  <UserCircle className="w-12 h-12 stroke-1 rounded-full" />
                  <ModeToggle />
                </div>
              </div>
              <div className="w-full flex items-center lg:hidden">
                <CreateExpense />
              </div>
            </div>
            <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <Overview />
              <Transactions />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default Dashboard;
