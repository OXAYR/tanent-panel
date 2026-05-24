import * as React from "react";
import { StatsCard } from "@/components/ui";
import { DASHBOARD_STATS } from "../constants";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {DASHBOARD_STATS.map((stat, idx) => (
        <StatsCard key={idx} {...stat} />
      ))}
    </div>
  );
}
