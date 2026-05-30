import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { STATUS_OPTIONS } from "../constants";
import { fieldError } from "@/lib/field-error";

export function StatusManagement({
  showErrors = false,
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) {
  const errorOpts = { showErrors };
  return (
    <div className="space-y-6">
      <div className="max-w-md space-y-4">
        <Label>Current Status</Label>
        <div className="grid grid-cols-1 gap-3">
          {STATUS_OPTIONS.map((s) => (
            <div
              key={s.value}
              role="button"
              tabIndex={0}
              className={cn(
                "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4",
                values.status === s.value
                  ? "border-primary bg-primary/5"
                  : "border-slate-100 hover:border-slate-200"
              )}
              onClick={() => {
                setFieldValue("status", s.value);
                setFieldTouched("status", true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setFieldValue("status", s.value);
                  setFieldTouched("status", true);
                }
              }}
            >
              <div className={cn("w-3 h-3 rounded-full mt-1.5", s.color)} />
              <div>
                <div className="font-bold text-slate-800">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
        {fieldError(errors, touched, "status", errorOpts) && (
          <p className="text-xs text-red-500">{fieldError(errors, touched, "status", errorOpts)}</p>
        )}
      </div>
    </div>
  );
}
