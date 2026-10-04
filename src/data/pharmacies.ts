import type { PharmacyOffer } from '../types';

/**
 * Nearby pharmacies for CA-17 and CA-19.
 * Street addresses are taken from the chain's official store locator
 * (retrieved October 3, 2026). Hours that were not printed in full on
 * the locator page are marked for confirmation at the store.
 */
export const areaPharmacies: PharmacyOffer[] = [
  {
    name: 'CVS Pharmacy',
    address: '576 E El Camino Real, Sunnyvale, CA 94087',
    district: 'CA-17',
    hours: 'See CVS store locator for pharmacy hours',
    locatorUrl:
      'https://www.cvs.com/store-locator/sunnyvale-ca-pharmacies/576-e-el-camino-real-sunnyvale-ca-94087/storeid=9700',
    addressVerified: true,
  },
  {
    name: 'CVS Pharmacy',
    address: '10455 S De Anza Blvd, Cupertino, CA 95014',
    district: 'CA-17',
    hours: 'See CVS store locator for pharmacy hours',
    locatorUrl:
      'https://www.cvs.com/store-locator/cupertino-ca-pharmacies/10455-s-de-anza-blvd-cupertino-ca-95014/storeid=9894',
    addressVerified: true,
  },
  {
    name: 'CVS Pharmacy',
    address: '2004 El Camino Real, Santa Clara, CA 95050',
    district: 'CA-17',
    hours: 'See CVS store locator for pharmacy hours',
    locatorUrl:
      'https://www.cvs.com/store-locator/santa-clara-ca-pharmacies/2004-el-camino-real-santa-clara-ca-95050/storeid=17658',
    addressVerified: true,
  },
  {
    name: 'Walgreens Pharmacy',
    address: '1833 N Milpitas Blvd, Milpitas, CA 95035',
    district: 'CA-17',
    hours: 'See Walgreens store locator for pharmacy hours',
    locatorUrl:
      'https://www.walgreens.com/locator/walgreens-1833+n+milpitas+blvd-milpitas-ca-95035/id=5480',
    addressVerified: true,
  },
  {
    name: 'Costco Pharmacy',
    address: '1709 Automation Pkwy, San Jose, CA 95131',
    district: 'CA-17',
    hours: 'See Costco warehouse page for pharmacy hours',
    locatorUrl: 'https://www.costco.com/w/-/ca/san-jose/1004',
    addressVerified: true,
  },
  {
    name: 'Walgreens Pharmacy',
    address: '440 Blossom Hill Rd, San Jose, CA 95123',
    district: 'CA-19',
    hours: 'See Walgreens store locator for pharmacy hours',
    locatorUrl: 'https://www.walgreens.com/storelocator/drive-thru-pharmacy/gilroy-ca',
    addressVerified: true,
  },
  {
    name: 'Walgreens Pharmacy',
    address: '745 E Dunne Ave, Morgan Hill, CA 95037',
    district: 'CA-19',
    hours: 'See Walgreens store locator for pharmacy hours',
    locatorUrl: 'https://www.walgreens.com/storelocator/pharmacy/gilroy-ca',
    addressVerified: true,
  },
  {
    name: 'Walgreens Pharmacy',
    address: '770 1st St, Gilroy, CA 95020',
    district: 'CA-19',
    hours: 'See Walgreens store locator for pharmacy hours',
    locatorUrl: 'https://www.walgreens.com/locator/walgreens-770+1st+st-gilroy-ca-95020/id=9516',
    addressVerified: true,
  },
  {
    name: 'Costco Pharmacy',
    address: '7251 Camino Arroyo, Gilroy, CA 95020',
    district: 'CA-19',
    hours: 'Mon-Fri 9:00am-7:00pm; Sat 9:00am-6:00pm; Sun closed (Costco warehouse page)',
    locatorUrl: 'https://www.costco.com/warehouse-locations/gilroy-ca-760.html',
    addressVerified: true,
  },
  {
    name: 'Walgreens Pharmacy',
    address: '1532 N Main St, Salinas, CA 93906',
    district: 'CA-19',
    hours: 'See Walgreens store locator for pharmacy hours',
    locatorUrl: 'https://www.walgreens.com/storelocator/pharmacy/gilroy-ca',
    addressVerified: true,
  },
];
