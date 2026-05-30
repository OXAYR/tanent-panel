import { PageHeader } from "@/components/ui";
import { StatsGrid, PlatformHealthChart } from "./components";

export function DashboardOverview() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Hello, Sheeraz Abbas! 👋" 
        subtitle="Welcome back to the Super Admin Control Center." 
      />

      <StatsGrid />
      <PlatformHealthChart />
    </div>
  );
}
