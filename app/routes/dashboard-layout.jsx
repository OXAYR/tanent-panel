import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router";
import { PrimarySidebar } from "@/components/layout/PrimarySidebar";
import { SecondarySidebar } from "@/components/layout/SecondarySidebar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

import { CREATE_TENANT_STEPS, TENANT_CREATION_STEPS } from "./create-tenant/constants";
import {
  buildCreateTenantSearch,
  deriveTenantStepsProgress,
  getStepById,
  STEP_QUERY_PARAM,
  TENANT_QUERY_PARAM,
} from "./create-tenant/utils";
import { requireAuthClientLoader } from "@/lib/route-auth";

export const clientLoader = requireAuthClientLoader;

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activePrimary, setActivePrimary] = useState("Dashboard");
  const [activeSecondary, setActiveSecondary] = useState("Overview");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [tenantSteps, setTenantSteps] = useState(TENANT_CREATION_STEPS);

  const tenantIdFromUrl = searchParams.get(TENANT_QUERY_PARAM);
  const stepIdFromUrl = searchParams.get(STEP_QUERY_PARAM);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActivePrimary("Dashboard");
    else if (path === "/create-tenant") {
      setActivePrimary("Create Tenant");

      const step = stepIdFromUrl ? getStepById(stepIdFromUrl) : null;
      if (step) {
        setActiveSecondary(step.label);
      } else if (!tenantSteps.some((s) => s.label === activeSecondary)) {
        setActiveSecondary(CREATE_TENANT_STEPS.TENANT_PROFILE);
      }

      setTenantSteps((prev) =>
        deriveTenantStepsProgress(prev, stepIdFromUrl, Boolean(tenantIdFromUrl))
      );
    } else if (path.startsWith("/tenants")) setActivePrimary("Tenants");
    else if (path.startsWith("/logs")) setActivePrimary("Logs");
    else if (path.startsWith("/settings")) setActivePrimary("Settings");
  }, [location.pathname, stepIdFromUrl, tenantIdFromUrl]);

  const goToCreateTenantStep = (stepLabel) => {
    const step = TENANT_CREATION_STEPS.find((s) => s.label === stepLabel);
    if (!step) return;

    const paramsTenant = searchParams.get(TENANT_QUERY_PARAM);
    navigate(
      buildCreateTenantSearch({
        tenantId: paramsTenant || undefined,
        stepId: step.id,
      })
    );
    setActiveSecondary(stepLabel);
  };

  const handlePrimaryChange = (module) => {
    let path = "/dashboard";
    if (module === "Dashboard") path = "/dashboard";
    else if (module === "Tenants") path = "/tenants";
    else if (module === "Create Tenant") path = "/create-tenant";
    else if (module === "Logs") path = "/logs";
    else if (module === "Settings") path = "/settings";

    navigate(path);
    if (module === "Create Tenant") {
      setActiveSecondary(CREATE_TENANT_STEPS.TENANT_PROFILE);
      setTenantSteps(TENANT_CREATION_STEPS);
    } else {
      setActiveSecondary("Overview");
    }
  };

  const updateTenantStep = (label, completed) => {
    setTenantSteps((prev) => {
      const index = prev.findIndex((s) => s.label === label);
      if (index === -1) return prev;

      const newSteps = [...prev];
      newSteps[index] = { ...newSteps[index], completed };

      return newSteps;
    });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden relative">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <PrimarySidebar
        activePrimary={activePrimary}
        setActivePrimary={handlePrimaryChange}
        setActiveSecondary={setActiveSecondary}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar
          activePrimary={activePrimary}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setShowProfileMenu={setShowProfileMenu}
          showProfileMenu={showProfileMenu}
        />

        <div className="flex-1 flex overflow-hidden relative">
          <div
            className={cn(
              "fixed inset-y-0 left-[72px] lg:relative lg:left-0 z-[105] transition-transform duration-500 ease-in-out lg:shadow-none bg-white",
              isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-[calc(100%+72px)] lg:translate-x-0"
            )}
          >
            <SecondarySidebar
              activePrimary={activePrimary}
              activeSecondary={activeSecondary}
              setActiveSecondary={setActiveSecondary}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              tenantSteps={tenantSteps}
              goToCreateTenantStep={goToCreateTenantStep}
            />
          </div>

          <main
            className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8"
            onClick={() => setShowProfileMenu(false)}
          >
            <Outlet
              context={{
                activeSecondary,
                setActiveSecondary,
                updateTenantStep,
                tenantSteps,
                goToCreateTenantStep,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
