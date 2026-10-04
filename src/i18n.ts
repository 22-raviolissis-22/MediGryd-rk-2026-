import type { HoursId, Language, LocalizedText } from './types';

export function L(en: string, es: string, zh: string, hi: string): LocalizedText {
  return { en, es, zh, hi };
}

export function loc(text: LocalizedText, lang: Language): string {
  return text[lang] ?? text.en;
}

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
  pharmaciesTab: 'Prices & pharmacies',
  papsTab: 'PAPs & Free Medicine',
  apply: 'Open program',
  manufacturerPAP: 'Manufacturer PAP',
  nonprofit: 'Nonprofit / free medicine',
  resultsFor: 'Prices and programs for',
  insuredBanner: 'These are cash benchmarks — still check your insurance copay.',
  papHint:
    'Patient assistance programs (PAPs) and nonprofits can provide free or low-cost medicine if you qualify.',
  noPrograms: 'No listed programs for this medication.',
  priceDisclaimer:
    'In-store cash prices vary and should be confirmed at the pharmacy. The dollar amounts below are national or mail-order benchmarks (NADAC or Cost Plus Drugs list prices), not the price a specific store charges.',
  nearbyPharmacies: 'Pharmacies in CA-17 and CA-19',
  nearbyHint:
    'Addresses from official store locators. Call ahead — they do not list these benchmark prices as their cash charge.',
  openLocator: 'Open store locator',
  notListed: 'Not listed',
  retrievedOn: 'Data retrieved October 3, 2026',
  back: 'Back',
  nadacBenchmark: 'NADAC benchmark',
  costPlusList: 'Cost Plus Drugs list price',
  searchA11y: 'Search medications',
  startOver: 'Start over',
  hoursCvsLocator: 'See CVS store locator for pharmacy hours',
  hoursWalgreensLocator: 'See Walgreens store locator for pharmacy hours',
  hoursCostcoWarehouse: 'See Costco warehouse page for pharmacy hours',
  hoursWalgreens24:
    'Pharmacy open 24 hours; closes 1:30–2:00am for meal break (Walgreens locator)',
  hoursCostcoGilroy: 'Mon-Fri 9:00am-7:00pm; Sat 9:00am-6:00pm; Sun closed (Costco warehouse page)',
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
  pharmaciesTab: 'Precios y farmacias',
  papsTab: 'PAPs y medicina gratis',
  apply: 'Abrir programa',
  manufacturerPAP: 'PAP del fabricante',
  nonprofit: 'Organización sin fines de lucro',
  resultsFor: 'Precios y programas para',
  insuredBanner: 'Estas son referencias en efectivo — revisa también tu copago.',
  papHint:
    'Los programas de asistencia al paciente (PAP) y las organizaciones sin fines de lucro pueden ofrecer medicina gratis o de bajo costo si calificas.',
  noPrograms: 'No hay programas listados para este medicamento.',
  priceDisclaimer:
    'Los precios en efectivo en la farmacia varían y se deben confirmar en el mostrador. Las cifras de abajo son referencias nacionales o de pedido por correo (NADAC o precio de lista de Cost Plus Drugs), no lo que cobra una tienda específica.',
  nearbyPharmacies: 'Farmacias en CA-17 y CA-19',
  nearbyHint:
    'Direcciones de localizadores oficiales. Llama antes: estas farmacias no publican estos precios de referencia como su cobro en efectivo.',
  openLocator: 'Abrir localizador',
  notListed: 'No listado',
  retrievedOn: 'Datos consultados el 3 de octubre de 2026',
  back: 'Atrás',
  nadacBenchmark: 'Referencia NADAC',
  costPlusList: 'Precio de lista de Cost Plus Drugs',
  searchA11y: 'Buscar medicamentos',
  startOver: 'Empezar de nuevo',
  hoursCvsLocator: 'Consulta el localizador de CVS para el horario de la farmacia',
  hoursWalgreensLocator: 'Consulta el localizador de Walgreens para el horario de la farmacia',
  hoursCostcoWarehouse: 'Consulta la página del almacén Costco para el horario de la farmacia',
  hoursWalgreens24:
    'Farmacia abierta 24 horas; cierra 1:30–2:00 a. m. para el descanso (localizador de Walgreens)',
  hoursCostcoGilroy:
    'Lun-vie 9:00 a. m.-7:00 p. m.; sáb 9:00 a. m.-6:00 p. m.; dom cerrado (página del almacén Costco)',
};

const zh: typeof en = {
  appName: 'APP NAME',
  insuranceQ: '您目前是否有医疗保险？',
  yes: '有',
  no: '没有',
  insuredTitle: '保险核验须知',
  insuredLead: '您当前的健康保险计划可能承担部分或全部处方药费用。',
  insuredBefore: '在自费支付之前：',
  insuredStep1: '查看保险卡或致电计划的会员服务。',
  insuredStep2: '确认处方药在药品目录中的层级、免赔额和共付额。',
  insuredStep3: '询问您的计划是否要求指定零售药房或邮寄药房。',
  continueCompare: '继续比较药品价格',
  householdQ: '您的家庭有几口人？',
  person1: '1 人',
  person2: '2 人',
  person3: '3 人',
  person4: '4 人',
  person5: '5 人及以上',
  incomeQ: '您家庭预计的年总收入是多少？',
  mediCalTitle: '您可能符合 Medi-Cal 资格！',
  mediCalBody:
    '根据您的家庭人数和预估收入，您很可能符合加州医疗补助计划 Medi-Cal 的资格。Medi-Cal 提供免费或低费用的健康保障，包括处方药、门诊和预防保健',
  enrollCovered: '在 Covered California 在线申请：https://www.coveredca.com/',
  enrollBenefits: '通过 BenefitsCal 申请：https://benefitscal.com/',
  coverCaliTitle: '您可能符合 Covered California 补贴资格！',
  coverCaliBody:
    '根据您的家庭人数和预估收入，您很可能有资格获得经济援助（保费税收抵免），以降低每月健康保险费用。',
  enrollCoveredShort: '在线申请：https://www.coveredca.com/',
  overTitle: '标准保险选项',
  overBody:
    '根据此项估算，您很可能超过 Medi-Cal 和补贴的收入上限。您仍可以按无补贴费率购买 Covered California 计划，并使用药房自费价格和援助项目来支付处方药。',
  enrollMarket: '在线申请：https://www.coveredca.com/',
  searchEmpty: '开始输入，或从下方常见处方中选择。',
  noMatches: '没有匹配的药品。请尝试通用名。',
  commonRx: '常见处方药',
  pharmaciesTab: '价格与药房',
  papsTab: '患者援助与免费药品',
  apply: '打开项目',
  manufacturerPAP: '制药商患者援助计划',
  nonprofit: '非营利 / 免费药品',
  resultsFor: '价格与援助项目：',
  insuredBanner: '以下为自费参考价 — 请仍核对您的保险共付额。',
  papHint: '患者援助计划（PAP）和非营利组织可在您符合条件时提供免费或低价药品。',
  noPrograms: '此药品暂无列出的援助项目。',
  priceDisclaimer:
    '店内自费价格因药房而异，请到店确认。下列金额为全国或邮购参考价（NADAC 或 Cost Plus Drugs 标价），并非某家门店的收费。',
  nearbyPharmacies: 'CA-17 与 CA-19 的药房',
  nearbyHint: '地址来自官方门店查询。请提前致电 — 门店不会将这些参考价作为自费售价公布。',
  openLocator: '打开门店查询',
  notListed: '未列出',
  retrievedOn: '数据获取于 2026 年 10 月 3 日',
  back: '返回',
  nadacBenchmark: 'NADAC 参考价',
  costPlusList: 'Cost Plus Drugs 标价',
  searchA11y: '搜索药品',
  startOver: '重新开始',
  hoursCvsLocator: '请在 CVS 门店查询中查看药房营业时间',
  hoursWalgreensLocator: '请在 Walgreens 门店查询中查看药房营业时间',
  hoursCostcoWarehouse: '请在 Costco 仓储门店页面查看药房营业时间',
  hoursWalgreens24: '药房 24 小时营业；凌晨 1:30–2:00 休息（Walgreens 查询）',
  hoursCostcoGilroy: '周一至周五 9:00–19:00；周六 9:00–18:00；周日休息（Costco 仓储页面）',
};

const hi: typeof en = {
  appName: 'APP NAME',
  insuranceQ: 'क्या आपके पास अभी स्वास्थ्य बीमा है?',
  yes: 'हाँ',
  no: 'नहीं',
  insuredTitle: 'बीमा सत्यापन सूचना',
  insuredLead: 'आपकी वर्तमान स्वास्थ्य योजना पर्चे की आंशिक या पूरी लागत कवर कर सकती है।',
  insuredBefore: 'जेब से भुगतान करने से पहले:',
  insuredStep1: 'अपना बीमा कार्ड देखें या योजना की सदस्य सेवा को कॉल करें।',
  insuredStep2: 'पर्चे की फॉर्मुलरी श्रेणी, डिडक्टिबल और सह-भुगतान राशि की पुष्टि करें।',
  insuredStep3: 'पूछें कि क्या आपकी योजना पसंदीदा खुदरा या मेल-ऑर्डर फार्मेसी मांगती है।',
  continueCompare: 'दवा की कीमत तुलना जारी रखें',
  householdQ: 'आपके घर में परिवार के कितने सदस्य हैं?',
  person1: '1 व्यक्ति',
  person2: '2 लोग',
  person3: '3 लोग',
  person4: '4 लोग',
  person5: '5+ लोग',
  incomeQ: 'आपके घर की अनुमानित कुल वार्षिक आय कितनी है?',
  mediCalTitle: 'आप Medi-Cal के लिए पात्र हो सकते हैं!',
  mediCalBody:
    'आपके परिवार के आकार और अनुमानित आय के आधार पर, आप कैलिफोर्निया के मेडिकेड कार्यक्रम Medi-Cal के लिए योग्य हो सकते हैं। Medi-Cal शून्य या कम लागत वाला स्वास्थ्य कवरेज देता है, जिसमें पर्चे की दवाएं, डॉक्टर विजिट और निवारक देखभाल शामिल हैं',
  enrollCovered: 'Covered California पर ऑनलाइन आवेदन करें: https://www.coveredca.com/',
  enrollBenefits: 'BenefitsCal के माध्यम से आवेदन करें: https://benefitscal.com/',
  coverCaliTitle: 'आप Covered California सब्सिडी के लिए योग्य हो सकते हैं!',
  coverCaliBody:
    'आपके परिवार के आकार और अनुमानित आय के आधार पर, आप मासिक स्वास्थ्य बीमा लागत घटाने के लिए वित्तीय सहायता (प्रीमियम टैक्स क्रेडिट) के पात्र हो सकते हैं।',
  enrollCoveredShort: 'ऑनलाइन आवेदन करें: https://www.coveredca.com/',
  overTitle: 'मानक कवरेज विकल्प',
  overBody:
    'इस अनुमान के अनुसार, आप Medi-Cal और सब्सिडी आय सीमा से ऊपर हो सकते हैं। आप फिर भी बिना सब्सिडी वाले दर पर Covered California योजना खरीद सकते हैं, और पर्चे के लिए नकद फार्मेसी कीमतों व सहायता कार्यक्रमों का उपयोग कर सकते हैं।',
  enrollMarket: 'ऑनलाइन आवेदन करें: https://www.coveredca.com/',
  searchEmpty: 'टाइप करना शुरू करें या नीचे से एक आम पर्चे वाली दवा चुनें।',
  noMatches: 'कोई दवा मेल नहीं खाती। जेनेरिक नाम आज़माएँ।',
  commonRx: 'आम पर्चे की दवाएं',
  pharmaciesTab: 'कीमतें और फार्मेसी',
  papsTab: 'PAP और मुफ्त दवा',
  apply: 'कार्यक्रम खोलें',
  manufacturerPAP: 'निर्माता PAP',
  nonprofit: 'गैर-लाभ / मुफ्त दवा',
  resultsFor: 'कीमतें और कार्यक्रम:',
  insuredBanner: 'ये नकद संदर्भ कीमतें हैं — फिर भी अपना बीमा सह-भुगतान जाँचें।',
  papHint:
    'रोगी सहायता कार्यक्रम (PAP) और गैर-लाभ संगठन पात्र होने पर मुफ्त या सस्ती दवा दे सकते हैं।',
  noPrograms: 'इस दवा के लिए कोई सूचीबद्ध कार्यक्रम नहीं है।',
  priceDisclaimer:
    'स्टोर की नकद कीमतें अलग-अलग होती हैं और फार्मेसी पर पुष्टि करनी चाहिए। नीचे की राशियाँ राष्ट्रीय या मेल-ऑर्डर संदर्भ हैं (NADAC या Cost Plus Drugs सूची कीमत), किसी खास स्टोर का शुल्क नहीं।',
  nearbyPharmacies: 'CA-17 और CA-19 की फार्मेसी',
  nearbyHint:
    'पते आधिकारिक स्टोर लोकेटर से हैं। पहले कॉल करें — ये स्टोर इन संदर्भ कीमतों को अपनी नकद कीमत के रूप में नहीं दिखाते।',
  openLocator: 'स्टोर लोकेटर खोलें',
  notListed: 'सूची में नहीं',
  retrievedOn: 'डेटा 3 अक्टूबर 2026 को लिया गया',
  back: 'वापस',
  nadacBenchmark: 'NADAC संदर्भ',
  costPlusList: 'Cost Plus Drugs सूची कीमत',
  searchA11y: 'दवाएं खोजें',
  startOver: 'फिर से शुरू करें',
  hoursCvsLocator: 'फार्मेसी समय के लिए CVS स्टोर लोकेटर देखें',
  hoursWalgreensLocator: 'फार्मेसी समय के लिए Walgreens स्टोर लोकेटर देखें',
  hoursCostcoWarehouse: 'फार्मेसी समय के लिए Costco वेयरहाउस पेज देखें',
  hoursWalgreens24: 'फार्मेसी 24 घंटे खुली; भोजन विराम के लिए 1:30–2:00 बजे बंद (Walgreens लोकेटर)',
  hoursCostcoGilroy: 'सोम-शुक्र 9:00–19:00; शनि 9:00–18:00; रवि बंद (Costco वेयरहाउस पेज)',
};

export const copy = { en, es, zh, hi };

export function t(lang: Language) {
  return copy[lang];
}

const hoursKey: Record<HoursId, keyof typeof en> = {
  cvsLocator: 'hoursCvsLocator',
  walgreensLocator: 'hoursWalgreensLocator',
  costcoWarehouse: 'hoursCostcoWarehouse',
  walgreens24: 'hoursWalgreens24',
  costcoGilroy: 'hoursCostcoGilroy',
};

export function pharmacyHours(lang: Language, hoursId: HoursId): string {
  return t(lang)[hoursKey[hoursId]];
}
