/**
 * UTM tracking helper.
 *
 * - On first page view with utm_* params in the URL, capture them to sessionStorage.
 * - Also captures the original landing URL and referrer.
 * - getUTM() returns the persisted values (if any) for submission with form leads.
 *
 * SessionStorage chosen over localStorage so a returning visitor isn't forever
 * attributed to the first campaign they clicked months ago.
 */

const STORAGE_KEY = 'vault_partner_utm';

export type UTMData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_url?: string;
  referrer?: string;
};

const UTM_KEYS: (keyof UTMData)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

export function captureUTM(): void {
  if (typeof window === 'undefined') return;

  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: UTMData = {};
    let hasAny = false;

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        incoming[key] = value;
        hasAny = true;
      }
    }

    // Only overwrite if this visit brought new UTM data.
    if (!hasAny) return;

    incoming.landing_url = window.location.href;
    incoming.referrer = document.referrer || undefined;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    // sessionStorage blocked (private mode / ITP) — silently ignore.
  }
}

export function getUTM(): UTMData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UTMData;
  } catch {
    return {};
  }
}

/**
 * Format UTM data as a human-readable block for Zoho's Description field.
 * Also includes landing URL and referrer so sales has full context on the lead.
 */
export function formatUTMForDescription(utm: UTMData, currentUrl: string): string {
  const lines: string[] = [];

  if (utm.utm_source) lines.push(`UTM Source: ${utm.utm_source}`);
  if (utm.utm_medium) lines.push(`UTM Medium: ${utm.utm_medium}`);
  if (utm.utm_campaign) lines.push(`UTM Campaign: ${utm.utm_campaign}`);
  if (utm.utm_term) lines.push(`UTM Term: ${utm.utm_term}`);
  if (utm.utm_content) lines.push(`UTM Content: ${utm.utm_content}`);
  if (utm.landing_url) lines.push(`Landing URL: ${utm.landing_url}`);
  if (utm.referrer) lines.push(`Referrer: ${utm.referrer}`);
  lines.push(`Submitted From: ${currentUrl}`);

  return lines.join('\n');
}
