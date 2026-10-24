import { fill, t } from '../i18n';
import { countableUnit, nadacRowFor, type NadacFeed } from '../prices/nadacFeed';
import type { Language, LocalizedText, Medication } from '../types';

export const QUANTITIES = [30, 60, 90, 120] as const;

export type QuantityPricing = {
  unit: 'tablet' | 'capsule' | null;
  /** Quantity the source data is quoted for. */
  baseQty: number | null;
  /** Selected quantity, or the base quantity when nothing is picked. */
  qty: number | null;
  showPicker: boolean;
  /** CMS NADAC per-unit figure × selected quantity, when the medication has a NADAC row. */
  nadac: { total: number; perUnit: number; asOfDate: string } | null;
  /** The single Cost Plus quote in the snapshot; never rescaled. */
  costPlus: { price: number; quotedFor: LocalizedText; matchesQty: boolean } | null;
};

function leadingCount(text: string): number | null {
  const m = /^\s*(\d+)\s*×/.exec(text);
  return m ? Number(m[1]) : null;
}

export function priceForQuantity(
  med: Medication,
  feed: NadacFeed | null,
  picked: number | null
): QuantityPricing {
  const row = med.useNadacFeed ? nadacRowFor(feed, med.id) : null;
  const cp = med.benchmarks.find((b) => b.source === 'costplus');
  const cpPrice = cp && cp.price != null ? cp.price : null;

  const unit =
    countableUnit(row) ??
    (/\bcapsule/i.test(med.form.en) ? 'capsule' : /\btablet/i.test(med.form.en) ? 'tablet' : null);
  const baseQty = (cp && cpPrice != null ? leadingCount(cp.package.en) : null) ?? row?.quantity ?? null;
  const showPicker = unit != null && baseQty != null && row != null;
  const qty = showPicker ? (picked ?? baseQty) : baseQty;

  const nadac =
    row && qty != null
      ? {
          total:
            qty === row.quantity ? row.nadacPrice : Math.round(row.nadacPerUnit * qty * 100) / 100,
          perUnit: row.nadacPerUnit,
          asOfDate: row.asOfDate,
        }
      : null;

  const costPlus =
    cp && cpPrice != null ? { price: cpPrice, quotedFor: cp.package, matchesQty: qty === baseQty } : null;

  return { unit, baseQty, qty, showPicker, nadac, costPlus };
}

export function quantityLabel(p: QuantityPricing, language: Language): string {
  if (p.qty == null) return '';
  const c = t(language);
  return fill(p.unit === 'capsule' ? c.qtyCapsules : c.qtyTablets, { qty: String(p.qty) });
}
