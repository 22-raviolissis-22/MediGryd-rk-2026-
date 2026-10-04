export type Language = 'en' | 'es';
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

export type PriceBenchmark = {
  source: 'nadac' | 'costplus';
  /** Shown on the results card. */
  sourceLabel: 'NADAC benchmark' | 'Cost Plus Drugs list price';
  price: number | null;
  package: string;
  packageEs: string;
  note: string;
  noteEs: string;
};

export type PharmacyOffer = {
  name: string;
  address: string;
  district: District;
  hours: string;
  locatorUrl: string;
  addressVerified: boolean;
};

export type AssistanceProgram = {
  name: string;
  kind: 'pap' | 'nonprofit';
  sponsor: string;
  summary: string;
  summaryEs: string;
  eligibility: string;
  eligibilityEs: string;
  url: string;
};

export type Medication = {
  id: string;
  brand: string;
  generic: string;
  form: string;
  formEs: string;
  category: string;
  categoryEs: string;
  searchTerms: string[];
  benchmarks: PriceBenchmark[];
  pharmacies: PharmacyOffer[];
  programs: AssistanceProgram[];
};
