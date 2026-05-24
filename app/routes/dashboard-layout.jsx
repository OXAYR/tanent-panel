import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { PrimarySidebar } from "@/components/layout/PrimarySidebar";
import { SecondarySidebar } from "@/components/layout/SecondarySidebar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

import { TENANT_CREATION_STEPS } from "./create-tenant/constants";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePrimary, setActivePrimary] = useState("Dashboard");
  const [activeSecondary, setActiveSecondary] = useState("Overview");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for tenant creation steps completion status
  const [tenantSteps, setTenantSteps] = useState(TENANT_CREATION_STEPS);

  // Derive activePrimary from URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActivePrimary("Dashboard");
    else if (path === "/create-tenant") {
      setActivePrimary("Create Tenant");
      // If we're on the create page and activeSecondary isn't one of the steps, set it to the first one
      if (!tenantSteps.some(s => s.label === activeSecondary)) {
        setActiveSecondary("Tenant Profile");
      }
    }
    else if (path.startsWith("/tenants")) setActivePrimary("Tenants");
    else if (path.startsWith("/logs")) setActivePrimary("Logs");
    else if (path.startsWith("/settings")) setActivePrimary("Settings");
  }, [location.pathname, activeSecondary]);

  const handlePrimaryChange = (module) => {
    let path = "/dashboard";
    if (module === "Dashboard") path = "/dashboard";
    else if (module === "Tenants") path = "/tenants";
    else if (module === "Create Tenant") path = "/create-tenant";
    else if (module === "Logs") path = "/logs";
    else if (module === "Settings") path = "/settings";
    
    navigate(path);
    if (module === "Create Tenant") {
      setActiveSecondary("Tenant Profile");
    } else {
      setActiveSecondary("Overview");
    }
  };

  const updateTenantStep = (label, completed) => {
    setTenantSteps(prev => {
      const index = prev.findIndex(s => s.label === label);
      if (index === -1) return prev;
      
      const newSteps = [...prev];
      newSteps[index] = { ...newSteps[index], completed };
      
      // Unlock next step if this one is completed
      if (completed && index < newSteps.length - 1) {
        newSteps[index + 1] = { ...newSteps[index + 1], disabled: false };
      }
      
      return newSteps;
    });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 1. Primary Sidebar (Always Left) */}
      <PrimarySidebar 
        activePrimary={activePrimary} 
        setActivePrimary={handlePrimaryChange} 
        setActiveSecondary={setActiveSecondary} 
      />

      {/* 2. Main Container (Navbar + Bottom Section) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar 
          activePrimary={activePrimary} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          setShowProfileMenu={setShowProfileMenu} 
          showProfileMenu={showProfileMenu} 
        />

        <div className="flex-1 flex overflow-hidden relative">
          {/* 3. Secondary Sidebar (Inside Main Container, Below Navbar) */}
          <div className={cn(
            "fixed inset-y-0 left-[72px] lg:relative lg:left-0 z-[105] transition-transform duration-500 ease-in-out lg:shadow-none bg-white",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-[calc(100%+72px)] lg:translate-x-0"
          )}>
            <SecondarySidebar 
              activePrimary={activePrimary} 
              activeSecondary={activeSecondary} 
              setActiveSecondary={setActiveSecondary} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
              tenantSteps={tenantSteps}
            />
          </div>

          {/* 4. Content Area */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8" onClick={() => setShowProfileMenu(false)}>
            <Outlet context={{ activeSecondary, setActiveSecondary, updateTenantStep, tenantSteps }} />
          </main>
        </div>
      </div>
    </div>
  );
}
