import * as React from "react";
import { Plus } from "lucide-react";
import { Card, Button, DataTable, PageHeader } from "@/components/ui";
import { TENANT_COLUMNS, TENANT_DATA } from "../constants";

export function TenantListingContent() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Tenant Listing" 
        subtitle="Manage and monitor all your registered tenants."
        action={
          <Button>
            <Plus size={16} className="mr-2" />
            Add Tenant
          </Button>
        }
      />
      
      <Card className="rounded-xl border border-slate-100 overflow-hidden">
        <DataTable columns={TENANT_COLUMNS} data={TENANT_DATA} />
      </Card>
    </div>
  );
}
