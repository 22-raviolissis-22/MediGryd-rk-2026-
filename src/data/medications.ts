import type { Medication, PriceBenchmark } from '../types';
import { areaPharmacies } from './pharmacies';

/** Retrieval date for NADAC and Cost Plus snapshots used below. */
export const PRICE_RETRIEVED_ON = 'October 3, 2026';
export const NADAC_AS_OF = '2026-09-30';
export const NADAC_EFFECTIVE = '2026-09-23';

const needyMeds = {
  name: 'NeedyMeds',
  kind: 'nonprofit' as const,
  sponsor: 'NeedyMeds',
  summary: 'Directory of PAPs, discount cards, and clinics that help pay for prescriptions.',
  summaryEs: 'Directorio de PAPs, tarjetas de descuento y clínicas que ayudan a pagar recetas.',
  eligibility: 'Open to anyone looking for assistance; programs have their own rules.',
  eligibilityEs: 'Abierto a cualquiera que busque ayuda; cada programa tiene sus propias reglas.',
  url: 'https://www.needymeds.org/',
};

const rxAssist = {
  name: 'RxAssist',
  kind: 'nonprofit' as const,
  sponsor: 'RxAssist',
  summary: 'Independent guide to manufacturer patient assistance programs.',
  summaryEs: 'Guía independiente de programas de asistencia al paciente de los fabricantes.',
  eligibility: 'Varies by manufacturer; often uninsured or underinsured with income limits.',
  eligibilityEs: 'Varía según el fabricante; a menudo sin seguro o con seguro insuficiente e ingresos limitados.',
  url: 'https://www.rxassist.org/',
};

const goodDays = {
  name: 'Good Days',
  kind: 'nonprofit' as const,
  sponsor: 'Good Days',
  summary: 'Helps insured patients cover copays for high-cost specialty medicines.',
  summaryEs: 'Ayuda a pacientes con seguro a cubrir copagos de medicamentos especializados de alto costo.',
  eligibility: 'Usually commercially insured; disease-specific funds open and close.',
  eligibilityEs: 'Por lo general con seguro comercial; los fondos por enfermedad abren y cierran.',
  url: 'https://www.mygooddays.org/',
};

const pan = {
  name: 'PAN Foundation',
  kind: 'nonprofit' as const,
  sponsor: 'Patient Access Network Foundation',
  summary: 'Copay assistance grants for people with insurance who cannot afford out-of-pocket costs.',
  summaryEs: 'Becas para copagos para personas con seguro que no pueden pagar los costos de bolsillo.',
  eligibility: 'Must have insurance; income and diagnosis must match an open fund.',
  eligibilityEs: 'Debes tener seguro; ingresos y diagnóstico deben coincidir con un fondo abierto.',
  url: 'https://www.panfoundation.org/',
};

function nadac(
  price: number,
  pkgEn: string,
  pkgEs: string,
  note: string,
  noteEs: string
): PriceBenchmark {
  return {
    source: 'nadac',
    sourceLabel: 'NADAC benchmark',
    price,
    package: pkgEn,
    packageEs: pkgEs,
    note,
    noteEs,
  };
}

function costplus(
  price: number | null,
  pkgEn: string,
  pkgEs: string,
  note: string,
  noteEs: string
): PriceBenchmark {
  return {
    source: 'costplus',
    sourceLabel: 'Cost Plus Drugs list price',
    price,
    package: pkgEn,
    packageEs: pkgEs,
    note,
    noteEs,
  };
}

const notOnCostPlusEn =
  'Not listed in the Cost Plus Drugs public catalog on October 3, 2026. Cost Plus list prices use acquisition + 15% markup + pharmacist fee when a product is sold.';
const notOnCostPlusEs =
  'No aparece en el catálogo público de Cost Plus Drugs el 3 de octubre de 2026. Los precios de lista de Cost Plus usan costo de adquisición + 15% + tarifa de farmacéutico cuando venden el producto.';

export const medications: Medication[] = [
  {
    id: 'atorvastatin',
    brand: 'Lipitor',
    generic: 'atorvastatin',
    form: '20 mg tablet, 30-day supply',
    formEs: 'tableta 20 mg, suministro de 30 días',
    category: 'Cholesterol',
    categoryEs: 'Colesterol',
    searchTerms: ['lipitor', 'atorvastatin', 'statin', 'cholesterol'],
    benchmarks: [
      nadac(
        0.84,
        '30 × 20 mg tablets',
        '30 tabletas de 20 mg',
        'CMS NADAC $0.02792 per tablet (ATORVASTATIN 20 MG TABLET), as-of 2026-09-30, effective 2026-09-23. 0.02792 × 30 = $0.84.',
        'CMS NADAC $0.02792 por tableta (ATORVASTATIN 20 MG TABLET), al 2026-09-30, vigente 2026-09-23. 0.02792 × 30 = $0.84.'
      ),
      costplus(
        5.41,
        '30 × 20 mg tablets',
        '30 tabletas de 20 mg',
        'Cost Plus Drugs public API quote $5.41 for 30 tablets of atorvastatin 20 mg (unit $0.0119 + 15% markup + $5 pharmacist fee). Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $5.41 por 30 tabletas de atorvastatina 20 mg (unidad $0.0119 + 15% + $5 de farmacéutico). Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      rxAssist,
      {
        name: 'Pfizer Patient Assistance',
        kind: 'pap',
        sponsor: 'Pfizer',
        summary: 'May provide Lipitor or atorvastatin at no cost for qualifying patients.',
        summaryEs: 'Puede proporcionar Lipitor o atorvastatina sin costo a pacientes que califiquen.',
        eligibility: 'Typically uninsured or underinsured; household income often up to 300% FPL.',
        eligibilityEs:
          'Por lo general sin seguro o con seguro insuficiente; ingresos hasta ~300% del nivel federal de pobreza.',
        url: 'https://www.pfizerforall.com/',
      },
    ],
  },
  {
    id: 'metformin',
    brand: 'Glucophage',
    generic: 'metformin',
    form: '500 mg tablet, 60-day supply',
    formEs: 'tableta 500 mg, suministro de 60 días',
    category: 'Diabetes',
    categoryEs: 'Diabetes',
    searchTerms: ['metformin', 'glucophage', 'diabetes', 'type 2'],
    benchmarks: [
      nadac(
        0.87,
        '60 × 500 mg tablets',
        '60 tabletas de 500 mg',
        'CMS NADAC $0.01451 per tablet (METFORMIN HCL 500 MG TABLET), as-of 2026-09-30. 0.01451 × 60 = $0.87.',
        'CMS NADAC $0.01451 por tableta (METFORMIN HCL 500 MG TABLET), al 2026-09-30. 0.01451 × 60 = $0.87.'
      ),
      costplus(
        5.62,
        '60 × 500 mg tablets',
        '60 tabletas de 500 mg',
        'Cost Plus Drugs public API quote $5.62 for 60 tablets of metformin 500 mg. Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $5.62 por 60 tabletas de metformina 500 mg. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      {
        name: 'Americares Medicine Access',
        kind: 'nonprofit',
        sponsor: 'Americares',
        summary: 'Connects clinics and patients with donated chronic-care medicines.',
        summaryEs: 'Conecta clínicas y pacientes con medicamentos donados para enfermedades crónicas.',
        eligibility: 'Usually through a participating safety-net clinic.',
        eligibilityEs: 'Por lo general a través de una clínica de red de seguridad participante.',
        url: 'https://www.americares.org/',
      },
    ],
  },
  {
    id: 'lisinopril',
    brand: 'Zestril',
    generic: 'lisinopril',
    form: '10 mg tablet, 30-day supply',
    formEs: 'tableta 10 mg, suministro de 30 días',
    category: 'Blood pressure',
    categoryEs: 'Presión arterial',
    searchTerms: ['lisinopril', 'zestril', 'prinivil', 'blood pressure', 'ace'],
    benchmarks: [
      nadac(
        0.54,
        '30 × 10 mg tablets',
        '30 tabletas de 10 mg',
        'CMS NADAC $0.01815 per tablet (LISINOPRIL 10 MG TABLET), as-of 2026-09-30. 0.01815 × 30 = $0.54.',
        'CMS NADAC $0.01815 por tableta (LISINOPRIL 10 MG TABLET), al 2026-09-30. 0.01815 × 30 = $0.54.'
      ),
      costplus(
        5.38,
        '30 × 10 mg tablets',
        '30 tabletas de 10 mg',
        'Cost Plus Drugs public API quote $5.38 for 30 tablets of lisinopril 10 mg. Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $5.38 por 30 tabletas de lisinopril 10 mg. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [needyMeds, rxAssist],
  },
  {
    id: 'omeprazole',
    brand: 'Prilosec',
    generic: 'omeprazole',
    form: '20 mg capsule, 30-day supply',
    formEs: 'cápsula 20 mg, suministro de 30 días',
    category: 'Acid reflux',
    categoryEs: 'Reflujo',
    searchTerms: ['omeprazole', 'prilosec', 'gerd', 'heartburn'],
    benchmarks: [
      nadac(
        0.88,
        '30 × 20 mg DR capsules',
        '30 cápsulas DR de 20 mg',
        'CMS NADAC $0.02945 per capsule (OMEPRAZOLE DR 20 MG CAPSULE), as-of 2026-09-30. 0.02945 × 30 = $0.88.',
        'CMS NADAC $0.02945 por cápsula (OMEPRAZOLE DR 20 MG CAPSULE), al 2026-09-30. 0.02945 × 30 = $0.88.'
      ),
      costplus(
        5.93,
        '30 × 20 mg DR capsules',
        '30 cápsulas DR de 20 mg',
        'Cost Plus Drugs public API quote $5.93 for 30 omeprazole delayed-release 20 mg capsules. Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $5.93 por 30 cápsulas de omeprazol 20 mg de liberación retardada. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [needyMeds],
  },
  {
    id: 'albuterol',
    brand: 'Ventolin HFA',
    generic: 'albuterol',
    form: 'inhaler, 1 inhaler',
    formEs: 'inhalador, 1 unidad',
    category: 'Asthma',
    categoryEs: 'Asma',
    searchTerms: ['albuterol', 'ventolin', 'proair', 'inhaler', 'asthma'],
    benchmarks: [
      nadac(
        32.86,
        '1 generic albuterol HFA 90 mcg inhaler (18 g canister)',
        '1 inhalador genérico de albuterol HFA 90 mcg (envase de 18 g)',
        'CMS NADAC $1.82548 per gram (ALBUTEROL HFA 90 MCG INHALER, generic), as-of 2026-09-30. Typical 18 g canister: 1.82548 × 18 = $32.86. Brand Ventolin HFA NADAC was $2.72021/g ($48.96 per 18 g).',
        'CMS NADAC $1.82548 por gramo (ALBUTEROL HFA 90 MCG INHALER, genérico), al 2026-09-30. Envase típico de 18 g: 1.82548 × 18 = $32.86. Ventolin HFA de marca: $2.72021/g ($48.96 por 18 g).'
      ),
      costplus(
        46.38,
        '1 albuterol HFA 90 mcg inhaler (18 g)',
        '1 inhalador de albuterol HFA 90 mcg (18 g)',
        'Cost Plus Drugs public API quote $46.38 for 1 × 18 g albuterol 90 mcg inhaler (unit $35.98 + 15% + $5 pharmacist fee). Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $46.38 por 1 inhalador de 18 g de albuterol 90 mcg. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      {
        name: 'GSK Patient Assistance',
        kind: 'pap',
        sponsor: 'GSK',
        summary: 'May provide Ventolin and other GSK inhalers at no cost.',
        summaryEs: 'Puede proporcionar Ventolin y otros inhaladores de GSK sin costo.',
        eligibility: 'Uninsured or Medicare Part D in the coverage gap; income limits apply.',
        eligibilityEs: 'Sin seguro o Medicare Parte D en el período sin cobertura; hay límites de ingresos.',
        url: 'https://www.gskforyou.com/',
      },
    ],
  },
  {
    id: 'insulin-glargine',
    brand: 'Lantus',
    generic: 'insulin glargine',
    form: 'vial, 1 month',
    formEs: 'frasco, 1 mes',
    category: 'Diabetes',
    categoryEs: 'Diabetes',
    searchTerms: ['lantus', 'insulin', 'glargine', 'basaglar', 'diabetes'],
    benchmarks: [
      nadac(
        61.52,
        '1 Lantus 100 unit/mL vial (10 mL)',
        '1 frasco de Lantus 100 unidades/mL (10 mL)',
        'CMS NADAC $6.15227 per mL (LANTUS 100 UNIT/ML VIAL), as-of 2026-09-30. 6.15227 × 10 mL = $61.52. Generic insulin glargine-yfgn vial NADAC was $6.08105/mL ($60.81 per 10 mL).',
        'CMS NADAC $6.15227 por mL (LANTUS 100 UNIT/ML VIAL), al 2026-09-30. 6.15227 × 10 mL = $61.52. Genérico insulin glargine-yfgn: $6.08105/mL ($60.81 por 10 mL).'
      ),
      costplus(null, 'Not listed', 'No listado', notOnCostPlusEn, notOnCostPlusEs),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'Sanofi Patient Connection',
        kind: 'pap',
        sponsor: 'Sanofi',
        summary: 'Free Lantus or other Sanofi insulins for eligible uninsured patients.',
        summaryEs: 'Lantus u otras insulinas de Sanofi gratis para pacientes elegibles sin seguro.',
        eligibility: 'Uninsured or functionally uninsured; income typically ≤400% FPL.',
        eligibilityEs: 'Sin seguro o sin cobertura funcional; ingresos generalmente ≤400% FPL.',
        url: 'https://www.sanofipatientconnection.com/',
      },
      needyMeds,
      {
        name: 'Insulin for Life / Direct Relief',
        kind: 'nonprofit',
        sponsor: 'Direct Relief',
        summary: 'Donated insulin and diabetes supplies through partner clinics.',
        summaryEs: 'Insulina y suministros donados a través de clínicas asociadas.',
        eligibility: 'Distributed via partner health centers, not direct-to-patient mail.',
        eligibilityEs: 'Se entrega en centros de salud asociados, no por correo directo al paciente.',
        url: 'https://www.directrelief.org/',
      },
    ],
  },
  {
    id: 'ozempic',
    brand: 'Ozempic',
    generic: 'semaglutide',
    form: 'pen, 1 month',
    formEs: 'pluma, 1 mes',
    category: 'Diabetes',
    categoryEs: 'Diabetes',
    searchTerms: ['ozempic', 'semaglutide', 'wegovy', 'glp-1', 'diabetes'],
    benchmarks: [
      nadac(
        995.7,
        '1 Ozempic 1 mg/dose pen (4 mg / 3 mL)',
        '1 pluma de Ozempic 1 mg/dosis (4 mg / 3 mL)',
        'CMS NADAC $331.90037 per mL (OZEMPIC 1 MG/DOSE (4 MG/3 ML) PEN), as-of 2026-09-30. 331.90037 × 3 mL = $995.70.',
        'CMS NADAC $331.90037 por mL (OZEMPIC 1 MG/DOSE (4 MG/3 ML) PEN), al 2026-09-30. 331.90037 × 3 mL = $995.70.'
      ),
      costplus(null, 'Not listed', 'No listado', notOnCostPlusEn, notOnCostPlusEs),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'Novo Nordisk Patient Assistance',
        kind: 'pap',
        sponsor: 'Novo Nordisk',
        summary: 'May provide Ozempic at no cost for qualifying uninsured patients.',
        summaryEs: 'Puede proporcionar Ozempic sin costo a pacientes elegibles sin seguro.',
        eligibility: 'Uninsured, US resident, prescription required, household income limits.',
        eligibilityEs: 'Sin seguro, residente de EE. UU., receta requerida y límites de ingresos.',
        url: 'https://www.novocare.com/',
      },
      pan,
      goodDays,
    ],
  },
  {
    id: 'eliquis',
    brand: 'Eliquis',
    generic: 'apixaban',
    form: '5 mg tablet, 30-day supply',
    formEs: 'tableta 5 mg, suministro de 30 días',
    category: 'Blood thinner',
    categoryEs: 'Anticoagulante',
    searchTerms: ['eliquis', 'apixaban', 'blood thinner', 'afib'],
    benchmarks: [
      nadac(
        331.27,
        '60 × 5 mg tablets (twice daily, 30 days)',
        '60 tabletas de 5 mg (dos veces al día, 30 días)',
        'CMS NADAC $5.52114 per tablet (ELIQUIS 5 MG TABLET), as-of 2026-09-30. 5.52114 × 60 = $331.27. No generic apixaban NADAC row was in the 2026-09-30 file.',
        'CMS NADAC $5.52114 por tableta (ELIQUIS 5 MG TABLET), al 2026-09-30. 5.52114 × 60 = $331.27. No había fila genérica de apixabán en el archivo del 2026-09-30.'
      ),
      costplus(null, 'Not listed', 'No listado', notOnCostPlusEn, notOnCostPlusEs),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'Bristol Myers Squibb Patient Assistance',
        kind: 'pap',
        sponsor: 'Bristol Myers Squibb',
        summary: 'Free Eliquis for people who qualify based on insurance and income.',
        summaryEs: 'Eliquis gratis para quienes califiquen según seguro e ingresos.',
        eligibility: 'Uninsured or Medicare with unaffordable costs; income screening required.',
        eligibilityEs: 'Sin seguro o Medicare con costos inasequibles; se revisan los ingresos.',
        url: 'https://www.bms.com/patient-and-caregivers/patient-assistance.html',
      },
      pan,
      needyMeds,
    ],
  },
  {
    id: 'humira',
    brand: 'Humira',
    generic: 'adalimumab',
    form: 'pen, 1 month',
    formEs: 'pluma, 1 mes',
    category: 'Autoimmune',
    categoryEs: 'Autoinmune',
    searchTerms: ['humira', 'adalimumab', 'amjevita', 'arthritis', 'crohns'],
    benchmarks: [
      nadac(
        6734.83,
        '2 Humira (CF) 40 mg/0.4 mL pens (typical monthly pack)',
        '2 plumas Humira (CF) 40 mg/0.4 mL (paquete mensual típico)',
        'CMS NADAC $3367.41479 per pen (HUMIRA(CF) PEN 40 MG/0.4 ML), as-of 2026-09-30. Two pens: $6,734.83. This is a national acquisition benchmark, not a store cash price.',
        'CMS NADAC $3367.41479 por pluma (HUMIRA(CF) PEN 40 MG/0.4 ML), al 2026-09-30. Dos plumas: $6,734.83. Es una referencia nacional de adquisición, no un precio de mostrador.'
      ),
      costplus(
        469.25,
        '1 adalimumab-aacf 40 mg/0.8 mL 2-pen kit (Humira biosimilar)',
        '1 kit de 2 plumas adalimumab-aacf 40 mg/0.8 mL (biosimilar de Humira)',
        'Cost Plus Drugs public API quote $469.25 for a 2-pen adalimumab-aacf kit (unit $395 + 15% + $5 pharmacist fee). This is the biosimilar list price, not brand Humira. Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $469.25 por un kit de 2 plumas de adalimumab-aacf (biosimilar, no Humira de marca). Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'AbbVie Patient Assistance',
        kind: 'pap',
        sponsor: 'AbbVie',
        summary: 'myAbbVie Assist may provide Humira at no cost if you qualify.',
        summaryEs: 'myAbbVie Assist puede proporcionar Humira sin costo si calificas.',
        eligibility: 'Uninsured or underinsured; financial criteria and prescription required.',
        eligibilityEs: 'Sin seguro o con seguro insuficiente; criterios financieros y receta.',
        url: 'https://www.abbvie.com/patients/patient-assistance.html',
      },
      pan,
      goodDays,
      {
        name: 'HealthWell Foundation',
        kind: 'nonprofit',
        sponsor: 'HealthWell Foundation',
        summary: 'Copay and premium assistance when a matching disease fund is open.',
        summaryEs: 'Ayuda con copagos y primas cuando hay un fondo de enfermedad abierto.',
        eligibility: 'Insured; income generally up to 400–500% FPL depending on fund.',
        eligibilityEs: 'Con seguro; ingresos generalmente hasta 400–500% FPL según el fondo.',
        url: 'https://www.healthwellfoundation.org/',
      },
    ],
  },
  {
    id: 'sertraline',
    brand: 'Zoloft',
    generic: 'sertraline',
    form: '50 mg tablet, 30-day supply',
    formEs: 'tableta 50 mg, suministro de 30 días',
    category: 'Mental health',
    categoryEs: 'Salud mental',
    searchTerms: ['zoloft', 'sertraline', 'ssri', 'depression', 'anxiety'],
    benchmarks: [
      nadac(
        1.04,
        '30 × 50 mg tablets',
        '30 tabletas de 50 mg',
        'CMS NADAC $0.03479 per tablet (SERTRALINE HCL 50 MG TABLET), as-of 2026-09-30. 0.03479 × 30 = $1.04.',
        'CMS NADAC $0.03479 por tableta (SERTRALINE HCL 50 MG TABLET), al 2026-09-30. 0.03479 × 30 = $1.04.'
      ),
      costplus(
        5.69,
        '30 × 50 mg tablets',
        '30 tabletas de 50 mg',
        'Cost Plus Drugs public API quote $5.69 for 30 tablets of sertraline 50 mg. Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $5.69 por 30 tabletas de sertralina 50 mg. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      {
        name: 'Viatris Patient Assistance',
        kind: 'pap',
        sponsor: 'Viatris',
        summary: 'Assistance for certain generic and brand mental-health medicines.',
        summaryEs: 'Asistencia para ciertos medicamentos de salud mental de marca y genéricos.',
        eligibility: 'Uninsured with documented financial need.',
        eligibilityEs: 'Sin seguro y con necesidad económica documentada.',
        url: 'https://www.viatris.com/',
      },
    ],
  },
  {
    id: 'amoxicillin',
    brand: 'Amoxil',
    generic: 'amoxicillin',
    form: '500 mg capsule, 10-day course',
    formEs: 'cápsula 500 mg, tratamiento de 10 días',
    category: 'Antibiotic',
    categoryEs: 'Antibiótico',
    searchTerms: ['amoxicillin', 'amoxil', 'antibiotic'],
    benchmarks: [
      nadac(
        2.36,
        '30 × 500 mg capsules (typical 10-day course)',
        '30 cápsulas de 500 mg (tratamiento típico de 10 días)',
        'CMS NADAC $0.07880 per capsule (AMOXICILLIN 500 MG CAPSULE), as-of 2026-09-30. 0.07880 × 30 = $2.36.',
        'CMS NADAC $0.07880 por cápsula (AMOXICILLIN 500 MG CAPSULE), al 2026-09-30. 0.07880 × 30 = $2.36.'
      ),
      costplus(
        6.72,
        '30 × 500 mg capsules',
        '30 cápsulas de 500 mg',
        'Cost Plus Drugs public API quote $6.72 for 30 amoxicillin 500 mg capsules. Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $6.72 por 30 cápsulas de amoxicilina 500 mg. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [needyMeds],
  },
  {
    id: 'advair',
    brand: 'Advair Diskus',
    generic: 'fluticasone / salmeterol',
    form: '250/50 inhaler',
    formEs: 'inhalador 250/50',
    category: 'Asthma / COPD',
    categoryEs: 'Asma / EPOC',
    searchTerms: ['advair', 'fluticasone', 'salmeterol', 'wixela', 'copd', 'asthma'],
    benchmarks: [
      nadac(
        74.71,
        '1 generic 250/50 inhaler (60 doses)',
        '1 inhalador genérico 250/50 (60 dosis)',
        'CMS NADAC $1.24514 per dose (FLUTICASONE-SALMETEROL 250-50 / WIXELA 250-50 INHUB), as-of 2026-09-30. 1.24514 × 60 = $74.71. Brand Advair 250-50 Diskus NADAC was $3.12275 per dose ($187.37 per 60 doses).',
        'CMS NADAC $1.24514 por dosis (FLUTICASONE-SALMETEROL 250-50 / WIXELA 250-50 INHUB), al 2026-09-30. 1.24514 × 60 = $74.71. Advair Diskus 250-50 de marca: $3.12275 por dosis ($187.37 por 60 dosis).'
      ),
      costplus(
        47.55,
        '1 fluticasone-salmeterol 250/50 inhaler',
        '1 inhalador de fluticasona-salmeterol 250/50',
        'Cost Plus Drugs public API quote $47.55 for 1 unit of fluticasone-salmeterol 250 mcg-50 mcg (unit $37 + 15% + $5 pharmacist fee). Retrieved October 3, 2026.',
        'Cotización pública de Cost Plus Drugs $47.55 por 1 unidad de fluticasona-salmeterol 250/50. Consultado el 3 de octubre de 2026.'
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'GSK Patient Assistance',
        kind: 'pap',
        sponsor: 'GSK',
        summary: 'Free Advair or authorized generic for eligible patients.',
        summaryEs: 'Advair o genérico autorizado gratis para pacientes elegibles.',
        eligibility: 'Uninsured or Medicare Part D; income documentation required.',
        eligibilityEs: 'Sin seguro o Medicare Parte D; se requiere documentación de ingresos.',
        url: 'https://www.gskforyou.com/',
      },
      needyMeds,
      rxAssist,
    ],
  },
];

export function searchMedications(query: string): Medication[] {
  const q = query.trim().toLowerCase();
  if (!q) return medications;
  return medications.filter((med) => {
    const hay = [med.brand, med.generic, med.category, ...med.searchTerms]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}
