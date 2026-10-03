import type { HouseholdSize } from '../types';

export const incomeOptions: Record<
  HouseholdSize,
  { A: string; B: string; C: string }
> = {
  1: {
    A: 'Under $21,597 / year',
    B: '$21,598-$62,600',
    C: 'Over $62,600 / year',
  },
  2: {
    A: 'Under $29,187 / year',
    B: '$29,188-$84,600',
    C: 'Over $84,600 / year',
  },
  3: {
    A: 'Under $36,777 / year',
    B: '$36,778-$106,600',
    C: 'Over $106,600 / year',
  },
  4: {
    A: 'Under $44,367',
    B: '$44,368-$128,600',
    C: 'Over $128,600 / year',
  },
  5: {
    A: 'Under $51,957 / year',
    B: '$51,958-$150,600',
    C: '$150,600 / year',
  },
};

export const LINKS = {
  coveredCA: 'https://www.coveredca.com/',
  benefitsCal: 'https://benefitscal.com/',
  marketplace: 'https://www.coveredca.com/apply/',
  mediCal: 'https://www.dhcs.ca.gov/services/medi-cal',
  needyMeds: 'https://www.needymeds.org/',
};
