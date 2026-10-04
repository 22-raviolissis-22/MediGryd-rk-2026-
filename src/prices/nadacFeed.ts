import AsyncStorage from '@react-native-async-storage/async-storage';
import bundledSnapshot from '../data/nadac-snapshot.json';

export type NadacDrug = {
  id: string;
  drug: string;
  ndcDescription: string;
  strength: string;
  quantity: number;
  nadacPerUnit: number;
  nadacPrice: number;
  asOfDate: string;
  effectiveDate: string;
};

export type NadacFeed = {
  version: string;
  generatedOn: string;
  source: string;
  datasetId: string;
  asOfDate: string;
  effectiveDate: string;
  drugs: NadacDrug[];
};

const CACHE_KEY = '@calrx/nadac-feed';

/**
 * Public URL of the trimmed NADAC JSON produced by `npm run update-prices`.
 *
 * Host `nadac-prices.json` (repo root) at a stable HTTPS location and put that
 * URL here — GitHub raw or a gist, for example:
 *   https://raw.githubusercontent.com/<user>/<repo>/main/nadac-prices.json
 *
 * Override at build time with EXPO_PUBLIC_NADAC_FEED_URL.
 * If this URL 404s or the device is offline, the app silently uses the bundled
 * snapshot in src/data/nadac-snapshot.json (and any newer AsyncStorage cache).
 */
export const NADAC_FEED_URL =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_NADAC_FEED_URL) ||
  'https://raw.githubusercontent.com/reva-kaushik/calrx-assist/main/nadac-prices.json';

export const bundledNadacFeed = bundledSnapshot as NadacFeed;

function isFeed(value: unknown): value is NadacFeed {
  if (!value || typeof value !== 'object') return false;
  const v = value as NadacFeed;
  return typeof v.asOfDate === 'string' && Array.isArray(v.drugs);
}

function asOfKey(iso: string) {
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(iso);
  return m ? m[1] : iso;
}

export function isNewerFeed(candidate: NadacFeed, current: NadacFeed) {
  return asOfKey(candidate.asOfDate) > asOfKey(current.asOfDate);
}

async function readCache(): Promise<NadacFeed | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isFeed(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function writeCache(feed: NadacFeed) {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(feed));
  } catch {
    /* ignore quota / private mode */
  }
}

async function fetchRemote(): Promise<NadacFeed | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(NADAC_FEED_URL, { signal: ctrl.signal });
    if (!res.ok) return null;
    const parsed = await res.json();
    return isFeed(parsed) ? parsed : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Bundled snapshot, then newer on-device cache, then newer hosted feed. */
export async function resolveNadacFeed(): Promise<NadacFeed> {
  let best = bundledNadacFeed;
  const cached = await readCache();
  if (cached && (isNewerFeed(cached, best) || asOfKey(cached.asOfDate) === asOfKey(best.asOfDate))) {
    if (isNewerFeed(cached, best)) best = cached;
  }
  const remote = await fetchRemote();
  if (remote && isNewerFeed(remote, best)) {
    best = remote;
    await writeCache(remote);
  }
  return best;
}

export function nadacPriceFor(feed: NadacFeed | null, medId: string): number | null {
  const row = feed?.drugs.find((d) => d.id === medId);
  return row ? row.nadacPrice : null;
}
