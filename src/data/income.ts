import type { HouseholdSize, Language } from '../types';
import { L, loc } from '../i18n';

const ranges: Record<HouseholdSize, { A: ReturnType<typeof L>; B: ReturnType<typeof L>; C: ReturnType<typeof L> }> = {
  1: {
    A: L('Under $22,025 / year', 'Menos de $22,025 / año', '低于 $22,025 / 年', '$22,025 / वर्ष से कम'),
    B: L('$22,026–$63,840', '$22,026–$63,840', '$22,026–$63,840', '$22,026–$63,840'),
    C: L(
      'Over $63,840 per year',
      'Más de $63,840 / año',
      '高于 $63,840 / 年',
      '$63,840 / वर्ष से अधिक'
    ),
  },
  2: {
    A: L('Under $29,864 / year', 'Menos de $29,864 / año', '低于 $29,864 / 年', '$29,864 / वर्ष से कम'),
    B: L('$29,865–$86,560', '$29,865–$86,560', '$29,865–$86,560', '$29,865–$86,560'),
    C: L(
      'Over $86,560 per year',
      'Más de $86,560 / año',
      '高于 $86,560 / 年',
      '$86,560 / वर्ष से अधिक'
    ),
  },
  3: {
    A: L('Under $37,702 / year', 'Menos de $37,702 / año', '低于 $37,702 / 年', '$37,702 / वर्ष से कम'),
    B: L('$37,703–$109,280', '$37,703–$109,280', '$37,703–$109,280', '$37,703–$109,280'),
    C: L(
      'Over $109,280 per year',
      'Más de $109,280 / año',
      '高于 $109,280 / 年',
      '$109,280 / वर्ष से अधिक'
    ),
  },
  4: {
    A: L('Under $45,540 / year', 'Menos de $45,540 / año', '低于 $45,540 / 年', '$45,540 / वर्ष से कम'),
    B: L('$45,541–$132,000', '$45,541–$132,000', '$45,541–$132,000', '$45,541–$132,000'),
    C: L(
      'Over $132,000 per year',
      'Más de $132,000 / año',
      '高于 $132,000 / 年',
      '$132,000 / वर्ष से अधिक'
    ),
  },
  5: {
    A: L('Under $53,379 / year', 'Menos de $53,379 / año', '低于 $53,379 / 年', '$53,379 / वर्ष से कम'),
    B: L('$53,380–$154,720', '$53,380–$154,720', '$53,380–$154,720', '$53,380–$154,720'),
    C: L(
      'Over $154,720 per year',
      'Más de $154,720 / año',
      '高于 $154,720 / 年',
      '$154,720 / वर्ष से अधिक'
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
