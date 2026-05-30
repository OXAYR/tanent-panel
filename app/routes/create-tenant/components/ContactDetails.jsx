import { Label, Input } from "@/components/ui";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldError, inputErrorClass } from "@/lib/field-error";

export function ContactDetails({
  showErrors = false,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  const errorOpts = { showErrors };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            className={cn(
              "w-full min-h-[100px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm",
              inputErrorClass(errors, touched, "description", errorOpts)
            )}
            placeholder="Short description of the tenant..."
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {fieldError(errors, touched, "description", errorOpts) && (
            <p className="text-xs text-red-500">
              {fieldError(errors, touched, "description", errorOpts)}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_name">Contact Name</Label>
          <Input
            id="contact_name"
            name="contact_name"
            placeholder="John Doe"
            value={values.contact_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputErrorClass(errors, touched, "contact_name", errorOpts)}
          />
          {fieldError(errors, touched, "contact_name", errorOpts) && (
            <p className="text-xs text-red-500">
              {fieldError(errors, touched, "contact_name", errorOpts)}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              className={cn("pl-9", inputErrorClass(errors, touched, "contact_email", errorOpts))}
              placeholder="john@example.com"
              value={values.contact_email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {fieldError(errors, touched, "contact_email", errorOpts) && (
            <p className="text-xs text-red-500">
              {fieldError(errors, touched, "contact_email", errorOpts)}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <Input
              id="contact_phone"
              name="contact_phone"
              className="pl-9"
              placeholder="+1 (555) 000-0000"
              value={values.contact_phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
