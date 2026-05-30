import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileDropzone({
  value,
  onChange,
  disabled = false,
  error,
  accept,
  validateFile,
  emptyLabel = "Click to upload or drag and drop",
  uploadedLabel,
  hint,
  compact = false,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);

  const displayError = error || localError;
  const fileName =
    value instanceof File ? value.name : typeof value === "string" ? value : null;

  const applyFile = useCallback(
    (file) => {
      if (disabled || !file) return;
      if (validateFile) {
        const validationError = validateFile(file);
        if (validationError) {
          setLocalError(validationError);
          return;
        }
      }
      setLocalError(null);
      onChange(file);
    },
    [disabled, onChange, validateFile]
  );

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") openPicker();
        }}
        onClick={openPicker}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={cn(
          "border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors",
          compact ? "p-4 sm:p-6" : "p-4 sm:p-8",
          disabled
            ? "cursor-not-allowed border-slate-100 bg-slate-50/80 opacity-70"
            : "cursor-pointer bg-slate-50/50 hover:bg-slate-50",
          isDragging && !disabled
            ? "border-primary bg-primary/5"
            : "border-slate-200",
          displayError && !disabled && "border-red-300 bg-red-50/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) applyFile(file);
            e.target.value = "";
          }}
        />
        <div
          className={cn(
            "rounded-full bg-white shadow-sm flex items-center justify-center transition-colors",
            compact ? "w-10 h-10 mb-2" : "w-12 h-12 mb-3",
            disabled ? "text-slate-300" : "text-slate-400",
            isDragging && !disabled && "text-primary"
          )}
        >
          <Upload size={compact ? 18 : 20} />
        </div>
        <p className="text-sm font-medium text-slate-600 text-center px-4">
          {disabled
            ? fileName || uploadedLabel || "File uploaded"
            : fileName || emptyLabel}
        </p>
        {hint ? (
          <p className="text-xs text-slate-400 mt-1 text-center px-4">{hint}</p>
        ) : null}
      </div>
      {displayError ? (
        <p className="text-xs text-red-500">{displayError}</p>
      ) : null}
    </div>
  );
}
