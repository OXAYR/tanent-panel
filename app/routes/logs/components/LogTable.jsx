import { Card, DataTable } from "@/components/ui";
import { LOG_COLUMNS } from "../constants";

export function LogTable({ data }) {
  return (
    <Card className="rounded-xl border border-slate-100 overflow-hidden">
      <DataTable columns={LOG_COLUMNS} data={data} />
    </Card>
  );
}
