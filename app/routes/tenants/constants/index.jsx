import * as React from "react";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export const TENANT_COLUMNS = [
  {
    accessorKey: "name",
    header: "Tenant Name",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 font-semibold text-xs">
            {name.charAt(0)}
          </div>
          <span className="font-medium text-slate-700">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span className={cn(
          "px-2.5 py-1 rounded-md text-[11px] font-medium",
          status === "Active" ? "bg-emerald-50 text-emerald-600" : 
          status === "Suspended" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
        )}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <span className="text-slate-500">{row.getValue("plan")}</span>,
  },
  {
    accessorKey: "date",
    header: "Created At",
    cell: ({ row }) => <span className="text-slate-400">{row.getValue("date")}</span>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-600">
          <Edit2 size={14} />
        </Button>
      </div>
    ),
  },
];

export const TENANT_DATA = [
  { name: "Sociable Tech", status: "Active", plan: "Enterprise", date: "Oct 12, 2025" },
  { name: "Global Logistics", status: "Active", plan: "Business", date: "Nov 05, 2025" },
  { name: "Horizon Media", status: "Suspended", plan: "Starter", date: "Dec 20, 2025" },
  { name: "Nova Systems", status: "Active", plan: "Enterprise", date: "Jan 14, 2026" },
  { name: "Peak Solutions", status: "Pending", plan: "Business", date: "Feb 02, 2026" },
];

export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const GROWTH_VALUES = [40, 65, 45, 80, 70, 75, 60, 85, 78, 82, 68, 90];
