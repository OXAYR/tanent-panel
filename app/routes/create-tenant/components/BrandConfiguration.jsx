import { Label, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { FAVICON_FIELDS, PRIMARY_COLOR_TYPES } from "../constants";
import { fieldError, inputErrorClass } from "@/lib/field-error";
import {
  LOTTIE_JSON_ACCEPT,
  validateLottieJsonFile,
} from "@/lib/lottie-json-file";
import { getUploadedAssetName } from "@/lib/uploaded-asset";
import { FileDropzone } from ".";

export function BrandConfiguration({
  showErrors = false,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const errorOpts = { showErrors };
  const setFavicon = (key, file) => {
    setFieldValue("favicons", { ...values.favicons, [key]: file });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Palette size={16} className="text-primary" />
          Primary Colors
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIMARY_COLOR_TYPES.map((type) => {
            const fieldName = `primary_${type}`;
            return (
              <div key={type} className="space-y-2">
                <Label className="text-[10px] uppercase text-slate-400">{type}</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-8 h-8 rounded cursor-pointer border-none p-0"
                    value={values[fieldName]}
                    onChange={(e) => setFieldValue(fieldName, e.target.value)}
                  />
                  <Input
                    name={fieldName}
                    value={values[fieldName]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`text-xs uppercase ${inputErrorClass(errors, touched, fieldName, errorOpts)}`}
                  />
                </div>
                {fieldError(errors, touched, fieldName, errorOpts) && (
                  <p className="text-xs text-red-500">
                    {fieldError(errors, touched, fieldName, errorOpts)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700">Secondary Colors</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.keys(values.secondary_colors).map((key) => (
            <div key={key} className="space-y-1">
              <Label className="text-[9px] uppercase text-slate-400">{key}</Label>
              <input
                type="color"
                className="w-full h-10 rounded-lg cursor-pointer border-2 border-white shadow-sm"
                value={values.secondary_colors[key]}
                onChange={(e) =>
                  setFieldValue("secondary_colors", {
                    ...values.secondary_colors,
                    [key]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div className="space-y-3 md:col-span-2">
          <Label>Favicons</Label>
          <p className="text-xs text-slate-400">Save your colors above, then add favicon files here.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FAVICON_FIELDS.map(({ key, label }) => {
              const uploadedName = getUploadedAssetName(values.favicons?.[key]);
              return (
                <label
                  key={key}
                  className="h-16 border border-dashed border-slate-200 rounded-lg flex items-center justify-between gap-2 px-3 bg-slate-50 text-xs text-slate-500 cursor-pointer hover:bg-slate-100"
                >
                  <span className="truncate text-slate-600">{label}</span>
                  <input
                    type="file"
                    accept="image/*,.ico"
                    className="sr-only"
                    onChange={(e) => setFavicon(key, e.target.files?.[0] ?? null)}
                  />
                  <span
                    className={cn(
                      "font-medium truncate max-w-[140px] shrink-0",
                      uploadedName ? "text-primary" : "text-slate-400"
                    )}
                  >
                    {uploadedName ?? "Choose file"}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Animated Logo (JSON)</Label>
          <p className="text-xs text-slate-400">
            Save your colors above, then upload your animated logo here.
          </p>
          <FileDropzone
            compact
            value={values.anims}
            onChange={(file) => setFieldValue("anims", file)}
            accept={LOTTIE_JSON_ACCEPT}
            validateFile={validateLottieJsonFile}
            emptyLabel="Click to upload or drag and drop Lottie JSON"
            uploadedLabel="Lottie JSON selected"
            hint="JSON only (max. 5MB)"
            error={fieldError(errors, touched, "anims", errorOpts)}
          />
        </div>
      </div>
    </div>
  );
}
