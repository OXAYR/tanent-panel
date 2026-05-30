export const LOGO_ACCEPT = 'image/png,.png';

export const LOGO_MAX_BYTES = 2 * 1024 * 1024;

export function validateLogoFile(file) {
  if (!file) return null;

  if (file.size > LOGO_MAX_BYTES) {
    return 'Logo must be 2MB or smaller';
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  const mime = file.type?.toLowerCase() ?? '';
  const isPng = extension === 'png' || mime === 'image/png';

  if (!isPng) {
    return 'Logo must be a PNG file';
  }

  return null;
}
