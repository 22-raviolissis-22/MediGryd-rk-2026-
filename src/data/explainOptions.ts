import { fill, loc, t } from '../i18n';
import type { Language, Medication } from '../types';
import type { MatcherConclusion } from './papMatcher';

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
 * Builds the three-sentence summary from data already on the results screen.
 * Every number comes straight from `med`; nothing is estimated or scaled.
 */
export function explainOptions(opts: {
  med: Medication;
  language: Language;
  conclusion: MatcherConclusion;
  /** NADAC total for the package shown, when the screen has one. */
  nadacTotal: number | null;
}): ExplainResult {
  const { med, language, conclusion, nadacTotal } = opts;
  const c = t(language);
  const drug = med.generic;
  const strength = strengthFromForm(med);
  const nadac = med.benchmarks.find((b) => b.source === 'nadac');
  const costPlus = med.benchmarks.find((b) => b.source === 'costplus');

  let fair: string;
  if (nadac && nadacTotal != null) {
    fair = fill(c.explainFair, {
      drug,
      strength,
      nadacTotal: nadacTotal.toFixed(2),
      qty: loc(nadac.package, language),
    });
  } else if (nadac && med.kind === 'regular') {
    fair = fill(c.explainFairPerUnit, { drug, strength, perUnit: loc(nadac.package, language) });
  } else {
    fair = c.explainFairNone;
  }
  fair = fair.replace(/\s{2,}/g, ' ');

  const cheapest =
    costPlus && costPlus.price != null
      ? fill(c.explainCheapest, {
          costPlusTotal: costPlus.price.toFixed(2),
          qty: loc(costPlus.package, language),
        })
      : c.explainCouponFallback;

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
