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
  | 'results'
  | 'help'
  | 'saved';

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
  id: string;
  name: string;
  address: string;
  district: District;
  hoursId: HoursId;
  locatorUrl: string;
  addressVerified: boolean;
  /** Cash price at this store for the parent medication, when known. */
  cashPrice: number | null;
};

/** Who the program is designed for, based on insurance. */
export type PapInsuranceRule =
  | 'any'
  | 'uninsured'
  | 'insured'
  | 'uninsuredOrGovernment'
  | 'uninsuredOrMedicare';

export type PapProgram = {
  id: string;
  name: string;
  kind: 'pap' | 'nonprofit';
  sponsor: string;
  /** Medication ids in this app that the program actually covers. */
  medicationIds: string[];
  covers: LocalizedText;
  summary: LocalizedText;
  /** Max household income as % of FPL. Null when the program publishes no FPL figure. */
  fplMax: number | null;
  insuranceRule: PapInsuranceRule;
  /** True when the program will not enroll new patients for this medicine. */
  closedToNew: boolean;
  applicationUrl: string;
  phone: string;
  /** ISO date the listing was last checked against official application pages. */
  verifiedAsOf: string;
  sendWhere: LocalizedText;
  documents: LocalizedText[];
  callScript: LocalizedText;
  cutoff: LocalizedText;
  verifiedNote: LocalizedText;
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
  programIds: string[];
  hasManufacturerPap: boolean;
  /** Real GoodRx coupon page for this drug, e.g. https://www.goodrx.com/atorvastatin */
  goodrxUrl: string;
  /** Real SingleCare coupon page when one exists; otherwise null. */
  singlecareUrl: string | null;
  /** Cost Plus product page when the SKU is in their catalog; otherwise null. */
  costPlusUrl: string | null;
  /** GoodRx coupon dollar amount from the pricing guide, when listed. */
  goodrxPrice: number | null;
  /** Guide estimate of typical retail cash range. */
  retailEstMin: number | null;
  retailEstMax: number | null;
};
