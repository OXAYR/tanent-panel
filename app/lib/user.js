/**
 * @param {{ name?: string; first_name?: string; last_name?: string; login?: string; email?: string } | null | undefined} user
 * @param {string} [fallback='Account']
 * @returns {string}
 */
export function getUserDisplayName(user, fallback = "Account") {
  if (!user) return fallback;
  if (user.name) return user.name;

  const parts = [user.first_name, user.last_name].filter(Boolean);
  if (parts.length) return parts.join(" ");

  return user.login || user.email || fallback;
}
