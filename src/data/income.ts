import type { HouseholdSize, Language } from '../types';
import { L, loc } from '../i18n';

const ranges: Record<HouseholdSize, { A: ReturnType<typeof L>; B: ReturnType<typeof L>; C: ReturnType<typeof L> }> = {
  1: {
    A: L('Under $21,597 / year', 'Menos de $21,597 / año', '低于 $21,597 / 年', '$21,597 / वर्ष से कम'),
    B: L('$21,598-$62,600', '$21,598-$62,600', '$21,598-$62,600', '$21,598-$62,600'),
    C: L(
      '$62,600 or more per year',
      '$62,600 o más / año',
      '$62,600 或以上 / 年',
      '$62,600 या इससे अधिक / वर्ष'
    ),
  },
  2: {
    A: L('Under $29,187 / year', 'Menos de $29,187 / año', '低于 $29,187 / 年', '$29,187 / वर्ष से कम'),
    B: L('$29,188-$84,600', '$29,188-$84,600', '$29,188-$84,600', '$29,188-$84,600'),
    C: L(
      '$84,600 or more per year',
      '$84,600 o más / año',
      '$84,600 或以上 / 年',
      '$84,600 या इससे अधिक / वर्ष'
    ),
  },
  3: {
    A: L('Under $36,777 / year', 'Menos de $36,777 / año', '低于 $36,777 / 年', '$36,777 / वर्ष से कम'),
    B: L('$36,778-$106,600', '$36,778-$106,600', '$36,778-$106,600', '$36,778-$106,600'),
    C: L(
      '$106,600 or more per year',
      '$106,600 o más / año',
      '$106,600 或以上 / 年',
      '$106,600 या इससे अधिक / वर्ष'
    ),
  },
  4: {
    A: L('Under $44,367', 'Menos de $44,367', '低于 $44,367', '$44,367 से कम'),
    B: L('$44,368-$128,600', '$44,368-$128,600', '$44,368-$128,600', '$44,368-$128,600'),
    C: L(
      '$128,600 or more per year',
      '$128,600 o más / año',
      '$128,600 或以上 / 年',
      '$128,600 या इससे अधिक / वर्ष'
    ),
  },
  5: {
    A: L('Under $51,957 / year', 'Menos de $51,957 / año', '低于 $51,957 / 年', '$51,957 / वर्ष से कम'),
    B: L('$51,958-$150,600', '$51,958-$150,600', '$51,958-$150,600', '$51,958-$150,600'),
    C: L(
      '$150,600 or more per year',
      '$150,600 o más / año',
      '$150,600 或以上 / 年',
      '$150,600 या इससे अधिक / वर्ष'
    ),
  },
};

export function incomeOptions(household: HouseholdSize, lang: Language) {
  const row = ranges[household];
  return {
    A: loc(row.A, lang),
    B: loc(row.B, lang),
    C: loc(row.C, lang),
  };
}

export const LINKS = {
  coveredCA: 'https://www.coveredca.com/',
  benefitsCal: 'https://benefitscal.com/',
  marketplace: 'https://www.coveredca.com/apply/',
  mediCal: 'https://www.dhcs.ca.gov/services/medi-cal',
  needyMeds: 'https://www.needymeds.org/',
};
