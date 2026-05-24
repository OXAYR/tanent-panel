import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export const LOG_COLUMNS = [
  {
    accessorKey: "time",
    header: "Timestamp",
    cell: ({ row }) => <span className="text-slate-400 font-mono text-xs whitespace-nowrap">{row.getValue("time")}</span>,
  },
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => <span className="font-medium text-slate-700">{row.getValue("event")}</span>,
  },
  {
    accessorKey: "level",
    header: "Severity",
    cell: ({ row }) => {
      const level = row.getValue("level");
      return (
        <span className={cn(
          "px-2.5 py-1 rounded-md text-[11px] font-medium",
          level === "Info" ? "bg-blue-50 text-blue-600" : 
          level === "Error" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
        )}>
          {level}
        </span>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => <span className="text-slate-500">{row.getValue("source")}</span>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Details</div>,
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-600">
          <Search size={14} />
        </Button>
      </div>
    ),
  },
];

export const SYSTEM_LOGS = [
  { time: "2026-05-09 01:02:14", event: "Database Connection Success", level: "Info", source: "PostgreSQL" },
  { time: "2026-05-09 00:45:22", event: "Memory Usage Warning (85%)", level: "Warning", source: "Server Node 01" },
  { time: "2026-05-08 23:12:05", event: "API Gateway Rate Limit", level: "Warning", source: "Kong Gateway" },
  { time: "2026-05-08 22:30:11", event: "SSL Certificate Renewed", level: "Info", source: "Let's Encrypt" },
  { time: "2026-05-08 21:05:44", event: "Internal Server Error", level: "Error", source: "Auth Service" },
];

export const AUDIT_LOGS = [
  { time: "2026-05-09 01:00:05", event: "Super Admin Login", level: "Info", source: "Super Admin" },
  { time: "2026-05-09 00:52:18", event: "Updated Tenant Configuration", level: "Info", source: "Sheeraz Abbas" },
  { time: "2026-05-09 00:48:33", event: "Failed Login Attempt", level: "Warning", source: "User ID: 8842" },
  { time: "2026-05-08 23:55:12", event: "Created New Support Ticket", level: "Info", source: "Client: Nova" },
];
