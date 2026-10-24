import { fill, loc, t } from '../i18n';
import type { Language, Medication } from '../types';
import type { MatcherConclusion } from './papMatcher';
import { quantityLabel, type QuantityPricing } from './quantityPricing';

export type ExplainResult = {
  sentences: [string, string, string];
  /** Program the third sentence tells the user to apply to, if any. */
  applyTo: { name: string; url: string } | null;
};

/** Leading dose such as "20 mg", "50 mcg", "10 mEq" from the drug's form text. */
export function strengthFromForm(med: Medication): string {
  const m = /^\s*(\d[\d.,/]*\s*(?:mg|mcg|mEq|g|units?|mL)(?:\s*\/\s*[\d.]*\s*(?:mL|dose))?)/i.exec(
    med.form.en
  );
  return m ? m[1] : '';
}

/**
 * Builds the three-sentence summary from the same figures the price cards display
 * for the selected quantity. Nothing is estimated beyond what those cards show.
 */
export function explainOptions(opts: {
  med: Medication;
  language: Language;
  conclusion: MatcherConclusion;
  pricing: QuantityPricing;
}): ExplainResult {
  const { med, language, conclusion, pricing } = opts;
  const c = t(language);
  const drug = med.generic;
  const strength = strengthFromForm(med);
  const qtyLabel = quantityLabel(pricing, language);
  const nadacBenchmark = med.benchmarks.find((b) => b.source === 'nadac');

  let fair: string;
  if (pricing.nadac) {
    fair = fill(c.explainFair, {
      drug,
      strength,
      nadacTotal: pricing.nadac.total.toFixed(2),
      qty: qtyLabel,
    });
  } else if (nadacBenchmark && med.kind === 'regular') {
    fair = fill(c.explainFairPerUnit, {
      drug,
      strength,
      perUnit: loc(nadacBenchmark.package, language),
    });
  } else {
    fair = c.explainFairNone;
  }
  fair = fair.replace(/\s{2,}/g, ' ');

  let cheapest: string;
  if (pricing.costPlus && pricing.costPlus.matchesQty) {
    cheapest = fill(c.explainCheapest, {
      costPlusTotal: pricing.costPlus.price.toFixed(2),
      qty: loc(pricing.costPlus.quotedFor, language),
    });
  } else if (pricing.costPlus) {
    cheapest = fill(c.explainCheapestOtherQty, {
      costPlusTotal: pricing.costPlus.price.toFixed(2),
      base: loc(pricing.costPlus.quotedFor, language),
      qty: qtyLabel,
    });
  } else {
    cheapest = c.explainCouponFallback;
  }

  const pharmacy = med.pharmacies.find((p) => p.addressVerified);
  const pharmacyLabel = pharmacy ? `${pharmacy.name} (${pharmacy.address})` : null;

  let next: string;
  let applyTo: ExplainResult['applyTo'] = null;
  if (conclusion.kind === 'likely') {
    const p = conclusion.program;
    next = fill(p.kind === 'pap' ? c.explainNextFree : c.explainNextNonprofit, { program: p.name });
    applyTo = { name: p.name, url: p.applicationUrl };
  } else if (conclusion.kind === 'listedNoMatch') {
    next = pharmacyLabel
      ? fill(c.explainNextNoMatch, { pharmacy: pharmacyLabel })
      : c.explainNextNoMatchShort;
  } else {
    next = pharmacyLabel ? fill(c.explainNextNone, { pharmacy: pharmacyLabel }) : c.explainNextNoneShort;
  }

  return { sentences: [fair, cheapest, next], applyTo };
}
