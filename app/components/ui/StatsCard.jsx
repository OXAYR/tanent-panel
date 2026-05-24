import * as React from "react";
import { Card } from "@/components/ui/card";

export function StatsCard({ title, value, trend, icon }) {
  return (
    <Card className="p-5 rounded-xl border border-slate-100 flex items-center gap-4 flex-1 min-w-[220px]">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">{title}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <h4 className="text-xl font-semibold text-slate-800">{value}</h4>
          <span className="text-[11px] font-semibold text-emerald-500 whitespace-nowrap">{trend}</span>
        </div>
      </div>
    </Card>
  );
}
