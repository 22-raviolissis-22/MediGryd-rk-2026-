import type { Language } from './types';

const en = {
  appName: 'APP NAME',
  insuranceQ: 'Do you currently have health insurance?',
  yes: 'YES',
  no: 'NO',
  insuredTitle: 'INSURANCE VERIFICATION NOTICE',
  insuredLead:
    'Your current health plan may cover a portion or the full cost of your prescription.',
  insuredBefore: 'Before paying out-of-pocket:',
  insuredStep1: 'Check your insurance card or call your plan’s member services.',
  insuredStep2: 'Verify your prescription formulary tier, deductible, and co-pay amount.',
  insuredStep3: 'Ask if your plan requires a preferred retail or mail-order pharmacy.',
  continueCompare: 'CONTINUE TO MEDICATION PRICE COMPARISON',
  householdQ: 'How many family members are in your household?',
  person1: '1 person',
  person2: '2 people',
  person3: '3 people',
  person4: '4 people',
  person5: '5+ people',
  incomeQ: 'What is your estimated total annual household income?',
  mediCalTitle: 'YOU MAY BE ELIGIBLE FOR MEDI-CAL!',
  mediCalBody:
    'Based on your household size and estimated income, you likely qualify for Medi-Cal, California’s Medicaid program. Medi-Cal provides zero-cost or low-cost health coverage, including prescription drugs, doctor visits, and preventative care',
  enrollCovered: 'Apply Online at Covered California: https://www.coveredca.com/',
  enrollBenefits: 'Apply via BenefitsCal: https://benefitscal.com/',
  coverCaliTitle: 'YOU MAY QUALIFY FOR COVERED CALIFORNIA SUBSIDIES!',
  coverCaliBody:
    'Based on your household size and estimated income, you are likely eligible for financial assistance (premium tax credits) to lower your monthly health insurance costs.',
  enrollCoveredShort: 'Apply Online: https://www.coveredca.com/',
  overTitle: 'STANDARD COVERAGE OPTIONS',
  overBody:
    'Based on this estimate, you are likely over the Medi-Cal and subsidy income limits. You can still buy a Covered California plan at the unsubsidized rate, and you can use cash pharmacy prices and assistance programs for prescriptions.',
  enrollMarket: 'Apply Online: https://www.coveredca.com/',
  searchEmpty: 'Start typing or pick a common prescription below.',
  noMatches: 'No medications match that search. Try the generic name.',
  commonRx: 'Common prescriptions',
  pharmaciesTab: 'Local Pharmacy Prices',
  papsTab: 'PAPs & Free Medicine',
  cashPrice: 'Cash / discount price',
  miles: 'mi',
  apply: 'Open program',
  manufacturerPAP: 'Manufacturer PAP',
  nonprofit: 'Nonprofit / free medicine',
  resultsFor: 'Prices and programs for',
  insuredBanner: 'Comparing cash prices — still check your insurance copay.',
  papHint:
    'Patient assistance programs (PAPs) and nonprofits can provide free or low-cost medicine if you qualify.',
  noPrograms: 'No listed programs for this medication.',
  couponNote: 'Show the pharmacy this cash price or a discount card at pickup.',
};

const es: typeof en = {
  appName: 'APP NAME',
  insuranceQ: '¿Tienes actualmente un seguro médico?',
  yes: 'SÍ',
  no: 'NO',
  insuredTitle: 'AVISO DE VERIFICACIÓN DE SEGURO',
  insuredLead:
    'Tu plan de salud actual puede cubrir una parte o el costo total de tu receta.',
  insuredBefore: 'Antes de pagar de tu bolsillo:',
  insuredStep1: 'Revisa tu tarjeta de seguro o llama a servicios para miembros de tu plan.',
  insuredStep2: 'Verifica el nivel del formulario, el deducible y el copago.',
  insuredStep3: 'Pregunta si tu plan exige una farmacia preferida o por correo.',
  continueCompare: 'CONTINUAR A COMPARAR PRECIOS DE MEDICAMENTOS',
  householdQ: '¿Cuántos miembros de la familia viven en tu hogar?',
  person1: '1 persona',
  person2: '2 personas',
  person3: '3 personas',
  person4: '4 personas',
  person5: '5+ personas',
  incomeQ: '¿Cuál es el ingreso anual total estimado de tu hogar?',
  mediCalTitle: '¡ES POSIBLE QUE CALIFIQUES PARA MEDI-CAL!',
  mediCalBody:
    'Según el tamaño de tu hogar y el ingreso estimado, es probable que califiques para Medi-Cal, el programa Medicaid de California. Medi-Cal ofrece cobertura de bajo o ningún costo, incluyendo recetas, visitas médicas y atención preventiva',
  enrollCovered: 'Solicita en Covered California: https://www.coveredca.com/',
  enrollBenefits: 'Solicita en BenefitsCal: https://benefitscal.com/',
  coverCaliTitle: '¡ES POSIBLE QUE CALIFIQUES PARA SUBSIDIOS DE COVERED CALIFORNIA!',
  coverCaliBody:
    'Según el tamaño de tu hogar y el ingreso estimado, es probable que seas elegible para ayuda económica (créditos fiscales de prima) para bajar el costo mensual de tu seguro.',
  enrollCoveredShort: 'Solicita en línea: https://www.coveredca.com/',
  overTitle: 'OPCIONES DE COBERTURA ESTÁNDAR',
  overBody:
    'Según esta estimación, es probable que superes los límites de Medi-Cal y de subsidios. Aún puedes comprar un plan de Covered California al precio sin subsidio, y usar precios en efectivo y programas de asistencia para recetas.',
  enrollMarket: 'Solicita en línea: https://www.coveredca.com/',
  searchEmpty: 'Empieza a escribir o elige una receta frecuente.',
  noMatches: 'No hay coincidencias. Prueba el nombre genérico.',
  commonRx: 'Recetas frecuentes',
  pharmaciesTab: 'Precios de farmacias locales',
  papsTab: 'PAPs y medicina gratis',
  cashPrice: 'Precio en efectivo / descuento',
  miles: 'mi',
  apply: 'Abrir programa',
  manufacturerPAP: 'PAP del fabricante',
  nonprofit: 'Organización sin fines de lucro',
  resultsFor: 'Precios y programas para',
  insuredBanner: 'Comparando precios en efectivo — revisa también tu copago.',
  papHint:
    'Los programas de asistencia al paciente (PAP) y las organizaciones sin fines de lucro pueden ofrecer medicina gratis o de bajo costo si calificas.',
  noPrograms: 'No hay programas listados para este medicamento.',
  couponNote: 'Muestra este precio en efectivo o una tarjeta de descuento al recoger.',
};

export const copy = { en, es };

export function t(lang: Language) {
  return copy[lang];
}
