import { papListingsAreStale } from './papMatcher';

/**
 * FDA Orange Book / Purple Book snapshot used for this feature.
 * Orange Book files: EOBZIP_2026_08.zip from
 * https://www.fda.gov/media/76860/download (patent.txt / exclusivity.txt /
 * products.txt, file dates 2026-09-11).
 */
export const GENERIC_OUTLOOK_VERIFIED_AS_OF = '2026-10-04';

export type OutlookTier = 'within12Months' | 'comingYears' | 'alreadyHasAlternative';

export type OutlookKind = 'prediction' | 'alreadyHasAlternative';

export type GenericOutlook = {
  medicationId: string;
  kind: OutlookKind;
  /** Earliest remaining listed patent or exclusivity date, if any. */
  expiryDate: string | null;
  expiryLabel: string | null;
  source: string;
  verifiedAsOf: string;
  /** Show the one-line biosimilar-vs-generic explainer (biologics). */
  biosimilarExplainer: boolean;
};

const VERIFIED = GENERIC_OUTLOOK_VERIFIED_AS_OF;

const outlookById: Record<string, GenericOutlook> = {
  eliquis: {
    medicationId: 'eliquis',
    kind: 'prediction',
    // Orange Book patent.txt NDA 202155: U.S. 6,967,208 expires Nov 21, 2026
    // (DS+DP); pediatric listing 6,967,208*PED May 21, 2027; formulation
    // 9,326,945 Feb 24, 2031 (*PED Aug 24, 2031). Exclusivity NPP Apr 17, 2028
    // / PED Oct 17, 2028. ANDAs A209898 and A210180 are listed AB/RX but that
    // is not a marketed generic launch date — NADAC still has no generic row.
    expiryDate: '2026-11-21',
    expiryLabel: 'U.S. Patent 6,967,208, NDA 202155',
    source: 'FDA Orange Book EOBZIP_2026_08 patent.txt (NDA 202155)',
    verifiedAsOf: VERIFIED,
    biosimilarExplainer: false,
  },
  humira: {
    medicationId: 'humira',
    kind: 'alreadyHasAlternative',
    expiryDate: null,
    expiryLabel: null,
    source:
      'FDA Purple Book: multiple 351(k) adalimumab biosimilars referencing Humira BLA 125057 (e.g. Amjevita BLA 761024; Hadlima BLA 761059 interchangeable; Idacio adalimumab-aacf BLA 761255)',
    verifiedAsOf: VERIFIED,
    biosimilarExplainer: true,
  },
};

function parseIsoDay(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function addCalendarMonths(day: Date, months: number): Date {
  const next = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  next.setMonth(next.getMonth() + months);
  return next;
}

/**
 * Map an Orange Book expiry to a prediction tier as of `asOfIso`.
 * ≤12 months → within12Months; after 12 months through 3 years → comingYears;
 * later or already past → none (null).
 */
export function tierFromExpiryDate(expiryIso: string, asOfIso: string): OutlookTier | null {
  const expiry = parseIsoDay(expiryIso);
  const asOf = parseIsoDay(asOfIso);
  if (!expiry || !asOf) return null;
  if (expiry.getTime() < asOf.getTime()) return null;
  const within12 = addCalendarMonths(asOf, 12);
  const within36 = addCalendarMonths(asOf, 36);
  if (expiry.getTime() <= within12.getTime()) return 'within12Months';
  if (expiry.getTime() <= within36.getTime()) return 'comingYears';
  return null;
}

export function outlookForMedication(
  medicationId: string,
  asOfIso: string = GENERIC_OUTLOOK_VERIFIED_AS_OF
): { record: GenericOutlook; tier: OutlookTier } | null {
  const record = outlookById[medicationId];
  if (!record) return null;
  if (record.kind === 'alreadyHasAlternative') {
    return { record, tier: 'alreadyHasAlternative' };
  }
  if (!record.expiryDate) return null;
  const tier = tierFromExpiryDate(record.expiryDate, asOfIso);
  if (!tier) return null;
  return { record, tier };
}

export function genericOutlookIsStale(now: Date = new Date()): boolean {
  return papListingsAreStale([{ verifiedAsOf: GENERIC_OUTLOOK_VERIFIED_AS_OF }], now);
}
