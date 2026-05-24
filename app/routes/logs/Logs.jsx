import * as React from "react";
import { useOutletContext } from "react-router";
import { LogHeader, LogTable } from "./components";
import { SYSTEM_LOGS, AUDIT_LOGS } from "./constants";

export default function Logs() {
  const { activeSecondary } = useOutletContext();
  const data = activeSecondary === "System Logs" ? SYSTEM_LOGS : AUDIT_LOGS;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <LogHeader title={activeSecondary} />
      <LogTable data={data} />
    </div>
  );
}
