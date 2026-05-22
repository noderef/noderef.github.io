const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, '');

/**
 * Production site origin (no trailing slash). Prefer `VITE_SITE_URL` so CI/prod
 * builds emit correct absolute canonical/OG URLs; falls back to the browser origin.
 */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return trimTrailingSlashes(fromEnv);
  if (typeof window !== 'undefined') return trimTrailingSlashes(window.location.origin);
  return '';
}

/**
 * Absolute share URL for this HashRouter SPA. Crawlers and social previews must use
 * `https://host/#/path`, not `https://host/path` — the server only serves `index.html`;
 * there are no real `/blog/...` document URLs on the host.
 */
export function buildHashShareUrl(siteUrl: string, pathname: string): string {
  const base = siteUrl.replace(/\/+$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}/#${path}`;
}

/**
 * Default Open Graph image. `VITE_OG_IMAGE` may be an absolute URL or a site-relative path.
 */
export function getDefaultOgImageUrl(): string | undefined {
  const raw = import.meta.env.VITE_OG_IMAGE?.trim();
  if (!raw) return undefined;
  if (/^https?:\/\//i.test(raw)) return raw;
  const site = getSiteUrl();
  if (!site) return raw.startsWith('/') ? raw : `/${raw}`;
  const path = raw.startsWith('/') ? raw : `/${raw}`;
  return `${site}${path}`;
}
