import * as React from "react";
import { Search } from "lucide-react";
import { Button, PageHeader } from "@/components/ui";

export function LogHeader({ title }) {
  return (
    <PageHeader 
      title={title}
      subtitle="View and analyze system events and audit trails."
      action={
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-10 pr-4 h-10 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-full sm:w-64 transition-all placeholder:text-slate-300"
            />
          </div>
          <Button variant="outline">Export CSV</Button>
        </div>
      }
    />
  );
}
