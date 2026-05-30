import { getUserDisplayName } from '@/lib/user';

/** Display name for read-only settings profile (empty when user is missing). */
export function getProfileDisplayName(user) {
  return getUserDisplayName(user, '');
}
