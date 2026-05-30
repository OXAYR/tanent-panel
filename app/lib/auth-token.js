const TOKEN_KEY = 'access_token';
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, maxAgeSeconds = TOKEN_MAX_AGE_SECONDS) {
  if (typeof document === 'undefined') return;
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    'path=/',
    `max-age=${maxAgeSeconds}`,
    'samesite=lax',
  ];
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    parts.push('secure');
  }
  document.cookie = parts.join('; ');
}

function deleteCookie(name) {
  if (typeof document === 'undefined') return;
  const parts = [
    `${encodeURIComponent(name)}=`,
    'path=/',
    'max-age=0',
    'samesite=lax',
  ];
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    parts.push('secure');
  }
  document.cookie = parts.join('; ');
}

function clearLegacyLocalStorage() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  const fromCookie = getCookie(TOKEN_KEY);
  if (fromCookie) return fromCookie;

  // One-time migration from localStorage
  try {
    const legacy = localStorage.getItem(TOKEN_KEY);
    if (legacy) {
      setAccessToken(legacy);
      clearLegacyLocalStorage();
      return legacy;
    }
  } catch {
    // ignore
  }

  return null;
}

export function setAccessToken(token) {
  if (typeof window === 'undefined') return;
  if (token) {
    setCookie(TOKEN_KEY, token);
    clearLegacyLocalStorage();
  } else {
    deleteCookie(TOKEN_KEY);
    clearLegacyLocalStorage();
  }
}

export function clearAccessToken() {
  setAccessToken(null);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}
