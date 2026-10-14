import type { LocalizedText, Medication, PriceBenchmark } from '../types';
import { L } from '../i18n';
import { pharmaciesWithCash } from './pharmacies';

/** Guide retrieval date for Cost Plus, GoodRx, and local cash figures. */
export const PRICE_RETRIEVED_ON = 'October 13, 2026';
export const COST_PLUS_AS_OF = '2026-10-13';
export const NADAC_AS_OF = '2026-10-13';

function nadac(pkg: LocalizedText, note: LocalizedText): PriceBenchmark {
  return { source: 'nadac', price: null, package: pkg, note };
}

function costplus(price: number | null, pkg: LocalizedText, note: LocalizedText): PriceBenchmark {
  return { source: 'costplus', price, package: pkg, note };
}

const GENERIC_PROGRAMS = ['rx-outreach'];

function wholesaleNote(range: string): LocalizedText {
  return L(
    `Wholesale NADAC reference from the Patient Assistance Programs and Pricing Guide: ${range}. This is not a checkout price.`,
    `Referencia mayorista NADAC de la guía de PAP y precios: ${range}. No es un precio de compra.`,
    `患者援助计划与定价指南中的 NADAC 批发参考价：${range}。不是可结账价格。`,
    `रोगी सहायता और मूल्य गाइड से NADAC थोक संदर्भ: ${range}। यह चेकआउट कीमत नहीं है।`
  );
}

function costPlusNote(price: string): LocalizedText {
  return L(
    `Cost Plus Drugs list price ${price} from the Patient Assistance Programs and Pricing Guide (mail-order; shipping extra).`,
    `Precio de lista de Cost Plus Drugs ${price} según la guía de PAP y precios (pedido por correo; envío aparte).`,
    `患者援助计划与定价指南中的 Cost Plus Drugs 标价 ${price}（邮购，运费另计）。`,
    `रोगी सहायता और मूल्य गाइड में Cost Plus Drugs सूची कीमत ${price} (मेल-ऑर्डर; शिपिंग अलग)।`
  );
}

type StdArgs = {
  id: string;
  brand: string;
  generic: string;
  form: LocalizedText;
  category: LocalizedText;
  searchTerms: string[];
  pkg: LocalizedText;
  wholesale: string;
  costPlus: number;
  goodrxPrice: number;
  retailMin: number;
  retailMax: number;
  cash: number[];
  goodrxPath: string;
  singlecarePath: string;
  costPlusPath: string;
};

function std(a: StdArgs): Medication {
  return {
    id: a.id,
    kind: 'regular',
    brand: a.brand,
    generic: a.generic,
    form: a.form,
    category: a.category,
    searchTerms: a.searchTerms,
    goodrxUrl: `https://www.goodrx.com/${a.goodrxPath}`,
    singlecareUrl: `https://www.singlecare.com/prescription/${a.singlecarePath}`,
    costPlusUrl: `https://www.costplusdrugs.com/medications/${a.costPlusPath}`,
    goodrxPrice: a.goodrxPrice,
    retailEstMin: a.retailMin,
    retailEstMax: a.retailMax,
    benchmarks: [
      nadac(L(a.wholesale, a.wholesale, a.wholesale, a.wholesale), wholesaleNote(a.wholesale)),
      costplus(a.costPlus, a.pkg, costPlusNote(`$${a.costPlus.toFixed(2)}`)),
    ],
    pharmacies: pharmaciesWithCash(a.cash),
    hasManufacturerPap: false,
    programIds: GENERIC_PROGRAMS,
  };
}

type SpecialtyArgs = {
  id: string;
  brand: string;
  generic: string;
  form: LocalizedText;
  category: LocalizedText;
  searchTerms: string[];
  programId: string;
  goodrxPath: string;
  singlecarePath: string;
};

function specialty(a: SpecialtyArgs): Medication {
  const notListed = L('Not listed', 'No listado', '未列出', 'सूची में नहीं');
  const papNote = L(
    'High-cost brand medicine. Retail cash is usually prohibitive — use the manufacturer patient assistance program on the PAPs tab.',
    'Medicamento de marca de alto costo. El precio en efectivo suele ser prohibitivo: usa el PAP del fabricante en la pestaña PAPs.',
    '高价品牌药。零售自费通常难以负担 — 请在 PAP 页使用制药商患者援助计划。',
    'उच्च-लागत ब्रांड दवा। खुदरा नकद आमतौर पर बहुत महंगी है — PAPs टैब पर निर्माता सहायता कार्यक्रम देखें।'
  );
  return {
    id: a.id,
    kind: 'pap',
    brand: a.brand,
    generic: a.generic,
    form: a.form,
    category: a.category,
    searchTerms: a.searchTerms,
    goodrxUrl: `https://www.goodrx.com/${a.goodrxPath}`,
    singlecareUrl: `https://www.singlecare.com/prescription/${a.singlecarePath}`,
    costPlusUrl: null,
    goodrxPrice: null,
    retailEstMin: null,
    retailEstMax: null,
    benchmarks: [
      nadac(notListed, papNote),
      costplus(null, notListed, papNote),
    ],
    pharmacies: [],
    hasManufacturerPap: true,
    programIds: [a.programId],
  };
}

const form30 = (dose: string) =>
  L(
    `${dose}, 30-day supply`,
    `${dose}, suministro de 30 días`,
    `${dose}，30 天用量`,
    `${dose}, 30-दिन की आपूर्ति`
  );
const form60 = (dose: string) =>
  L(
    `${dose}, 60-day supply`,
    `${dose}, suministro de 60 días`,
    `${dose}，60 天用量`,
    `${dose}, 60-दिन की आपूर्ति`
  );
const pkg30 = (dose: string) =>
  L(`30 × ${dose}`, `30 × ${dose}`, `30 × ${dose}`, `30 × ${dose}`);
const pkg60 = (dose: string) =>
  L(`60 × ${dose}`, `60 × ${dose}`, `60 × ${dose}`, `60 × ${dose}`);

const cholesterol = L('Cholesterol', 'Colesterol', '胆固醇', 'कोलेस्ट्रॉल');
const diabetes = L('Diabetes', 'Diabetes', '糖尿病', 'मधुमेह');
const bp = L('Blood pressure', 'Presión arterial', '血压', 'रक्तचाप');
const thyroid = L('Thyroid', 'Tiroides', '甲状腺', 'थायरॉइड');
const reflux = L('Acid reflux', 'Reflujo', '胃酸反流', 'एसिड रिफ्लक्स');
const mental = L('Mental health', 'Salud mental', '精神健康', 'मानसिक स्वास्थ्य');
const diuretic = L('Diuretic', 'Diurético', '利尿剂', 'मूत्रवर्धक');
const nerve = L('Nerve pain', 'Dolor nervioso', '神经痛', 'नस दर्द');
const electrolyte = L('Electrolyte', 'Electrolito', '电解质', 'इलेक्ट्रोलाइट');
const thinner = L('Blood thinner', 'Anticoagulante', '抗凝药', 'रक्त पतला करने वाली दवा');
const autoimmune = L('Autoimmune', 'Autoinmune', '自身免疫', 'स्वप्रतिरक्षी');
const oncology = L('Oncology', 'Oncología', '肿瘤', 'कैंसर');
const heart = L('Diabetes / heart failure', 'Diabetes / insuficiencia cardíaca', '糖尿病 / 心衰', 'मधुमेह / हृदय विफलता');
const injectable = L('Injectable', 'Inyectable', '注射剂', 'इंजेक्टेबल');

export const medications: Medication[] = [
  std({
    id: 'atorvastatin',
    brand: 'Lipitor',
    generic: 'atorvastatin',
    form: form30('20 mg tablet'),
    category: cholesterol,
    searchTerms: ['lipitor', 'atorvastatin', 'statin', 'cholesterol'],
    pkg: pkg30('20 mg tablets'),
    wholesale: '~$0.10–$0.20 / tablet',
    costPlus: 5.41,
    goodrxPrice: 6.1,
    retailMin: 12,
    retailMax: 49,
    cash: [12, 12.5, 12, 14.8, 9.99, 15, 14.8, 15.5, 9.99, 14.8],
    goodrxPath: 'atorvastatin',
    singlecarePath: 'atorvastatin-calcium',
    costPlusPath: 'atorvastatin-20mg-tablet/',
  }),
  std({
    id: 'metformin',
    brand: 'Glucophage',
    generic: 'metformin',
    form: form60('500 mg tablet'),
    category: diabetes,
    searchTerms: ['metformin', 'glucophage', 'diabetes'],
    pkg: pkg60('500 mg tablets'),
    wholesale: '~$0.05 / tablet',
    costPlus: 5,
    goodrxPrice: 4,
    retailMin: 10,
    retailMax: 25,
    cash: [15, 15.5, 15, 18, 10, 18.5, 18, 19, 10, 18],
    goodrxPath: 'metformin',
    singlecarePath: 'metformin-hcl',
    costPlusPath: 'metformin-500mg-tablet/',
  }),
  std({
    id: 'lisinopril',
    brand: 'Zestril',
    generic: 'lisinopril',
    form: form30('10 mg tablet'),
    category: bp,
    searchTerms: ['lisinopril', 'zestril', 'prinivil', 'blood pressure', 'ace'],
    pkg: pkg30('10 mg tablets'),
    wholesale: '~$0.08 / tablet',
    costPlus: 5,
    goodrxPrice: 4,
    retailMin: 10,
    retailMax: 20,
    cash: [12, 12.5, 12, 15, 10, 15.5, 15, 16, 10, 15],
    goodrxPath: 'lisinopril',
    singlecarePath: 'lisinopril',
    costPlusPath: 'lisinopril-10mg-tablet/',
  }),
  std({
    id: 'levothyroxine',
    brand: 'Synthroid',
    generic: 'levothyroxine',
    form: form30('50 mcg tablet'),
    category: thyroid,
    searchTerms: ['synthroid', 'levothyroxine', 'thyroid'],
    pkg: pkg30('50 mcg tablets'),
    wholesale: '~$0.15 / tablet',
    costPlus: 6,
    goodrxPrice: 8,
    retailMin: 15,
    retailMax: 35,
    cash: [20, 20.5, 20, 25, 15, 25.5, 25, 26, 15, 25],
    goodrxPath: 'levothyroxine',
    singlecarePath: 'levothyroxine',
    costPlusPath: 'levothyroxine-50mcg-tablet/',
  }),
  std({
    id: 'amlodipine',
    brand: 'Norvasc',
    generic: 'amlodipine',
    form: form30('5 mg tablet'),
    category: bp,
    searchTerms: ['norvasc', 'amlodipine', 'blood pressure', 'calcium channel'],
    pkg: pkg30('5 mg tablets'),
    wholesale: '~$0.06 / tablet',
    costPlus: 4.5,
    goodrxPrice: 3.8,
    retailMin: 10,
    retailMax: 18,
    cash: [12, 12.5, 12, 14, 10, 14.5, 14, 15, 10, 14],
    goodrxPath: 'amlodipine',
    singlecarePath: 'amlodipine-besylate',
    costPlusPath: 'amlodipine-5mg-tablet/',
  }),
  std({
    id: 'omeprazole',
    brand: 'Prilosec',
    generic: 'omeprazole',
    form: form30('20 mg capsule'),
    category: reflux,
    searchTerms: ['omeprazole', 'prilosec', 'gerd', 'heartburn'],
    pkg: L('30 × 20 mg capsules', '30 cápsulas de 20 mg', '30 × 20 毫克胶囊', '30 × 20 मिग्रा कैप्सूल'),
    wholesale: '~$0.12 / capsule',
    costPlus: 5.2,
    goodrxPrice: 4.5,
    retailMin: 12,
    retailMax: 30,
    cash: [18, 18.5, 18, 22, 12, 22.5, 22, 23, 12, 22],
    goodrxPath: 'omeprazole',
    singlecarePath: 'omeprazole',
    costPlusPath: 'omeprazoledelayedreleasedr-20mg-capsule/',
  }),
  std({
    id: 'glipizide',
    brand: 'Glucotrol',
    generic: 'glipizide',
    form: form30('5 mg tablet'),
    category: diabetes,
    searchTerms: ['glipizide', 'glucotrol', 'diabetes'],
    pkg: pkg30('5 mg tablets'),
    wholesale: '~$0.07 / tablet',
    costPlus: 4.8,
    goodrxPrice: 4,
    retailMin: 10,
    retailMax: 18,
    cash: [12, 12.5, 12, 14, 10, 14.5, 14, 15, 10, 14],
    goodrxPath: 'glipizide',
    singlecarePath: 'glipizide',
    costPlusPath: 'glipizide-5mg-tablet/',
  }),
  std({
    id: 'losartan',
    brand: 'Cozaar',
    generic: 'losartan',
    form: form30('50 mg tablet'),
    category: bp,
    searchTerms: ['losartan', 'cozaar', 'arb', 'blood pressure'],
    pkg: pkg30('50 mg tablets'),
    wholesale: '~$0.10 / tablet',
    costPlus: 5.1,
    goodrxPrice: 4.5,
    retailMin: 12,
    retailMax: 25,
    cash: [15, 15.5, 15, 18, 12, 18.5, 18, 19, 12, 18],
    goodrxPath: 'losartan',
    singlecarePath: 'losartan-potassium',
    costPlusPath: 'losartan-50mg-tablet/',
  }),
  std({
    id: 'sertraline',
    brand: 'Zoloft',
    generic: 'sertraline',
    form: form30('50 mg tablet'),
    category: mental,
    searchTerms: ['zoloft', 'sertraline', 'ssri', 'depression', 'anxiety'],
    pkg: pkg30('50 mg tablets'),
    wholesale: '~$0.14 / tablet',
    costPlus: 5.5,
    goodrxPrice: 5,
    retailMin: 15,
    retailMax: 32,
    cash: [20, 20.5, 20, 24, 15, 24.5, 24, 25, 15, 24],
    goodrxPath: 'sertraline',
    singlecarePath: 'sertraline-hcl',
    costPlusPath: 'sertraline-50mg-tablet/',
  }),
  std({
    id: 'fluoxetine',
    brand: 'Prozac',
    generic: 'fluoxetine',
    form: form30('20 mg capsule'),
    category: mental,
    searchTerms: ['prozac', 'fluoxetine', 'ssri', 'depression'],
    pkg: L('30 × 20 mg capsules', '30 cápsulas de 20 mg', '30 × 20 毫克胶囊', '30 × 20 मिग्रा कैप्सूल'),
    wholesale: '~$0.11 / capsule',
    costPlus: 5.3,
    goodrxPrice: 4.8,
    retailMin: 14,
    retailMax: 28,
    cash: [18, 18.5, 18, 22, 14, 22.5, 22, 23, 14, 22],
    goodrxPath: 'fluoxetine',
    singlecarePath: 'fluoxetine-hcl',
    costPlusPath: 'fluoxetine-20mg-capsule/',
  }),
  std({
    id: 'hydrochlorothiazide',
    brand: 'Microzide',
    generic: 'hydrochlorothiazide',
    form: form30('25 mg tablet'),
    category: diuretic,
    searchTerms: ['hydrochlorothiazide', 'hctz', 'microzide', 'diuretic'],
    pkg: pkg30('25 mg tablets'),
    wholesale: '~$0.04 / tablet',
    costPlus: 4.2,
    goodrxPrice: 3.5,
    retailMin: 8,
    retailMax: 15,
    cash: [10, 10.5, 10, 12, 8, 12.5, 12, 13, 8, 12],
    goodrxPath: 'hydrochlorothiazide',
    singlecarePath: 'hydrochlorothiazide',
    costPlusPath: 'hydrochlorothiazide-25mg-tablet/',
  }),
  std({
    id: 'furosemide',
    brand: 'Lasix',
    generic: 'furosemide',
    form: form30('20 mg tablet'),
    category: diuretic,
    searchTerms: ['lasix', 'furosemide', 'diuretic'],
    pkg: pkg30('20 mg tablets'),
    wholesale: '~$0.06 / tablet',
    costPlus: 4.5,
    goodrxPrice: 3.9,
    retailMin: 9,
    retailMax: 16,
    cash: [11, 11.5, 11, 13, 9, 13.5, 13, 14, 9, 13],
    goodrxPath: 'furosemide',
    singlecarePath: 'furosemide',
    costPlusPath: 'furosemide-20mg-tablet/',
  }),
  std({
    id: 'atenolol',
    brand: 'Tenormin',
    generic: 'atenolol',
    form: form30('50 mg tablet'),
    category: bp,
    searchTerms: ['tenormin', 'atenolol', 'beta blocker', 'blood pressure'],
    pkg: pkg30('50 mg tablets'),
    wholesale: '~$0.08 / tablet',
    costPlus: 4.9,
    goodrxPrice: 4.2,
    retailMin: 10,
    retailMax: 20,
    cash: [12, 12.5, 12, 15, 10, 15.5, 15, 16, 10, 15],
    goodrxPath: 'atenolol',
    singlecarePath: 'atenolol',
    costPlusPath: 'atenolol-50mg-tablet/',
  }),
  std({
    id: 'gabapentin',
    brand: 'Neurontin',
    generic: 'gabapentin',
    form: form30('300 mg capsule'),
    category: nerve,
    searchTerms: ['neurontin', 'gabapentin', 'nerve pain', 'seizure'],
    pkg: L('30 × 300 mg capsules', '30 cápsulas de 300 mg', '30 × 300 毫克胶囊', '30 × 300 मिग्रा कैप्सूल'),
    wholesale: '~$0.20 / capsule',
    costPlus: 6.2,
    goodrxPrice: 7,
    retailMin: 18,
    retailMax: 40,
    cash: [25, 25.5, 25, 30, 18, 30.5, 30, 31, 18, 30],
    goodrxPath: 'gabapentin',
    singlecarePath: 'gabapentin',
    costPlusPath: 'gabapentin-300mg-capsule/',
  }),
  std({
    id: 'potassium-chloride',
    brand: 'Klor-Con',
    generic: 'potassium chloride',
    form: form30('10 mEq tablet'),
    category: electrolyte,
    searchTerms: ['klor-con', 'potassium', 'kcl', 'electrolyte'],
    pkg: pkg30('10 mEq tablets'),
    wholesale: '~$0.25 / tablet',
    costPlus: 7.1,
    goodrxPrice: 8.5,
    retailMin: 20,
    retailMax: 42,
    cash: [28, 28.5, 28, 34, 20, 34.5, 34, 35, 20, 34],
    goodrxPath: 'potassium-chloride',
    singlecarePath: 'potassium-chloride',
    costPlusPath: 'potassium-chloride-10meq-tablet/',
  }),
  specialty({
    id: 'farxiga',
    brand: 'Farxiga',
    generic: 'dapagliflozin',
    form: form30('10 mg tablet'),
    category: heart,
    searchTerms: ['farxiga', 'dapagliflozin', 'sglt2', 'diabetes', 'heart failure'],
    programId: 'az-me',
    goodrxPath: 'farxiga',
    singlecarePath: 'farxiga',
  }),
  specialty({
    id: 'jardiance',
    brand: 'Jardiance',
    generic: 'empagliflozin',
    form: form30('10 mg tablet'),
    category: diabetes,
    searchTerms: ['jardiance', 'empagliflozin', 'sglt2', 'diabetes'],
    programId: 'bi-cares',
    goodrxPath: 'jardiance',
    singlecarePath: 'jardiance',
  }),
  specialty({
    id: 'eliquis',
    brand: 'Eliquis',
    generic: 'apixaban',
    form: form30('5 mg tablet'),
    category: thinner,
    searchTerms: ['eliquis', 'apixaban', 'blood thinner', 'afib'],
    programId: 'bms-paf',
    goodrxPath: 'eliquis',
    singlecarePath: 'eliquis',
  }),
  specialty({
    id: 'humira',
    brand: 'Humira',
    generic: 'adalimumab',
    form: injectable,
    category: autoimmune,
    searchTerms: ['humira', 'adalimumab', 'arthritis', 'ibd', 'crohns'],
    programId: 'abbvie-assist',
    goodrxPath: 'humira',
    singlecarePath: 'humira',
  }),
  specialty({
    id: 'trulicity',
    brand: 'Trulicity',
    generic: 'dulaglutide',
    form: injectable,
    category: diabetes,
    searchTerms: ['trulicity', 'dulaglutide', 'glp-1', 'diabetes'],
    programId: 'lilly-cares',
    goodrxPath: 'trulicity',
    singlecarePath: 'trulicity',
  }),
  specialty({
    id: 'xarelto',
    brand: 'Xarelto',
    generic: 'rivaroxaban',
    form: form30('20 mg tablet'),
    category: thinner,
    searchTerms: ['xarelto', 'rivaroxaban', 'blood thinner'],
    programId: 'jj-pap',
    goodrxPath: 'xarelto',
    singlecarePath: 'xarelto',
  }),
  specialty({
    id: 'keytruda',
    brand: 'Keytruda',
    generic: 'pembrolizumab',
    form: injectable,
    category: oncology,
    searchTerms: ['keytruda', 'pembrolizumab', 'cancer', 'oncology'],
    programId: 'merck-helps',
    goodrxPath: 'keytruda',
    singlecarePath: 'keytruda',
  }),
  specialty({
    id: 'herceptin',
    brand: 'Herceptin',
    generic: 'trastuzumab',
    form: injectable,
    category: oncology,
    searchTerms: ['herceptin', 'trastuzumab', 'breast cancer', 'oncology'],
    programId: 'genentech-access',
    goodrxPath: 'herceptin',
    singlecarePath: 'herceptin',
  }),
  specialty({
    id: 'xeljanz',
    brand: 'Xeljanz',
    generic: 'tofacitinib',
    form: form30('5 mg tablet'),
    category: autoimmune,
    searchTerms: ['xeljanz', 'tofacitinib', 'arthritis', 'jak'],
    programId: 'pfizer-rxpathways',
    goodrxPath: 'xeljanz',
    singlecarePath: 'xeljanz',
  }),
  specialty({
    id: 'stelara',
    brand: 'Stelara',
    generic: 'ustekinumab',
    form: injectable,
    category: autoimmune,
    searchTerms: ['stelara', 'ustekinumab', 'psoriasis', 'crohns'],
    programId: 'janssen-carepath',
    goodrxPath: 'stelara',
    singlecarePath: 'stelara',
  }),
];

export const regularMedications = medications.filter((m) => m.kind === 'regular');
export const papMedications = medications.filter((m) => m.kind === 'pap');

/** True when listed programs exist but there is no retail Cost Plus checkout price. */
export function onlyAssistanceAvailable(med: Medication): boolean {
  return med.kind === 'pap';
}

function haystack(med: Medication) {
  return [
    med.brand,
    med.generic,
    med.category.en,
    med.category.es,
    med.category.zh,
    med.category.hi,
    ...med.searchTerms,
  ]
    .join(' ')
    .toLowerCase();
}

export function searchInCatalog(list: Medication[], query: string): Medication[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((med) => haystack(med).includes(q));
}

export function searchMedications(query: string): Medication[] {
  return searchInCatalog(medications, query);
}

/**
 * Open this medicine from a typed search: exact brand/generic/term, or a unique
 * brand/generic prefix of at least 3 characters.
 */
export function uniqueCatalogMatch(query: string, list: Medication[]): Medication | null {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return null;
  const exact = list.filter(
    (m) =>
      m.brand.toLowerCase() === q ||
      m.generic.toLowerCase() === q ||
      m.searchTerms.some((term) => term.toLowerCase() === q)
  );
  if (exact.length === 1) return exact[0];
  const prefix = list.filter(
    (m) => m.brand.toLowerCase().startsWith(q) || m.generic.toLowerCase().startsWith(q)
  );
  if (prefix.length === 1) return prefix[0];
  return null;
}

/** Prefer a PAP hit when the query is a specialty brand; otherwise a regular pharmacy drug. */
export function routeSearch(query: string): Medication | null {
  const pap = uniqueCatalogMatch(query, papMedications);
  const regular = uniqueCatalogMatch(query, regularMedications);
  if (pap && !regular) return pap;
  if (regular && !pap) return regular;
  return null;
}
