export type Language = 'en' | 'es' | 'zh' | 'hi';

export type LocalizedText = Record<Language, string>;

export type HouseholdSize = 1 | 2 | 3 | 4 | 5;
export type IncomeBracket = 'A' | 'B' | 'C';
export type InsuranceStatus = 'yes' | 'no' | null;

export type ScreenId =
  | 'language'
  | 'insurance'
  | 'insuredNotice'
  | 'household'
  | 'income'
  | 'eligibility'
  | 'search'
  | 'results';

export type District = 'CA-17' | 'CA-19';

export type HoursId =
  | 'cvsLocator'
  | 'walgreensLocator'
  | 'costcoWarehouse'
  | 'walgreens24'
  | 'costcoGilroy';

export type PriceBenchmark = {
  source: 'nadac' | 'costplus';
  price: number | null;
  package: LocalizedText;
  note: LocalizedText;
};

export type PharmacyOffer = {
  name: string;
  address: string;
  district: District;
  hoursId: HoursId;
  locatorUrl: string;
  addressVerified: boolean;
};

export type AssistanceProgram = {
  name: string;
  kind: 'pap' | 'nonprofit';
  sponsor: string;
  summary: LocalizedText;
  eligibility: LocalizedText;
  url: string;
};

export type Medication = {
  id: string;
  brand: string;
  generic: string;
  form: LocalizedText;
  category: LocalizedText;
  searchTerms: string[];
  benchmarks: PriceBenchmark[];
  pharmacies: PharmacyOffer[];
  programs: AssistanceProgram[];
  /** Real GoodRx coupon page for this drug, e.g. https://www.goodrx.com/atorvastatin */
  goodrxUrl: string;
  /** Cost Plus product page when the SKU is in their catalog; otherwise null. */
  costPlusUrl: string | null;
};
