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

export type PharmacyOffer = {
  name: string;
  distanceMiles: number;
  price: number;
  address: string;
  hours: string;
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
  pharmacies: PharmacyOffer[];
  programs: AssistanceProgram[];
};
