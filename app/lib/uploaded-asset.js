/** Display name for a form field that may hold a new File or an existing server filename. */
export function getUploadedAssetName(value) {
  if (value instanceof File) return value.name;
  if (typeof value === 'string' && value.trim()) return value.trim();
  return null;
}
