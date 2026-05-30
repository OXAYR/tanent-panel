import { Label, Input, Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ACCESS_CONTROL_TOGGLES } from "../constants";
import { fieldError, inputErrorClass } from "@/lib/field-error";

export function AccessControl({
  showErrors = false,
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) {
  const errorOpts = { showErrors };
  const access = values.access_control;

  const setAccessField = (key, value) => {
    setFieldValue("access_control", { ...access, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACCESS_CONTROL_TOGGLES.map((toggle) => (
          <div
            key={toggle.key}
            className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-primary/20 transition-colors"
          >
            <div
              className={cn(
                "p-2 rounded-lg",
                access[toggle.key] ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
              )}
            >
              {toggle.icon}
            </div>
            <div className="flex-1">
              <Label htmlFor={toggle.key} className="text-xs font-medium cursor-pointer">
                {toggle.label}
              </Label>
            </div>
            <Checkbox
              id={toggle.key}
              checked={Boolean(access[toggle.key])}
              onCheckedChange={(checked) => setAccessField(toggle.key, checked)}
            />
          </div>
        ))}
      </div>

      {(access.ENABLE_WHATSAPP_COMM || access.ENABLE_EXTERNAL_MERCHANDISE_MODULE) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {access.ENABLE_WHATSAPP_COMM && (
            <div className="space-y-2">
              <Label htmlFor="whatsapp_comm_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_comm_number"
                placeholder="+1234567890"
                value={access.whatsapp_comm_number}
                onChange={(e) => setAccessField("whatsapp_comm_number", e.target.value)}
                onBlur={() => setFieldTouched("access_control.whatsapp_comm_number", true)}
                className={inputErrorClass(
                  errors,
                  touched,
                  "access_control.whatsapp_comm_number",
                  errorOpts
                )}
              />
              {fieldError(errors, touched, "access_control.whatsapp_comm_number", errorOpts) && (
                <p className="text-xs text-red-500">
                  {fieldError(errors, touched, "access_control.whatsapp_comm_number", errorOpts)}
                </p>
              )}
            </div>
          )}
          {access.ENABLE_EXTERNAL_MERCHANDISE_MODULE && (
            <div className="space-y-2">
              <Label htmlFor="external_merchandise_module_link">External Merch Link</Label>
              <Input
                id="external_merchandise_module_link"
                placeholder="https://merch.example.com"
                value={access.external_merchandise_module_link}
                onChange={(e) =>
                  setAccessField("external_merchandise_module_link", e.target.value)
                }
                onBlur={() =>
                  setFieldTouched("access_control.external_merchandise_module_link", true)
                }
                className={inputErrorClass(
                  errors,
                  touched,
                  "access_control.external_merchandise_module_link",
                  errorOpts
                )}
              />
              {fieldError(
                errors,
                touched,
                "access_control.external_merchandise_module_link",
                errorOpts
              ) && (
                <p className="text-xs text-red-500">
                  {fieldError(
                    errors,
                    touched,
                    "access_control.external_merchandise_module_link",
                    errorOpts
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
