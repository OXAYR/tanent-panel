import { 
  LayoutDashboard, 
  Users, 
  Plus,
  FileText, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CREATE_TENANT_STEPS } from "@/routes/create-tenant/constants";

function SidebarIcon({ icon, label, active = false, onClick }) {
  return (
    <div className="relative w-full group" onClick={onClick}>
      {/* The "Cut-out" transition corners */}
      {active && (
        <>
          <div className="absolute -top-[20px] right-0 w-[20px] h-[20px] bg-white z-0">
             <div className="w-full h-full bg-primary rounded-br-[20px]"></div>
          </div>
          <div className="absolute -bottom-[20px] right-0 w-[20px] h-[20px] bg-white z-0">
             <div className="w-full h-full bg-primary rounded-tr-[20px]"></div>
          </div>
        </>
      )}
      
      <div className={cn(
        "relative z-10 flex flex-col items-center justify-center w-full py-4 gap-1.5 cursor-pointer transition-all",
        active 
          ? "bg-white text-primary rounded-l-[24px]" 
          : "text-white/60 hover:text-white"
      )}>
        <div className={cn("transition-transform duration-200", active ? "scale-100" : "group-hover:scale-110")}>
          {icon}
        </div>
        <span className={cn(
          "text-[9px] font-medium uppercase tracking-widest",
          active ? "opacity-100" : "opacity-70"
        )}>
          {label}
        </span>
      </div>
    </div>
  );
}

export function PrimarySidebar({ activePrimary, setActivePrimary, setActiveSecondary }) {
  return (
    <aside className="w-[72px] lg:w-[88px] bg-primary flex flex-col items-center py-6 flex-shrink-0 relative overflow-y-auto">
      {/* Logo */}
      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/15 rounded-xl flex items-center justify-center text-white font-semibold text-xl lg:text-2xl mb-8 flex-shrink-0">
        W
      </div>
      
      {/* Nav Items */}
      <nav className="flex flex-col gap-1 w-full">
        <SidebarIcon 
          icon={<LayoutDashboard size={20} strokeWidth={2} />} 
          label="Dash" 
          active={activePrimary === "Dashboard"} 
          onClick={() => {
            setActivePrimary("Dashboard");
            setActiveSecondary("Overview");
          }}
        />
        <SidebarIcon 
          icon={<Users size={20} strokeWidth={1.8} />} 
          label="Tenants" 
          active={activePrimary === "Tenants"} 
          onClick={() => {
            setActivePrimary("Tenants");
            setActiveSecondary("Overview");
          }}
        />
        <SidebarIcon 
          icon={<Plus size={20} strokeWidth={2} className="bg-white/10 rounded-full p-0.5" />} 
          label="Create" 
          active={activePrimary === "Create Tenant"} 
          onClick={() => {
            setActivePrimary("Create Tenant");
            setActiveSecondary(CREATE_TENANT_STEPS.TENANT_PROFILE);
          }}
        />
        <SidebarIcon 
          icon={<FileText size={20} strokeWidth={1.8} />} 
          label="Logs" 
          active={activePrimary === "Logs"} 
          onClick={() => {
            setActivePrimary("Logs");
            setActiveSecondary("System Logs");
          }}
        />
        <SidebarIcon 
          icon={<Settings size={20} strokeWidth={1.8} />} 
          label="Setup" 
          active={activePrimary === "Settings"} 
          onClick={() => {
            setActivePrimary("Settings");
            setActiveSecondary("Overview");
          }}
        />
      </nav>
    </aside>
  );
}
