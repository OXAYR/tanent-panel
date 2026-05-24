import * as React from "react";
import { Users, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, Button, StatsCard, PageHeader } from "@/components/ui";
import { MONTHS, GROWTH_VALUES } from "../constants";

export function TenantOverviewContent() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Tenant Overview" 
        subtitle="Detailed analytics and growth metrics for your platform." 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatsCard title="Total Tenants" value="124" trend="+12%" icon={<Users size={18} className="text-blue-500" />} />
        <StatsCard title="Active Subscriptions" value="98" trend="+5%" icon={<ShieldCheck size={18} className="text-emerald-500" />} />
        <StatsCard title="Monthly Revenue" value="$45,200" trend="+18%" icon={<TrendingUp size={18} className="text-primary-500" />} />
      </div>

      <Card className="p-6 rounded-xl border border-slate-100 h-[400px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-base font-semibold text-slate-800">Tenant Growth</h4>
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
             <Button variant="ghost" size="sm" className="h-7 text-xs">Week</Button>
             <Button variant="secondary" size="sm" className="h-7 text-xs">Month</Button>
          </div>
        </div>
        <div className="flex-1 flex items-end gap-3 px-2 pb-2">
          {GROWTH_VALUES.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {h} Tenants
              </div>
              <div 
                className="w-full bg-primary-500/10 group-hover:bg-primary-500/20 rounded-md transition-all duration-300 cursor-pointer" 
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] font-medium text-slate-400">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
