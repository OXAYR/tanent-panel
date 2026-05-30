export const LOTTIE_JSON_ACCEPT = '.json,application/json,text/json';

export const LOTTIE_JSON_MAX_BYTES = 5 * 1024 * 1024;

export function validateLottieJsonFile(file) {
  if (!file) return null;

  if (file.size > LOTTIE_JSON_MAX_BYTES) {
    return 'JSON file must be 5MB or smaller';
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  const mime = file.type?.toLowerCase() ?? '';
  const isJson =
    extension === 'json' ||
    mime === 'application/json' ||
    mime === 'text/json' ||
    mime === '';

  if (!isJson) {
    return 'Upload a Lottie JSON file (.json)';
  }

  return null;
}
