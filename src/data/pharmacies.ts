import type { PharmacyOffer } from '../types';

/**
 * Nearby pharmacies for CA-17 and CA-19.
 * Street addresses are taken from the chain's official store locator
 * (retrieved October 3, 2026). Hours that were not printed in full on
 * the locator page are marked for confirmation at the store.
 */
export const areaPharmacies: PharmacyOffer[] = [
  {
    id: 'cvs-sunnyvale',
    name: 'CVS Pharmacy',
    address: '576 E El Camino Real, Sunnyvale, CA 94087',
    district: 'CA-17',
    hoursId: 'cvsLocator',
    locatorUrl:
      'https://www.cvs.com/store-locator/sunnyvale-ca-pharmacies/576-e-el-camino-real-sunnyvale-ca-94087/storeid=9700',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'cvs-cupertino',
    name: 'CVS Pharmacy',
    address: '10455 S De Anza Blvd, Cupertino, CA 95014',
    district: 'CA-17',
    hoursId: 'cvsLocator',
    locatorUrl:
      'https://www.cvs.com/store-locator/cupertino-ca-pharmacies/10455-s-de-anza-blvd-cupertino-ca-95014/storeid=9894',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'cvs-santa-clara',
    name: 'CVS Pharmacy',
    address: '2004 El Camino Real, Santa Clara, CA 95050',
    district: 'CA-17',
    hoursId: 'cvsLocator',
    locatorUrl:
      'https://www.cvs.com/store-locator/santa-clara-ca-pharmacies/2004-el-camino-real-santa-clara-ca-95050/storeid=17658',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'wag-milpitas',
    name: 'Walgreens Pharmacy',
    address: '1833 N Milpitas Blvd, Milpitas, CA 95035',
    district: 'CA-17',
    hoursId: 'walgreensLocator',
    locatorUrl:
      'https://www.walgreens.com/locator/walgreens-1833+n+milpitas+blvd-milpitas-ca-95035/id=5480',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'costco-san-jose',
    name: 'Costco Pharmacy',
    address: '1709 Automation Pkwy, San Jose, CA 95131',
    district: 'CA-17',
    hoursId: 'costcoWarehouse',
    locatorUrl: 'https://www.costco.com/w/-/ca/san-jose/1004',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'wag-blossom-hill',
    name: 'Walgreens Pharmacy',
    address: '440 Blossom Hill Rd, San Jose, CA 95123',
    district: 'CA-19',
    hoursId: 'walgreens24',
    locatorUrl:
      'https://www.walgreens.com/locator/walgreens-440+blossom+hill+rd-san+jose-ca-95123/id=2739',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'wag-morgan-hill',
    name: 'Walgreens Pharmacy',
    address: '745 E Dunne Ave, Morgan Hill, CA 95037',
    district: 'CA-18',
    hoursId: 'walgreensLocator',
    locatorUrl: 'https://www.walgreens.com/storelocator/pharmacy/morgan-hill-ca',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'wag-gilroy',
    name: 'Walgreens Pharmacy',
    address: '770 1st St, Gilroy, CA 95020',
    district: 'CA-18',
    hoursId: 'walgreensLocator',
    locatorUrl: 'https://www.walgreens.com/locator/walgreens-770+1st+st-gilroy-ca-95020/id=9516',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'costco-gilroy',
    name: 'Costco Pharmacy',
    address: '7251 Camino Arroyo, Gilroy, CA 95020',
    district: 'CA-18',
    hoursId: 'costcoGilroy',
    locatorUrl: 'https://www.costco.com/warehouse-locations/gilroy-ca-760.html',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'wag-salinas',
    name: 'Walgreens Pharmacy',
    address: '1532 N Main St, Salinas, CA 93906',
    district: 'CA-19',
    hoursId: 'walgreensLocator',
    locatorUrl: 'https://www.walgreens.com/storelocator/pharmacy/salinas-ca',
    addressVerified: true,
    cashPrice: null,
  },
  {
    id: 'wag-san-carlos',
    name: 'Walgreens Pharmacy',
    address: '1399 W San Carlos St, San Jose, CA 95126',
    district: 'CA-18',
    hoursId: 'walgreensLocator',
    locatorUrl: 'https://www.walgreens.com/storelocator',
    addressVerified: true,
    cashPrice: null,
    phone: '(408) 971-3098',
  },
  {
    id: 'wag-e-santa-clara',
    name: 'Walgreens Pharmacy',
    address: '780 E Santa Clara St, San Jose, CA 95112',
    district: 'CA-18',
    hoursId: 'walgreensLocator',
    locatorUrl: 'https://www.walgreens.com/storelocator',
    addressVerified: true,
    cashPrice: null,
    phone: '(408) 287-0600',
  },
  {
    id: 'wag-mckee',
    name: 'Walgreens Pharmacy',
    address: '1661 McKee Rd, San Jose, CA 95116',
    district: 'CA-18',
    hoursId: 'walgreensLocator',
    locatorUrl: 'https://www.walgreens.com/storelocator',
    addressVerified: true,
    cashPrice: null,
    phone: '(408) 347-1404',
  },
  {
    id: 'mega-drugs-sanjose',
    name: 'Mega Drugs LLC',
    address: '696 E Santa Clara St, San Jose, CA',
    district: 'CA-18',
    hoursId: 'seeStore',
    locatorUrl: 'https://maps.google.com/?q=696+E+Santa+Clara+St,+San+Jose,+CA',
    addressVerified: true,
    cashPrice: null,
    phone: '(408) 283-9518',
  },
  {
    id: 'cvs-gilroy-first',
    name: 'CVS Pharmacy',
    address: '800 First St, Gilroy, CA 95020',
    district: 'CA-18',
    hoursId: 'cvsLocator',
    locatorUrl: 'https://www.cvs.com/store-locator',
    addressVerified: true,
    cashPrice: null,
    phone: '(408) 842-0373',
  },
];

/** Attach per-store cash prices, then sort priced stores low-to-high; unpriced keep original order at the end. */
export function pharmaciesWithCash(prices: number[]): PharmacyOffer[] {
  return areaPharmacies
    .map((p, index) => ({ pharmacy: { ...p, cashPrice: prices[index] ?? null }, index }))
    .sort((a, b) => {
      const ap = a.pharmacy.cashPrice;
      const bp = b.pharmacy.cashPrice;
      if (ap == null && bp == null) return a.index - b.index;
      if (ap == null) return 1;
      if (bp == null) return -1;
      if (ap !== bp) return ap - bp;
      return a.index - b.index;
    })
    .map(({ pharmacy }) => pharmacy);
}
