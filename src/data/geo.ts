import type { PharmacyOffer } from '../types';
import usZipCentroids from './usZipCentroids.json';

export type GeoPoint = { latitude: number; longitude: number };

const zipCentroids = usZipCentroids as unknown as Record<string, [number, number]>;

const EARTH_MI = 3958.7613;

export function haversineMiles(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_MI * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function digitsZip(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 5);
}

/** On-device ZIP centroid. Returns null when the ZIP is not in the bundled list. */
export function pointForZip(raw: string): GeoPoint | null {
  const zip = digitsZip(raw);
  if (zip.length !== 5) return null;
  const pair = zipCentroids[zip];
  if (!pair) return null;
  return { latitude: pair[0], longitude: pair[1] };
}

export type RankedPharmacy = {
  pharmacy: PharmacyOffer;
  miles: number | null;
};

/** Nearest first. Stores without coordinates keep original order after located ones. */
export function pharmaciesByDistance(origin: GeoPoint, pharmacies: PharmacyOffer[]): RankedPharmacy[] {
  return pharmacies
    .map((pharmacy, index) => {
      const located = pharmacy.latitude != null && pharmacy.longitude != null;
      return {
        pharmacy,
        miles: located
          ? haversineMiles(origin, {
              latitude: pharmacy.latitude as number,
              longitude: pharmacy.longitude as number,
            })
          : null,
        index,
      };
    })
    .sort((a, b) => {
      if (a.miles == null && b.miles == null) return a.index - b.index;
      if (a.miles == null) return 1;
      if (b.miles == null) return -1;
      if (a.miles !== b.miles) return a.miles - b.miles;
      return a.index - b.index;
    })
    .map(({ pharmacy, miles }) => ({ pharmacy, miles }));
}

export function formatMiles(miles: number): string {
  if (miles < 10) return miles.toFixed(1);
  return Math.round(miles).toString();
}
