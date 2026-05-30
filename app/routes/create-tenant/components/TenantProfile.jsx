import { Label, Input } from "@/components/ui";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldError, inputErrorClass } from "@/lib/field-error";
import { LogoDropzone } from ".";

export function TenantProfile({
  showErrors = false,
  profileLocked = false,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const errorOpts = { showErrors };
  const locked = profileLocked;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tenant Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. Acme Corp"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={locked}
            className={inputErrorClass(errors, touched, "name", errorOpts)}
            aria-invalid={Boolean(fieldError(errors, touched, "name", errorOpts))}
          />
          {fieldError(errors, touched, "name", errorOpts) && (
            <p className="text-xs text-red-500">{fieldError(errors, touched, "name", errorOpts)}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand_name">Brand Name</Label>
          <Input
            id="brand_name"
            name="brand_name"
            placeholder="e.g. Acme"
            value={values.brand_name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={locked}
            className={inputErrorClass(errors, touched, "brand_name", errorOpts)}
            aria-invalid={Boolean(fieldError(errors, touched, "brand_name", errorOpts))}
          />
          {fieldError(errors, touched, "brand_name", errorOpts) && (
            <p className="text-xs text-red-500">
              {fieldError(errors, touched, "brand_name", errorOpts)}
            </p>
          )}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="domain">Domain</Label>
          <div className="flex">
            <div className="bg-slate-50 border border-r-0 border-slate-200 px-3 flex items-center text-slate-400 rounded-l-md">
              <Globe size={14} />
            </div>
            <Input
              id="domain"
              name="domain"
              disabled={locked}
              className={cn(
                "rounded-l-none",
                inputErrorClass(errors, touched, "domain", errorOpts)
              )}
              placeholder="acme.example.com"
              value={values.domain}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(fieldError(errors, touched, "domain", errorOpts))}
            />
          </div>
          {fieldError(errors, touched, "domain", errorOpts) && (
            <p className="text-xs text-red-500">{fieldError(errors, touched, "domain", errorOpts)}</p>
          )}
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Logo</Label>
          <LogoDropzone
            value={values.logo}
            disabled={locked}
            onChange={(file) => setFieldValue("logo", file)}
            error={fieldError(errors, touched, "logo", errorOpts)}
          />
        </div>
      </div>
    </div>
  );
}
