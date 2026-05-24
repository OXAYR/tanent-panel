import { PageHeader } from "@/components/ui";
import { ProfileSection } from "./components";

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Account Settings" 
        subtitle="Manage your personal information and preferences." 
      />

      <ProfileSection />
    </div>
  );
}
