import * as React from "react";

export function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50 sm:bg-transparent sm:p-0 sm:border-none">
      <div className="text-left sm:text-right">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Step</div>
        <div className="text-sm font-bold text-primary">
          0{current} of 0{total}
        </div>
      </div>
      <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold bg-white shadow-sm shadow-primary/10">
        {current}
      </div>
    </div>
  );
}
