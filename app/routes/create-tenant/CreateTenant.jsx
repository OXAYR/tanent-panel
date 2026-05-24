import * as React from "react";
import { useOutletContext } from "react-router";
import { Card, Button, PageHeader, StepIndicator } from "@/components/ui";
import {
  Save,
  Info,
  Lock,
  CheckCircle2
} from "lucide-react";

import {
  TenantProfile,
  ContactDetails,
  BrandConfiguration,
  AccessControl,
  StatusManagement,
  PlanManagement,
  AdministratorAccount
} from "./components";
import {
  INITIAL_FORM_DATA
} from "./constants";

export function CreateTenant() {
  const { activeSecondary, setActiveSecondary, updateTenantStep, tenantSteps } = useOutletContext();
  const currentStepIndex = tenantSteps.findIndex(s => s.label === activeSecondary);

  const [formData, setFormData] = React.useState(INITIAL_FORM_DATA);

  const handleSave = () => {
    updateTenantStep(activeSecondary, true);
    if (currentStepIndex < tenantSteps.length - 1) {
      setActiveSecondary(tenantSteps[currentStepIndex + 1].label);
    }
  };

  const renderStepContent = () => {
    const props = { formData, setFormData };
    switch (activeSecondary) {
      case "Tenant Profile": return <TenantProfile {...props} />;
      case "Contact Details": return <ContactDetails {...props} />;
      case "Brand Configuration": return <BrandConfiguration {...props} />;
      case "Access Control": return <AccessControl {...props} />;
      case "Status Management": return <StatusManagement {...props} />;
      case "Plan Management": return <PlanManagement {...props} />;
      case "Administrator Account": return <AdministratorAccount {...props} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Create Tenant"
        subtitle="Configure your new tenant by completing the steps below."
        breadcrumbs={["Tenants", "Create New Tenant"]}
      />

      <Card className="p-8 border-slate-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / tenantSteps.length) * 100}%` }}
          />
        </div>

        <PageHeader
          title={activeSecondary}
          subtitle="Please provide the required information for this section."
          action={
            <StepIndicator
              current={currentStepIndex + 1}
              total={tenantSteps.length}
            />
          }
        />
        <div className="h-px w-full bg-slate-50 mb-10" />

        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <Button
            variant="ghost"
            className="w-full sm:w-auto"
            disabled={currentStepIndex === 0}
            onClick={() => {
              if (currentStepIndex > 0) setActiveSecondary(tenantSteps[currentStepIndex - 1].label);
            }}
          >
            Previous
          </Button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button variant="ghost" className="text-slate-400 w-full sm:w-auto">Cancel</Button>
            <Button className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2 w-full sm:w-auto py-6 sm:py-2" onClick={handleSave}>
              <Save size={16} />
              {currentStepIndex === tenantSteps.length - 1 ? "Complete Setup" : "Save & Continue"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500 text-white flex-shrink-0"><Info size={16} /></div>
          <div>
            <div className="text-xs font-bold text-blue-900">Pro Tip</div>
            <div className="text-[11px] text-blue-700/80 mt-1 leading-relaxed">You can always edit these details later from the tenant settings page.</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500 text-white flex-shrink-0"><Lock size={16} /></div>
          <div>
            <div className="text-xs font-bold text-purple-900">Security</div>
            <div className="text-[11px] text-purple-700/80 mt-1 leading-relaxed">All administrator accounts will receive an invitation email.</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
          <div className="p-2 rounded-lg bg-emerald-500 text-white flex-shrink-0"><CheckCircle2 size={16} /></div>
          <div>
            <div className="text-xs font-bold text-emerald-900">Auto-Save</div>
            <div className="text-[11px] text-emerald-700/80 mt-1 leading-relaxed">Progress is saved locally on your browser.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
