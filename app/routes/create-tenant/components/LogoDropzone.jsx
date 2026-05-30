import { LOGO_ACCEPT, validateLogoFile } from "@/lib/logo-file";
import { FileDropzone } from "./FileDropzone";

export function LogoDropzone({ value, onChange, disabled = false, error }) {
  return (
    <FileDropzone
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
      accept={LOGO_ACCEPT}
      validateFile={validateLogoFile}
      uploadedLabel="Logo uploaded"
      hint="PNG only (max. 2MB)"
    />
  );
}
