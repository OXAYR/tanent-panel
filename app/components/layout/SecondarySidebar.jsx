import {
  LayoutDashboard,
  TrendingUp,
  List,
  ShieldCheck,
  User,
  X,
  CheckCircle2,
  Info,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

function StepItem({ label, completed, active, disabled, onClick }) {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200",
        active ? "bg-primary/5 text-primary" : "text-slate-500",
        disabled ? "opacity-40 cursor-not-allowed grayscale" : "hover:bg-slate-50",
        active && "ring-1 ring-primary/20"
      )} 
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex-shrink-0 relative">
        {completed ? (
          <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-50" />
        ) : active ? (
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
            <Info size={12} className="text-primary" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <Info size={12} className="text-slate-400" />
          </div>
        )}
      </div>
      <span className={cn(
        "text-sm font-medium",
        active ? "text-primary" : "text-slate-600",
        disabled && "text-slate-400"
      )}>
        {label}
      </span>
    </div>
  );
}

function SecondaryNavItem({ icon, label, active = false, onClick }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm",
      active ? "bg-primary-50 text-primary-600 font-medium" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    )} onClick={onClick}>
      <div className={cn(
        "w-7 h-7 rounded-md flex items-center justify-center",
        active ? "text-primary-600" : "text-slate-400"
      )}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  );
}

export function SecondarySidebar({
  activePrimary,
  activeSecondary,
  setActiveSecondary,
  setIsMobileMenuOpen,
  tenantSteps = []
}) {
  return (
    <aside className="w-[220px] lg:w-[240px] bg-white border-r border-slate-100 flex flex-col overflow-y-auto relative">
      <div className="p-5">
        {/* Mobile Close Button */}
        <button
          className="lg:hidden absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-50 rounded-md z-[120]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={18} />
        </button>

        {activePrimary === "Dashboard" && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest mb-3 px-3">Main Menu</h3>
            <nav className="space-y-0.5">
              <SecondaryNavItem
                icon={<LayoutDashboard size={16} />}
                label="Overview"
                active={activeSecondary === "Overview"}
                onClick={() => {
                  setActiveSecondary("Overview");
                  setIsMobileMenuOpen(false);
                }}
              />
            </nav>
          </div>
        )}

        {activePrimary === "Tenants" && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest mb-3 px-3">Tenant Management</h3>
            <nav className="space-y-0.5">
              <SecondaryNavItem
                icon={<TrendingUp size={16} />}
                label="Overview"
                active={activeSecondary === "Overview"}
                onClick={() => {
                  setActiveSecondary("Overview");
                  setIsMobileMenuOpen(false);
                }}
              />
              <SecondaryNavItem
                icon={<List size={16} />}
                label="Tenant Listing"
                active={activeSecondary === "Tenant Listing"}
                onClick={() => {
                  setActiveSecondary("Tenant Listing");
                  setIsMobileMenuOpen(false);
                }}
              />
            </nav>
          </div>
        )}

        {activePrimary === "Logs" && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest mb-3 px-3">Audit Logs</h3>
            <nav className="space-y-0.5">
              <SecondaryNavItem
                icon={<ShieldCheck size={16} />}
                label="System Logs"
                active={activeSecondary === "System Logs"}
                onClick={() => {
                  setActiveSecondary("System Logs");
                  setIsMobileMenuOpen(false);
                }}
              />
              <SecondaryNavItem
                icon={<User size={16} />}
                label="User Activity"
                active={activeSecondary === "User Activity"}
                onClick={() => {
                  setActiveSecondary("User Activity");
                  setIsMobileMenuOpen(false);
                }}
              />
            </nav>
          </div>
        )}

        {activePrimary === "Create Tenant" && (
          <div className="mb-6 space-y-6">
            <div className="px-3">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100/50 mb-6">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Progress</span>
                   <span className="text-[10px] font-bold text-emerald-700">{tenantSteps.filter(s => s.completed).length}/{tenantSteps.length} Steps</span>
                </div>
                <div className="w-full bg-emerald-200/50 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${(tenantSteps.filter(s => s.completed).length / tenantSteps.length) * 100}%` }}
                  />
                </div>
              </div>
              <h3 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest mb-3">Tenant Configuration</h3>
            </div>
            <nav className="space-y-1">
              {tenantSteps.map((step) => (
                <StepItem
                  key={step.id}
                  label={step.label}
                  completed={step.completed}
                  active={activeSecondary === step.label}
                  disabled={step.disabled}
                  onClick={() => {
                    setActiveSecondary(step.label);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </nav>
          </div>
        )}

        {activePrimary === "Settings" && (
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest mb-3 px-3">App Settings</h3>
            <nav className="space-y-0.5">
              <SecondaryNavItem
                icon={<LayoutDashboard size={16} />}
                label="Overview"
                active={activeSecondary === "Overview"}
                onClick={() => {
                  setActiveSecondary("Overview");
                  setIsMobileMenuOpen(false);
                }}
              />
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
