import { fill as fillTpl, t } from '../i18n';
import type { Language, Medication } from '../types';
import { availabilityNoteFor } from './availabilityNotes';
import { formatMiles, pharmaciesByDistance, type GeoPoint } from './geo';
import { areaPharmacies } from './pharmacies';
import type { RankedProgram } from './papMatcher';
import type { QuantityPricing } from './quantityPricing';

export type SummaryProgram = { name: string; url: string };

export type FillLine = { name: string; price: number | null; miles: number | null };

export type MedicineSummaryModel = {
  lowestCost: string[];
  helpPaying: SummaryProgram[];
  generic:
    | { kind: 'flagged'; badge: string; note: string }
    | { kind: 'available' }
    | null;
  fill: FillLine[];
};

const FILL_LIMIT = 3;

export function buildMedicineSummary(opts: {
  med: Medication;
  language: Language;
  pricing: QuantityPricing;
  likelyPrograms: RankedProgram[];
  locatorOrigin: GeoPoint | null;
}): MedicineSummaryModel | null {
  const { med, language, pricing, likelyPrograms, locatorOrigin } = opts;
  const c = t(language);

  const lowestCost: string[] = [];
  if (pricing.nadac) {
    lowestCost.push(fillTpl(c.summaryFairPrice, { price: pricing.nadac.total.toFixed(2) }));
  }
  if (pricing.costPlus) {
    lowestCost.push(fillTpl(c.summaryCostPlus, { price: pricing.costPlus.price.toFixed(2) }));
  }
  if (med.goodrxPrice != null) {
    lowestCost.push(fillTpl(c.summaryGoodRx, { price: med.goodrxPrice.toFixed(2) }));
  }

  const helpPaying: SummaryProgram[] = likelyPrograms.map((row) => ({
    name: row.program.name,
    url: row.program.applicationUrl,
  }));

  const flagged = availabilityNoteFor(med.id);
  const generic: MedicineSummaryModel['generic'] = flagged
    ? { kind: 'flagged', badge: c[flagged.badgeKey], note: c[flagged.noteKey] }
    : med.kind === 'regular'
      ? { kind: 'available' }
      : null;

  const priceById = new Map(med.pharmacies.map((p) => [p.id, p.cashPrice]));
  const byId = new Map<string, FillLine>();
  for (const p of med.pharmacies) {
    if (p.cashPrice == null) continue;
    byId.set(p.id, { name: p.name, price: p.cashPrice, miles: null });
    if (byId.size >= FILL_LIMIT) break;
  }
  if (locatorOrigin) {
    const pool = med.pharmacies.length > 0 ? med.pharmacies : areaPharmacies;
    const nearest = pharmaciesByDistance(locatorOrigin, pool).filter((row) => row.miles != null);
    for (const row of nearest.slice(0, FILL_LIMIT)) {
      const cash = priceById.get(row.pharmacy.id) ?? row.pharmacy.cashPrice ?? null;
      const existing = byId.get(row.pharmacy.id);
      if (existing) {
        existing.miles = row.miles;
      } else {
        byId.set(row.pharmacy.id, {
          name: row.pharmacy.name,
          price: cash,
          miles: row.miles,
        });
      }
    }
  }
  const fillStores: FillLine[] = [...byId.values()].filter(
    (row) => row.price != null || row.miles != null
  );

  if (
    lowestCost.length === 0 &&
    helpPaying.length === 0 &&
    generic == null &&
    fillStores.length === 0
  ) {
    return null;
  }
  return { lowestCost, helpPaying, generic, fill: fillStores };
}

export function fillLineText(row: FillLine, language: Language): string {
  const c = t(language);
  if (row.price != null && row.miles != null) {
    return fillTpl(c.summaryStorePriceMiles, {
      name: row.name,
      price: row.price.toFixed(2),
      miles: formatMiles(row.miles),
    });
  }
  if (row.price != null) {
    return fillTpl(c.summaryStorePrice, { name: row.name, price: row.price.toFixed(2) });
  }
  return fillTpl(c.summaryStoreMiles, { name: row.name, miles: formatMiles(row.miles ?? 0) });
}
