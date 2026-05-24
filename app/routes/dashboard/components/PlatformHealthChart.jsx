import * as React from "react";
import { Card, Button } from "@/components/ui";
import { MONTHS, CHART_VALUES } from "../constants";

export function PlatformHealthChart() {
  return (
    <Card className="p-6 rounded-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Overall Platform Health</h4>
          <p className="text-xs text-slate-400 mt-0.5">System performance across all services</p>
        </div>
        <Button variant="outline" size="sm">View Analytics</Button>
      </div>

      <div className="h-[280px] w-full flex items-end gap-3 pt-4">
        {CHART_VALUES.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="relative w-full">
              <div 
                className="w-full bg-primary-500/10 group-hover:bg-primary-500/20 rounded-md transition-all duration-300 cursor-pointer relative overflow-hidden" 
                style={{ height: `${h * 2.5}px` }}
              >
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-500/30 to-transparent h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {h}%
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-400">{MONTHS[i]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
