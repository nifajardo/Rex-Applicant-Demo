const STORAGE_BASE =
  "https://pyylhcmhsbnutpzmwdua.supabase.co/storage/v1/object/public/scholarship_requirements";

export function buildRequirementUrl({ userId, fileKey, fileName }) {
  if (!userId || !fileKey || !fileName) return null;

  return `${STORAGE_BASE}/${userId}/${fileKey}/${encodeURIComponent(fileName)}`;
}
