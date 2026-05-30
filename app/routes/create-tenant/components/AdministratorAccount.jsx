import { Label, Input } from "@/components/ui";
import { Shield, UserPlus } from "lucide-react";
import { fieldError, inputErrorClass } from "@/lib/field-error";

export function AdministratorAccount({
  showErrors = false,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  const errorOpts = { showErrors };
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
            <Shield size={16} />
          </div>
          Master Administrator
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          {[
            { name: "master_admin.first_name", label: "First Name" },
            { name: "master_admin.last_name", label: "Last Name" },
            { name: "master_admin.email", label: "Email", type: "email" },
            { name: "master_admin.username", label: "Username (Login)" },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                name={field.name}
                type={field.type || "text"}
                value={
                  field.name.startsWith("master_admin.")
                    ? values.master_admin[field.name.split(".")[1]]
                    : ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputErrorClass(errors, touched, field.name, errorOpts)}
              />
              {fieldError(errors, touched, field.name, errorOpts) && (
                <p className="text-xs text-red-500">
                  {fieldError(errors, touched, field.name, errorOpts)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <UserPlus size={16} />
          </div>
          Head Administrators
        </h4>

        {showErrors && errors.head_admins && typeof errors.head_admins === "string" && (
          <p className="text-xs text-red-500">{errors.head_admins}</p>
        )}

        <div className="grid grid-cols-1 gap-6">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="space-y-4 border-l-2 border-slate-100 pl-4 sm:pl-6 relative"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Admin #{index + 1}{" "}
                  {index === 0 && <span className="text-red-500 ml-1">(Required)</span>}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "first_name", label: "First Name" },
                  { key: "last_name", label: "Last Name" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "username", label: "Username" },
                ].map((field) => {
                  const name = `head_admins.${index}.${field.key}`;
                  return (
                    <div key={name} className="space-y-2">
                      <Label>{field.label}</Label>
                      <Input
                        name={name}
                        type={field.type || "text"}
                        value={values.head_admins[index][field.key]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputErrorClass(errors, touched, name, errorOpts)}
                      />
                      {fieldError(errors, touched, name, errorOpts) && (
                        <p className="text-xs text-red-500">
                          {fieldError(errors, touched, name, errorOpts)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
