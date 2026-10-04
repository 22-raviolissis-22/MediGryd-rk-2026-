import type { HoursId, Language, LocalizedText } from './types';

export function L(en: string, es: string, zh: string, hi: string): LocalizedText {
  return { en, es, zh, hi };
}

export function loc(text: LocalizedText, lang: Language): string {
  return text[lang] ?? text.en;
}

export function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '');
}

const months: Record<Language, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  zh: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
};

export function formatIsoDate(iso: string, lang: Language): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const year = m[1];
  const month = Number(m[2]);
  const day = Number(m[3]);
  const name = months[lang][month - 1] ?? m[2];
  if (lang === 'zh') return `${year}年${month}月${day}日`;
  if (lang === 'es') return `${day} de ${name} de ${year}`;
  if (lang === 'hi') return `${day} ${name} ${year}`;
  return `${name} ${day}, ${year}`;
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
    'In-store cash prices vary and should be confirmed at the pharmacy. Cost Plus is a mail-order checkout price (shipping extra). GoodRx coupon amounts are set on GoodRx by pharmacy and ZIP — we do not invent a coupon dollar figure. NADAC is not a price you can buy at. None of these figures is a specific store’s cash charge.',
  nearbyPharmacies: 'Pharmacies in CA-17 and CA-19',
  nearbyHint:
    'Addresses from official store locators. Call ahead — they do not list these benchmark prices as their cash charge.',
  openLocator: 'Open store locator',
  notListed: 'Not listed',
  retrievedOn: 'Data retrieved October 3, 2026',
  back: 'Back',
  nadacBenchmark:
    'Fair-price reference (what pharmacies pay wholesalers — not a price you can buy at)',
  costPlusList: 'Cost Plus Drugs — buy now',
  lowestToday: 'Lowest prices you can get today',
  buyCostPlus: 'Buy at Cost Plus Drugs',
  openGoodRx: 'Open GoodRx coupon',
  goodRxCoupon: 'GoodRx coupon',
  goodRxHint:
    'Show this coupon at a participating pharmacy. The dollar amount is on GoodRx and changes by store — we do not invent one here.',
  costPlusHint: 'Mail-order checkout on costplusdrugs.com. Prescription required; shipping and tax are extra.',
  nadacNotBuyable:
    'NADAC is the average amount pharmacies pay wholesalers. You cannot check out at this number.',
  pricesUpdatedAsOf: 'Prices updated as of {date}',
  costPlusAsOf: 'Cost Plus snapshot {date}',
  searchA11y: 'Search medications',
  startOver: 'Start over',
  hoursCvsLocator: 'See CVS store locator for pharmacy hours',
  hoursWalgreensLocator: 'See Walgreens store locator for pharmacy hours',
  hoursCostcoWarehouse: 'See Costco warehouse page for pharmacy hours',
  hoursWalgreens24:
    'Pharmacy open 24 hours; closes 1:30–2:00am for meal break (Walgreens locator)',
  hoursCostcoGilroy: 'Mon-Fri 9:00am-7:00pm; Sat 9:00am-6:00pm; Sun closed (Costco warehouse page)',
  papLikelyTitle: 'Programs you likely qualify for',
  papOtherTitle: 'Other programs worth checking',
  papDisclaimer:
    '“Likely qualifies” is a screening hint, not a decision. Every program makes its own determination — confirm eligibility with them before you rely on free or discounted medicine.',
  papRenewal:
    'PAP enrollments typically expire every 12 months. If you get free medicine, set a reminder to reapply before your term ends — renewal is not automatic.',
  papNoManufacturer:
    'We did not find a verified manufacturer patient assistance program that currently enrolls new patients for this medicine. Generic versions often have no brand PAP. Do not assume a program exists.',
  papNoProgramsAtAll:
    'No verified manufacturer PAP or nonprofit mail-order listing for this medicine. Check cash prices on the Prices tab, or search RxAssist and NeedyMeds yourself in case a new program opens.',
  papUserSituation: 'Your answers: household of {size} · income {income} · {insured}',
  papCutoffVsYou: 'Program cutoff: {pct}% FPL (about {amount}/year for a household of {size})',
  papUnpublishedCutoff: 'Income limit is not published as a public FPL % —',
  papNoLimitCutoff: 'No income cutoff.',
  papIncomeSkipped: 'income not collected (insured path)',
  papHouseholdSkipped: 'size not collected',
  papYouInsured: 'have health insurance',
  papYouUninsured: 'do not have health insurance',
  papDocuments: 'What to send',
  papSend: 'Where to send',
  papCall: 'Phone',
  papScript: 'What to say when you call',
  papOpenApply: 'Open application page',
  papClosed: 'Closed to new patients',
  papCovers: 'Covers',
  papEmptyLikely:
    'Nothing in this list is a clear match for your screener answers. Programs below may still be worth a call — they are not guaranteed.',
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
    'Los precios en efectivo en la farmacia varían y se deben confirmar en el mostrador. Cost Plus es un precio de pedido por correo (envío aparte). El cupón de GoodRx muestra el monto en su sitio según farmacia y ZIP — no inventamos esa cifra. NADAC no es un precio de compra. Ninguna cifra es el cobro en efectivo de una tienda específica.',
  nearbyPharmacies: 'Farmacias en CA-17 y CA-19',
  nearbyHint:
    'Direcciones de localizadores oficiales. Llama antes: estas farmacias no publican estos precios de referencia como su cobro en efectivo.',
  openLocator: 'Abrir localizador',
  notListed: 'No listado',
  retrievedOn: 'Datos consultados el 3 de octubre de 2026',
  back: 'Atrás',
  nadacBenchmark:
    'Referencia de precio justo (lo que las farmacias pagan a mayoristas — no es un precio al que puedas comprar)',
  costPlusList: 'Cost Plus Drugs — comprar ahora',
  lowestToday: 'Los precios más bajos que puedes obtener hoy',
  buyCostPlus: 'Comprar en Cost Plus Drugs',
  openGoodRx: 'Abrir cupón de GoodRx',
  goodRxCoupon: 'Cupón de GoodRx',
  goodRxHint:
    'Muestra este cupón en una farmacia participante. El monto está en GoodRx y cambia por tienda — no inventamos uno aquí.',
  costPlusHint: 'Pedido por correo en costplusdrugs.com. Se requiere receta; envío e impuestos aparte.',
  nadacNotBuyable:
    'NADAC es el promedio que las farmacias pagan a mayoristas. No puedes pagar esa cifra en caja.',
  pricesUpdatedAsOf: 'Precios actualizados al {date}',
  costPlusAsOf: 'Instantánea de Cost Plus del {date}',
  searchA11y: 'Buscar medicamentos',
  startOver: 'Empezar de nuevo',
  hoursCvsLocator: 'Consulta el localizador de CVS para el horario de la farmacia',
  hoursWalgreensLocator: 'Consulta el localizador de Walgreens para el horario de la farmacia',
  hoursCostcoWarehouse: 'Consulta la página del almacén Costco para el horario de la farmacia',
  hoursWalgreens24:
    'Farmacia abierta 24 horas; cierra 1:30–2:00 a. m. para el descanso (localizador de Walgreens)',
  hoursCostcoGilroy:
    'Lun-vie 9:00 a. m.-7:00 p. m.; sáb 9:00 a. m.-6:00 p. m.; dom cerrado (página del almacén Costco)',
  papLikelyTitle: 'Programas para los que es probable que califiques',
  papOtherTitle: 'Otros programas que conviene revisar',
  papDisclaimer:
    '“Es probable que califiques” es una pista de filtro, no una decisión. Cada programa decide por su cuenta: confirma la elegibilidad con ellos antes de contar con medicina gratis o con descuento.',
  papRenewal:
    'Las inscripciones a PAP suelen vencer cada 12 meses. Si recibes medicina gratis, pon un recordatorio para volver a solicitar antes de que termine el período: la renovación no es automática.',
  papNoManufacturer:
    'No encontramos un programa de asistencia del fabricante verificado que ahora acepte pacientes nuevos para este medicamento. Las versiones genéricas a menudo no tienen PAP de marca. No asumas que existe un programa.',
  papNoProgramsAtAll:
    'No hay un PAP de fabricante verificado ni un listado de farmacia sin fines de lucro para este medicamento. Revisa precios en efectivo en la pestaña de Precios, o busca en RxAssist y NeedyMeds por si abre un programa nuevo.',
  papUserSituation: 'Tus respuestas: hogar de {size} · ingresos {income} · {insured}',
  papCutoffVsYou: 'Tope del programa: {pct}% del FPL (unos {amount}/año para un hogar de {size})',
  papUnpublishedCutoff: 'El límite de ingresos no se publica como % de FPL —',
  papNoLimitCutoff: 'Sin tope de ingresos.',
  papIncomeSkipped: 'ingresos no recopilados (ruta con seguro)',
  papHouseholdSkipped: 'tamaño no recopilado',
  papYouInsured: 'tengo seguro médico',
  papYouUninsured: 'no tengo seguro médico',
  papDocuments: 'Qué enviar',
  papSend: 'Dónde enviar',
  papCall: 'Teléfono',
  papScript: 'Qué decir al llamar',
  papOpenApply: 'Abrir página de solicitud',
  papClosed: 'Cerrado a pacientes nuevos',
  papCovers: 'Cubre',
  papEmptyLikely:
    'Nada de esta lista encaja con claridad con tus respuestas. Los programas de abajo aún pueden valer una llamada — no están garantizados.',
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
    '店内自费价格因药房而异，请到店确认。Cost Plus 为邮购结账价（运费另计）。GoodRx 优惠券金额在其网站按药房和邮编显示 — 我们不编造该数字。NADAC 不是可购买的价格。以上均不是某家门店的自费售价。',
  nearbyPharmacies: 'CA-17 与 CA-19 的药房',
  nearbyHint: '地址来自官方门店查询。请提前致电 — 门店不会将这些参考价作为自费售价公布。',
  openLocator: '打开门店查询',
  notListed: '未列出',
  retrievedOn: '数据获取于 2026 年 10 月 3 日',
  back: '返回',
  nadacBenchmark: '公平价格参考（药房向批发商支付的金额 — 不是您可以购买的价格）',
  costPlusList: 'Cost Plus Drugs — 立即购买',
  lowestToday: '今天就能买到的最低价',
  buyCostPlus: '在 Cost Plus Drugs 购买',
  openGoodRx: '打开 GoodRx 优惠券',
  goodRxCoupon: 'GoodRx 优惠券',
  goodRxHint: '在参与药房出示此优惠券。金额显示在 GoodRx 上，因门店而异 — 我们不在此编造数字。',
  costPlusHint: '在 costplusdrugs.com 邮购结账。需有处方；运费和税费另计。',
  nadacNotBuyable: 'NADAC 是药房向批发商支付的平均金额。您无法按此数字结账。',
  pricesUpdatedAsOf: '价格更新于 {date}',
  costPlusAsOf: 'Cost Plus 快照日期 {date}',
  searchA11y: '搜索药品',
  startOver: '重新开始',
  hoursCvsLocator: '请在 CVS 门店查询中查看药房营业时间',
  hoursWalgreensLocator: '请在 Walgreens 门店查询中查看药房营业时间',
  hoursCostcoWarehouse: '请在 Costco 仓储门店页面查看药房营业时间',
  hoursWalgreens24: '药房 24 小时营业；凌晨 1:30–2:00 休息（Walgreens 查询）',
  hoursCostcoGilroy: '周一至周五 9:00–19:00；周六 9:00–18:00；周日休息（Costco 仓储页面）',
  papLikelyTitle: '你可能符合的项目',
  papOtherTitle: '其他值得了解的项目',
  papDisclaimer:
    '“可能符合”只是筛选提示，不是决定。每个项目自行审核资格——在依赖免费或优惠药品之前，请向项目方确认。',
  papRenewal:
    '患者援助计划的登记通常每 12 个月到期。如果获得免费药品，请设置提醒在期限结束前重新申请——续期不会自动完成。',
  papNoManufacturer:
    '我们未找到目前接收该药品新患者的、已核实的制药商援助计划。仿制药往往没有原研 PAP。请不要假定存在这样的项目。',
  papNoProgramsAtAll:
    '该药品没有已核实的制药商 PAP，也没有非营利邮购目录。请在“价格”页查看自费价，或自行检索 RxAssist 与 NeedyMeds，以防新项目开放。',
  papUserSituation: '你的回答：家庭 {size} 人 · 收入 {income} · {insured}',
  papCutoffVsYou: '项目门槛：联邦贫困线的 {pct}%（{size} 人家庭约每年 {amount}）',
  papUnpublishedCutoff: '收入上限未以公开贫困线百分比公布 —',
  papNoLimitCutoff: '无收入门槛。',
  papIncomeSkipped: '未采集收入（有保险路径）',
  papHouseholdSkipped: '未采集家庭人数',
  papYouInsured: '有医疗保险',
  papYouUninsured: '没有医疗保险',
  papDocuments: '需要提交的材料',
  papSend: '提交方式',
  papCall: '电话',
  papScript: '打电话时可以说',
  papOpenApply: '打开申请页面',
  papClosed: '已停止接收新患者',
  papCovers: '覆盖药品',
  papEmptyLikely:
    '根据你的筛选答案，下面没有明确匹配的项目。仍可致电了解——不能保证合格。',
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
    'स्टोर की नकद कीमतें अलग-अलग होती हैं और फार्मेसी पर पुष्टि करनी चाहिए। Cost Plus मेल-ऑर्डर चेकआउट कीमत है (शिपिंग अलग)। GoodRx कूपन राशि उनकी साइट पर फार्मेसी और ZIP के अनुसार दिखती है — हम वह आंकड़ा नहीं बनाते। NADAC वह कीमत नहीं है जिस पर आप खरीद सकते हैं। इनमें से कोई भी किसी खास स्टोर का नकद शुल्क नहीं है।',
  nearbyPharmacies: 'CA-17 और CA-19 की फार्मेसी',
  nearbyHint:
    'पते आधिकारिक स्टोर लोकेटर से हैं। पहले कॉल करें — ये स्टोर इन संदर्भ कीमतों को अपनी नकद कीमत के रूप में नहीं दिखाते।',
  openLocator: 'स्टोर लोकेटर खोलें',
  notListed: 'सूची में नहीं',
  retrievedOn: 'डेटा 3 अक्टूबर 2026 को लिया गया',
  back: 'वापस',
  nadacBenchmark:
    'उचित-मूल्य संदर्भ (फार्मेसी थोक विक्रेताओं को क्या देती हैं — वह कीमत नहीं जिस पर आप खरीद सकते हैं)',
  costPlusList: 'Cost Plus Drugs — अभी खरीदें',
  lowestToday: 'सबसे कम कीमतें जो आप आज पा सकते हैं',
  buyCostPlus: 'Cost Plus Drugs पर खरीदें',
  openGoodRx: 'GoodRx कूपन खोलें',
  goodRxCoupon: 'GoodRx कूपन',
  goodRxHint:
    'सहभागी फार्मेसी पर यह कूपन दिखाएँ। राशि GoodRx पर है और स्टोर के अनुसार बदलती है — हम यहाँ कोई आंकड़ा नहीं बनाते।',
  costPlusHint: 'costplusdrugs.com पर मेल-ऑर्डर चेकआउट। पर्चा आवश्यक; शिपिंग और कर अलग।',
  nadacNotBuyable:
    'NADAC वह औसत राशि है जो फार्मेसी थोक विक्रेताओं को देती हैं। आप इस संख्या पर चेकआउट नहीं कर सकते।',
  pricesUpdatedAsOf: 'कीमतें {date} तक अपडेट',
  costPlusAsOf: 'Cost Plus स्नैपशॉट {date}',
  searchA11y: 'दवाएं खोजें',
  startOver: 'फिर से शुरू करें',
  hoursCvsLocator: 'फार्मेसी समय के लिए CVS स्टोर लोकेटर देखें',
  hoursWalgreensLocator: 'फार्मेसी समय के लिए Walgreens स्टोर लोकेटर देखें',
  hoursCostcoWarehouse: 'फार्मेसी समय के लिए Costco वेयरहाउस पेज देखें',
  hoursWalgreens24: 'फार्मेसी 24 घंटे खुली; भोजन विराम के लिए 1:30–2:00 बजे बंद (Walgreens लोकेटर)',
  hoursCostcoGilroy: 'सोम-शुक्र 9:00–19:00; शनि 9:00–18:00; रवि बंद (Costco वेयरहाउस पेज)',
  papLikelyTitle: 'कार्यक्रम जिनके लिए आप संभवतः पात्र हैं',
  papOtherTitle: 'अन्य कार्यक्रम जिन्हें जाँचना चाहिए',
  papDisclaimer:
    '“संभवतः पात्र” केवल स्क्रीनिंग संकेत है, निर्णय नहीं। हर कार्यक्रम खुद पात्रता तय करता है — मुफ्त या छूट वाली दवा पर भरोसा करने से पहले उनसे पुष्टि करें।',
  papRenewal:
    'PAP नामांकन आमतौर पर हर 12 महीने में समाप्त होता है। यदि मुफ्त दवा मिलती है, अवधि खत्म होने से पहले फिर आवेदन करने का रिमाइंडर सेट करें — नवीकरण अपने आप नहीं होता।',
  papNoManufacturer:
    'इस दवा के लिए कोई सत्यापित निर्माता रोगी सहायता कार्यक्रम नहीं मिला जो अभी नए रोगियों को नामांकित करता हो। जेनेरिक संस्करणों का अक्सर ब्रांड PAP नहीं होता। यह न मानें कि कार्यक्रम मौजूद है।',
  papNoProgramsAtAll:
    'इस दवा के लिए कोई सत्यापित निर्माता PAP या गैर-लाभ मेल-ऑर्डर सूची नहीं है। कीमत टैब पर नकद कीमत देखें, या RxAssist और NeedyMeds स्वयं खोजें यदि कोई नया कार्यक्रम खुले।',
  papUserSituation: 'आपके उत्तर: घर में {size} · आय {income} · {insured}',
  papCutoffVsYou: 'कार्यक्रम की कटौती: {pct}% FPL ({size} लोगों के घर के लिए लगभग {amount}/वर्ष)',
  papUnpublishedCutoff: 'आय सीमा सार्वजनिक FPL % के रूप में प्रकाशित नहीं है —',
  papNoLimitCutoff: 'कोई आय कटौती नहीं।',
  papIncomeSkipped: 'आय नहीं ली गई (बीमा वाला रास्ता)',
  papHouseholdSkipped: 'घर का आकार नहीं लिया गया',
  papYouInsured: 'स्वास्थ्य बीमा है',
  papYouUninsured: 'स्वास्थ्य बीमा नहीं है',
  papDocuments: 'क्या भेजना है',
  papSend: 'कहाँ भेजें',
  papCall: 'फ़ोन',
  papScript: 'कॉल पर क्या कहें',
  papOpenApply: 'आवेदन पृष्ठ खोलें',
  papClosed: 'नए रोगियों के लिए बंद',
  papCovers: 'कवर करता है',
  papEmptyLikely:
    'आपके स्क्रीनर उत्तरों से इस सूची में कोई स्पष्ट मेल नहीं है। नीचे के कार्यक्रम फिर भी कॉल के लायक हो सकते हैं — गारंटी नहीं।',
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
