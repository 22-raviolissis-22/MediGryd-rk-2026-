import type { copy } from '../i18n';

type CopyKey = keyof typeof copy.en;

export type Helpline = {
  id: string;
  titleKey: CopyKey;
  descKey: CopyKey;
  /** Only set when the official site publishes hours. */
  hoursKey: CopyKey | null;
  display: string;
  tel: string;
  source: string | null;
};

/** Numbers and hours checked against the official sites on this date. */
export const HELPLINES_VERIFIED_AS_OF = '2026-10-05';

export const helplines: Helpline[] = [
  {
    id: 'medi-cal-rx',
    titleKey: 'helpMediCalRx',
    descKey: 'helpMediCalRxDesc',
    hoursKey: 'helpMediCalRxHours',
    display: '1-800-977-2273',
    tel: '18009772273',
    source: 'dhcs.ca.gov',
  },
  {
    id: 'medi-cal-member',
    titleKey: 'helpMediCalMember',
    descKey: 'helpMediCalMemberDesc',
    hoursKey: 'helpMediCalMemberHours',
    display: '1-800-541-5555',
    tel: '18005415555',
    source: 'dhcs.ca.gov',
  },
  {
    id: 'medicare',
    titleKey: 'helpMedicare',
    descKey: 'helpMedicareDesc',
    hoursKey: null,
    display: '1-800-633-4227',
    tel: '18006334227',
    source: 'medicare.gov',
  },
  {
    id: 'covered-ca',
    titleKey: 'helpCoveredCA',
    descKey: 'helpCoveredCADesc',
    hoursKey: null,
    display: '1-800-300-1506',
    tel: '18003001506',
    source: 'coveredca.com',
  },
  {
    id: '211',
    titleKey: 'help211',
    descKey: 'help211Desc',
    hoursKey: null,
    display: '211',
    tel: '211',
    source: null,
  },
];

export function telUrl(number: string) {
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}

export function phoneDigitCount(number: string) {
  return number.replace(/\D/g, '').length;
}
