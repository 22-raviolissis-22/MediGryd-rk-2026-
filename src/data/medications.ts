import type { AssistanceProgram, LocalizedText, Medication, PriceBenchmark } from '../types';
import { L } from '../i18n';
import { areaPharmacies } from './pharmacies';

/** Retrieval date for NADAC and Cost Plus snapshots used below. */
/** Human-readable Cost Plus snapshot day (mail-order quotes, not auto-updated). */
export const PRICE_RETRIEVED_ON = 'October 3, 2026';
export const COST_PLUS_AS_OF = '2026-10-03';
export const NADAC_AS_OF = '2026-09-30';
export const NADAC_EFFECTIVE = '2026-09-23';

const needyMeds: AssistanceProgram = {
  name: 'NeedyMeds',
  kind: 'nonprofit',
  sponsor: 'NeedyMeds',
  summary: L(
    'Directory of PAPs, discount cards, and clinics that help pay for prescriptions.',
    'Directorio de PAPs, tarjetas de descuento y clínicas que ayudan a pagar recetas.',
    '患者援助计划、折扣卡和诊所目录，帮助支付处方药费用。',
    'PAP, छूट कार्ड और क्लिनिक निर्देशिका जो पर्चे की दवाओं का भुगतान करने में मदद करती है।'
  ),
  eligibility: L(
    'Open to anyone looking for assistance; programs have their own rules.',
    'Abierto a cualquiera que busque ayuda; cada programa tiene sus propias reglas.',
    '任何寻求帮助的人都可以查阅；各项目有各自的规则。',
    'सहायता चाहने वाला कोई भी देख सकता है; प्रत्येक कार्यक्रम के अपने नियम हैं।'
  ),
  url: 'https://www.needymeds.org/',
};

const rxAssist: AssistanceProgram = {
  name: 'RxAssist',
  kind: 'nonprofit',
  sponsor: 'RxAssist',
  summary: L(
    'Independent guide to manufacturer patient assistance programs.',
    'Guía independiente de programas de asistencia al paciente de los fabricantes.',
    '制药商患者援助计划的独立指南。',
    'निर्माता रोगी सहायता कार्यक्रमों की स्वतंत्र मार्गदर्शिका।'
  ),
  eligibility: L(
    'Varies by manufacturer; often uninsured or underinsured with income limits.',
    'Varía según el fabricante; a menudo sin seguro o con seguro insuficiente e ingresos limitados.',
    '因制药商而异；通常面向无保险或保险不足且有收入限制的患者。',
    'निर्माता के अनुसार अलग; अक्सर बिना बीमा या अपर्याप्त बीमा और आय सीमा के साथ।'
  ),
  url: 'https://www.rxassist.org/',
};

const goodDays: AssistanceProgram = {
  name: 'Good Days',
  kind: 'nonprofit',
  sponsor: 'Good Days',
  summary: L(
    'Helps insured patients cover copays for high-cost specialty medicines.',
    'Ayuda a pacientes con seguro a cubrir copagos de medicamentos especializados de alto costo.',
    '帮助有保险的患者支付高价专科药品的共付额。',
    'बीमा वाले रोगियों को महंगी विशेषज्ञ दवाओं का सह-भुगतान कवर करने में मदद करता है।'
  ),
  eligibility: L(
    'Usually commercially insured; disease-specific funds open and close.',
    'Por lo general con seguro comercial; los fondos por enfermedad abren y cierran.',
    '通常面向商业保险患者；按病种设立的基金不定期开放和关闭。',
    'आमतौर पर व्यावसायिक बीमा; रोग-विशिष्ट फंड खुलते और बंद होते रहते हैं।'
  ),
  url: 'https://www.mygooddays.org/',
};

const pan: AssistanceProgram = {
  name: 'PAN Foundation',
  kind: 'nonprofit',
  sponsor: 'Patient Access Network Foundation',
  summary: L(
    'Copay assistance grants for people with insurance who cannot afford out-of-pocket costs.',
    'Becas para copagos para personas con seguro que no pueden pagar los costos de bolsillo.',
    '为有保险但无力承担自付费用的人提供共付额补助。',
    'बीमा वाले उन लोगों के लिए सह-भुगतान अनुदान जो जेब का खर्च वहन नहीं कर सकते।'
  ),
  eligibility: L(
    'Must have insurance; income and diagnosis must match an open fund.',
    'Debes tener seguro; ingresos y diagnóstico deben coincidir con un fondo abierto.',
    '须有保险；收入和诊断须符合当前开放的基金。',
    'बीमा होना चाहिए; आय और निदान किसी खुले फंड से मेल खाने चाहिए।'
  ),
  url: 'https://www.panfoundation.org/',
};

function nadac(price: number, pkg: LocalizedText, note: LocalizedText): PriceBenchmark {
  return { source: 'nadac', price, package: pkg, note };
}

function costplus(price: number | null, pkg: LocalizedText, note: LocalizedText): PriceBenchmark {
  return { source: 'costplus', price, package: pkg, note };
}

const notOnCostPlus = L(
  'Not listed in the Cost Plus Drugs public catalog on October 3, 2026. Cost Plus list prices use acquisition + 15% markup + pharmacist fee when a product is sold.',
  'No aparece en el catálogo público de Cost Plus Drugs el 3 de octubre de 2026. Los precios de lista de Cost Plus usan costo de adquisición + 15% + tarifa de farmacéutico cuando venden el producto.',
  '2026 年 10 月 3 日未出现在 Cost Plus Drugs 公开目录中。Cost Plus 标价在售卖时为采购成本 + 15% 加价 + 药师费。',
  '3 अक्टूबर 2026 को Cost Plus Drugs सार्वजनिक कैटलॉग में सूचीबद्ध नहीं। बिकने पर Cost Plus सूची कीमत अधिग्रहण + 15% मार्कअप + फार्मासिस्ट शुल्क का उपयोग करती है।'
);

const notListedPkg = L('Not listed', 'No listado', '未列出', 'सूची में नहीं');

const tabs30x20 = L('30 × 20 mg tablets', '30 tabletas de 20 mg', '30 × 20 毫克片剂', '30 × 20 मिग्रा गोलियाँ');
const tabs60x500 = L('60 × 500 mg tablets', '60 tabletas de 500 mg', '60 × 500 毫克片剂', '60 × 500 मिग्रा गोलियाँ');
const tabs30x10 = L('30 × 10 mg tablets', '30 tabletas de 10 mg', '30 × 10 毫克片剂', '30 × 10 मिग्रा गोलियाँ');
const caps30x20dr = L(
  '30 × 20 mg DR capsules',
  '30 cápsulas DR de 20 mg',
  '30 × 20 毫克缓释胶囊',
  '30 × 20 मिग्रा DR कैप्सूल'
);
const tabs30x50 = L('30 × 50 mg tablets', '30 tabletas de 50 mg', '30 × 50 毫克片剂', '30 × 50 मिग्रा गोलियाँ');
const caps30x500 = L('30 × 500 mg capsules', '30 cápsulas de 500 mg', '30 × 500 毫克胶囊', '30 × 500 मिग्रा कैप्सूल');

export const medications: Medication[] = [
  {
    id: 'atorvastatin',
    brand: 'Lipitor',
    generic: 'atorvastatin',
    form: L(
      '20 mg tablet, 30-day supply',
      'tableta 20 mg, suministro de 30 días',
      '20 毫克片剂，30 天用量',
      '20 मिग्रा गोली, 30-दिन की आपूर्ति'
    ),
    category: L('Cholesterol', 'Colesterol', '胆固醇', 'कोलेस्ट्रॉल'),
    searchTerms: ['lipitor', 'atorvastatin', 'statin', 'cholesterol', '胆固醇', 'कोलेस्ट्रॉल'],
    goodrxUrl: 'https://www.goodrx.com/atorvastatin',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/atorvastatin-20mg-tablet/',
    benchmarks: [
      nadac(
        0.84,
        tabs30x20,
        L(
          'CMS NADAC $0.02792 per tablet (ATORVASTATIN 20 MG TABLET), as-of 2026-09-30, effective 2026-09-23. 0.02792 × 30 = $0.84.',
          'CMS NADAC $0.02792 por tableta (ATORVASTATIN 20 MG TABLET), al 2026-09-30, vigente 2026-09-23. 0.02792 × 30 = $0.84.',
          'CMS NADAC 每片 $0.02792（ATORVASTATIN 20 MG TABLET），截至 2026-09-30，生效 2026-09-23。0.02792 × 30 = $0.84。',
          'CMS NADAC $0.02792 प्रति गोली (ATORVASTATIN 20 MG TABLET), 2026-09-30 तक, प्रभावी 2026-09-23। 0.02792 × 30 = $0.84।'
        )
      ),
      costplus(
        5.41,
        tabs30x20,
        L(
          'Cost Plus Drugs public API quote $5.41 for 30 tablets of atorvastatin 20 mg (unit $0.0119 + 15% markup + $5 pharmacist fee). Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $5.41 por 30 tabletas de atorvastatina 20 mg (unidad $0.0119 + 15% + $5 de farmacéutico). Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：阿托伐他汀 20 毫克 30 片 $5.41（单价 $0.0119 + 15% 加价 + $5 药师费）。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $5.41 एटोरवास्टैटिन 20 मिग्रा की 30 गोलियों के लिए (इकाई $0.0119 + 15% + $5 फार्मासिस्ट शुल्क)। 3 अक्टूबर 2026 को लिया गया।'
        )
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
        summary: L(
          'May provide Lipitor or atorvastatin at no cost for qualifying patients.',
          'Puede proporcionar Lipitor o atorvastatina sin costo a pacientes que califiquen.',
          '可能为符合条件的患者免费提供 Lipitor 或阿托伐他汀。',
          'पात्र रोगियों को Lipitor या एटोरवास्टैटिन निःशुल्क दे सकता है।'
        ),
        eligibility: L(
          'Typically uninsured or underinsured; household income often up to 300% FPL.',
          'Por lo general sin seguro o con seguro insuficiente; ingresos hasta ~300% del nivel federal de pobreza.',
          '通常面向无保险或保险不足者；家庭收入一般不超过联邦贫困线的 300%。',
          'आमतौर पर बिना बीमा या अपर्याप्त बीमा; घरेलू आय अक्सर संघीय गरीबी रेखा के 300% तक।'
        ),
        url: 'https://www.pfizerforall.com/',
      },
    ],
  },
  {
    id: 'metformin',
    brand: 'Glucophage',
    generic: 'metformin',
    form: L(
      '500 mg tablet, 60-day supply',
      'tableta 500 mg, suministro de 60 días',
      '500 毫克片剂，60 天用量',
      '500 मिग्रा गोली, 60-दिन की आपूर्ति'
    ),
    category: L('Diabetes', 'Diabetes', '糖尿病', 'मधुमेह'),
    searchTerms: ['metformin', 'glucophage', 'diabetes', 'type 2', '糖尿病', 'मधुमेह'],
    goodrxUrl: 'https://www.goodrx.com/metformin',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/metformin-500mg-tablet/',
    benchmarks: [
      nadac(
        0.87,
        tabs60x500,
        L(
          'CMS NADAC $0.01451 per tablet (METFORMIN HCL 500 MG TABLET), as-of 2026-09-30. 0.01451 × 60 = $0.87.',
          'CMS NADAC $0.01451 por tableta (METFORMIN HCL 500 MG TABLET), al 2026-09-30. 0.01451 × 60 = $0.87.',
          'CMS NADAC 每片 $0.01451（METFORMIN HCL 500 MG TABLET），截至 2026-09-30。0.01451 × 60 = $0.87。',
          'CMS NADAC $0.01451 प्रति गोली (METFORMIN HCL 500 MG TABLET), 2026-09-30 तक। 0.01451 × 60 = $0.87।'
        )
      ),
      costplus(
        5.62,
        tabs60x500,
        L(
          'Cost Plus Drugs public API quote $5.62 for 60 tablets of metformin 500 mg. Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $5.62 por 60 tabletas de metformina 500 mg. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：二甲双胍 500 毫克 60 片 $5.62。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $5.62 मेटफॉर्मिन 500 मिग्रा की 60 गोलियों के लिए। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      {
        name: 'Americares Medicine Access',
        kind: 'nonprofit',
        sponsor: 'Americares',
        summary: L(
          'Connects clinics and patients with donated chronic-care medicines.',
          'Conecta clínicas y pacientes con medicamentos donados para enfermedades crónicas.',
          '将诊所和患者与捐赠的慢性病药品对接。',
          'क्लिनिक और रोगियों को दान की गई दीर्घकालिक दवाओं से जोड़ता है।'
        ),
        eligibility: L(
          'Usually through a participating safety-net clinic.',
          'Por lo general a través de una clínica de red de seguridad participante.',
          '通常通过参与的安全网诊所提供。',
          'आमतौर पर किसी सहभागी सुरक्षा-नेट क्लिनिक के माध्यम से।'
        ),
        url: 'https://www.americares.org/',
      },
    ],
  },
  {
    id: 'lisinopril',
    brand: 'Zestril',
    generic: 'lisinopril',
    form: L(
      '10 mg tablet, 30-day supply',
      'tableta 10 mg, suministro de 30 días',
      '10 毫克片剂，30 天用量',
      '10 मिग्रा गोली, 30-दिन की आपूर्ति'
    ),
    category: L('Blood pressure', 'Presión arterial', '血压', 'रक्तचाप'),
    searchTerms: ['lisinopril', 'zestril', 'prinivil', 'blood pressure', 'ace', '血压', 'रक्तचाप'],
    goodrxUrl: 'https://www.goodrx.com/lisinopril',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/lisinopril-10mg-tablet/',
    benchmarks: [
      nadac(
        0.54,
        tabs30x10,
        L(
          'CMS NADAC $0.01815 per tablet (LISINOPRIL 10 MG TABLET), as-of 2026-09-30. 0.01815 × 30 = $0.54.',
          'CMS NADAC $0.01815 por tableta (LISINOPRIL 10 MG TABLET), al 2026-09-30. 0.01815 × 30 = $0.54.',
          'CMS NADAC 每片 $0.01815（LISINOPRIL 10 MG TABLET），截至 2026-09-30。0.01815 × 30 = $0.54。',
          'CMS NADAC $0.01815 प्रति गोली (LISINOPRIL 10 MG TABLET), 2026-09-30 तक। 0.01815 × 30 = $0.54।'
        )
      ),
      costplus(
        5.38,
        tabs30x10,
        L(
          'Cost Plus Drugs public API quote $5.38 for 30 tablets of lisinopril 10 mg. Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $5.38 por 30 tabletas de lisinopril 10 mg. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：赖诺普利 10 毫克 30 片 $5.38。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $5.38 लिसिनोप्रिल 10 मिग्रा की 30 गोलियों के लिए। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [needyMeds, rxAssist],
  },
  {
    id: 'omeprazole',
    brand: 'Prilosec',
    generic: 'omeprazole',
    form: L(
      '20 mg capsule, 30-day supply',
      'cápsula 20 mg, suministro de 30 días',
      '20 毫克胶囊，30 天用量',
      '20 मिग्रा कैप्सूल, 30-दिन की आपूर्ति'
    ),
    category: L('Acid reflux', 'Reflujo', '胃酸反流', 'एसिड रिफ्लक्स'),
    searchTerms: ['omeprazole', 'prilosec', 'gerd', 'heartburn', '胃酸', 'रिफ्लक्स'],
    goodrxUrl: 'https://www.goodrx.com/omeprazole',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/omeprazoledelayedreleasedr-20mg-capsule/',
    benchmarks: [
      nadac(
        0.88,
        caps30x20dr,
        L(
          'CMS NADAC $0.02945 per capsule (OMEPRAZOLE DR 20 MG CAPSULE), as-of 2026-09-30. 0.02945 × 30 = $0.88.',
          'CMS NADAC $0.02945 por cápsula (OMEPRAZOLE DR 20 MG CAPSULE), al 2026-09-30. 0.02945 × 30 = $0.88.',
          'CMS NADAC 每粒 $0.02945（OMEPRAZOLE DR 20 MG CAPSULE），截至 2026-09-30。0.02945 × 30 = $0.88。',
          'CMS NADAC $0.02945 प्रति कैप्सूल (OMEPRAZOLE DR 20 MG CAPSULE), 2026-09-30 तक। 0.02945 × 30 = $0.88।'
        )
      ),
      costplus(
        5.93,
        caps30x20dr,
        L(
          'Cost Plus Drugs public API quote $5.93 for 30 omeprazole delayed-release 20 mg capsules. Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $5.93 por 30 cápsulas de omeprazol 20 mg de liberación retardada. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：奥美拉唑缓释 20 毫克胶囊 30 粒 $5.93。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $5.93 ओमेप्राजोल विलंबित-रिलीज़ 20 मिग्रा के 30 कैप्सूल के लिए। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [needyMeds],
  },
  {
    id: 'albuterol',
    brand: 'Ventolin HFA',
    generic: 'albuterol',
    form: L('inhaler, 1 inhaler', 'inhalador, 1 unidad', '吸入器，1 支', 'इनहेलर, 1 इनहेलर'),
    category: L('Asthma', 'Asma', '哮喘', 'अस्थमा'),
    searchTerms: ['albuterol', 'ventolin', 'proair', 'inhaler', 'asthma', '哮喘', 'अस्थमा'],
    goodrxUrl: 'https://www.goodrx.com/albuterol',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/albuterol-90mcg-inhaler18g/',
    benchmarks: [
      nadac(
        32.86,
        L(
          '1 generic albuterol HFA 90 mcg inhaler (18 g canister)',
          '1 inhalador genérico de albuterol HFA 90 mcg (envase de 18 g)',
          '1 支仿制沙丁胺醇 HFA 90 微克吸入器（18 克罐）',
          '1 जेनेरिक अल्ब्यूटेरॉल HFA 90 mcg इनहेलर (18 ग्राम कनस्तर)'
        ),
        L(
          'CMS NADAC $1.82548 per gram (ALBUTEROL HFA 90 MCG INHALER, generic), as-of 2026-09-30. Typical 18 g canister: 1.82548 × 18 = $32.86. Brand Ventolin HFA NADAC was $2.72021/g ($48.96 per 18 g).',
          'CMS NADAC $1.82548 por gramo (ALBUTEROL HFA 90 MCG INHALER, genérico), al 2026-09-30. Envase típico de 18 g: 1.82548 × 18 = $32.86. Ventolin HFA de marca: $2.72021/g ($48.96 por 18 g).',
          'CMS NADAC 每克 $1.82548（ALBUTEROL HFA 90 MCG INHALER，仿制），截至 2026-09-30。典型 18 克罐：1.82548 × 18 = $32.86。品牌 Ventolin HFA NADAC 为 $2.72021/克（每 18 克 $48.96）。',
          'CMS NADAC $1.82548 प्रति ग्राम (ALBUTEROL HFA 90 MCG INHALER, जेनेरिक), 2026-09-30 तक। सामान्य 18 ग्राम कनस्तर: 1.82548 × 18 = $32.86। ब्रांड Ventolin HFA NADAC $2.72021/ग्राम था ($48.96 प्रति 18 ग्राम)।'
        )
      ),
      costplus(
        46.38,
        L(
          '1 albuterol HFA 90 mcg inhaler (18 g)',
          '1 inhalador de albuterol HFA 90 mcg (18 g)',
          '1 支沙丁胺醇 HFA 90 微克吸入器（18 克）',
          '1 अल्ब्यूटेरॉल HFA 90 mcg इनहेलर (18 ग्राम)'
        ),
        L(
          'Cost Plus Drugs public API quote $46.38 for 1 × 18 g albuterol 90 mcg inhaler (unit $35.98 + 15% + $5 pharmacist fee). Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $46.38 por 1 inhalador de 18 g de albuterol 90 mcg. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：1 × 18 克沙丁胺醇 90 微克吸入器 $46.38（单价 $35.98 + 15% + $5 药师费）。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $46.38 एक 18 ग्राम अल्ब्यूटेरॉल 90 mcg इनहेलर के लिए (इकाई $35.98 + 15% + $5)। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      {
        name: 'GSK Patient Assistance',
        kind: 'pap',
        sponsor: 'GSK',
        summary: L(
          'May provide Ventolin and other GSK inhalers at no cost.',
          'Puede proporcionar Ventolin y otros inhaladores de GSK sin costo.',
          '可能免费提供 Ventolin 及其他 GSK 吸入器。',
          'Ventolin और अन्य GSK इनहेलर निःशुल्क दे सकता है।'
        ),
        eligibility: L(
          'Uninsured or Medicare Part D in the coverage gap; income limits apply.',
          'Sin seguro o Medicare Parte D en el período sin cobertura; hay límites de ingresos.',
          '无保险，或 Medicare D 部分处于保障缺口期；适用收入限制。',
          'बिना बीमा या कवरेज गैप में Medicare भाग D; आय सीमा लागू।'
        ),
        url: 'https://www.gskforyou.com/',
      },
    ],
  },
  {
    id: 'insulin-glargine',
    brand: 'Lantus',
    generic: 'insulin glargine',
    form: L('vial, 1 month', 'frasco, 1 mes', '瓶装，1 个月', 'वायल, 1 महीना'),
    category: L('Diabetes', 'Diabetes', '糖尿病', 'मधुमेह'),
    searchTerms: ['lantus', 'insulin', 'glargine', 'basaglar', 'diabetes', '胰岛素', 'इंसुलिन'],
    goodrxUrl: 'https://www.goodrx.com/lantus',
    costPlusUrl: null,
    benchmarks: [
      nadac(
        61.52,
        L(
          '1 Lantus 100 unit/mL vial (10 mL)',
          '1 frasco de Lantus 100 unidades/mL (10 mL)',
          '1 瓶 Lantus 100 单位/毫升（10 毫升）',
          '1 Lantus 100 यूनिट/mL वायल (10 mL)'
        ),
        L(
          'CMS NADAC $6.15227 per mL (LANTUS 100 UNIT/ML VIAL), as-of 2026-09-30. 6.15227 × 10 mL = $61.52. Generic insulin glargine-yfgn vial NADAC was $6.08105/mL ($60.81 per 10 mL).',
          'CMS NADAC $6.15227 por mL (LANTUS 100 UNIT/ML VIAL), al 2026-09-30. 6.15227 × 10 mL = $61.52. Genérico insulin glargine-yfgn: $6.08105/mL ($60.81 por 10 mL).',
          'CMS NADAC 每毫升 $6.15227（LANTUS 100 UNIT/ML VIAL），截至 2026-09-30。6.15227 × 10 毫升 = $61.52。仿制胰岛素 glargine-yfgn 瓶装 NADAC 为 $6.08105/毫升（每 10 毫升 $60.81）。',
          'CMS NADAC $6.15227 प्रति mL (LANTUS 100 UNIT/ML VIAL), 2026-09-30 तक। 6.15227 × 10 mL = $61.52। जेनेरिक insulin glargine-yfgn वायल NADAC $6.08105/mL था ($60.81 प्रति 10 mL)।'
        )
      ),
      costplus(null, notListedPkg, notOnCostPlus),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'Sanofi Patient Connection',
        kind: 'pap',
        sponsor: 'Sanofi',
        summary: L(
          'Free Lantus or other Sanofi insulins for eligible uninsured patients.',
          'Lantus u otras insulinas de Sanofi gratis para pacientes elegibles sin seguro.',
          '为符合条件的无保险患者免费提供 Lantus 或其他赛诺菲胰岛素。',
          'पात्र बिना बीमा वाले रोगियों के लिए मुफ्त Lantus या अन्य Sanofi इंसुलिन।'
        ),
        eligibility: L(
          'Uninsured or functionally uninsured; income typically ≤400% FPL.',
          'Sin seguro o sin cobertura funcional; ingresos generalmente ≤400% FPL.',
          '无保险或实质上无保障；收入一般不超过联邦贫困线的 400%。',
          'बिना बीमा या व्यावहारिक रूप से बिना कवरेज; आय आमतौर पर ≤400% FPL।'
        ),
        url: 'https://www.sanofipatientconnection.com/',
      },
      needyMeds,
      {
        name: 'Insulin for Life / Direct Relief',
        kind: 'nonprofit',
        sponsor: 'Direct Relief',
        summary: L(
          'Donated insulin and diabetes supplies through partner clinics.',
          'Insulina y suministros donados a través de clínicas asociadas.',
          '通过合作诊所提供捐赠的胰岛素和糖尿病用品。',
          'साझेदार क्लिनिकों के माध्यम से दान किया इंसुलिन और मधुमेह सामान।'
        ),
        eligibility: L(
          'Distributed via partner health centers, not direct-to-patient mail.',
          'Se entrega en centros de salud asociados, no por correo directo al paciente.',
          '通过合作卫生中心发放，不直接邮寄给患者。',
          'साझेदार स्वास्थ्य केंद्रों के माध्यम से वितरित, रोगी को सीधे डाक नहीं।'
        ),
        url: 'https://www.directrelief.org/',
      },
    ],
  },
  {
    id: 'ozempic',
    brand: 'Ozempic',
    generic: 'semaglutide',
    form: L('pen, 1 month', 'pluma, 1 mes', '笔式注射器，1 个月', 'पेन, 1 महीना'),
    category: L('Diabetes', 'Diabetes', '糖尿病', 'मधुमेह'),
    searchTerms: ['ozempic', 'semaglutide', 'wegovy', 'glp-1', 'diabetes'],
    goodrxUrl: 'https://www.goodrx.com/ozempic',
    costPlusUrl: null,
    benchmarks: [
      nadac(
        995.7,
        L(
          '1 Ozempic 1 mg/dose pen (4 mg / 3 mL)',
          '1 pluma de Ozempic 1 mg/dosis (4 mg / 3 mL)',
          '1 支 Ozempic 1 毫克/剂笔（4 毫克 / 3 毫升）',
          '1 Ozempic 1 मिग्रा/डोज़ पेन (4 मिग्रा / 3 mL)'
        ),
        L(
          'CMS NADAC $331.90037 per mL (OZEMPIC 1 MG/DOSE (4 MG/3 ML) PEN), as-of 2026-09-30. 331.90037 × 3 mL = $995.70.',
          'CMS NADAC $331.90037 por mL (OZEMPIC 1 MG/DOSE (4 MG/3 ML) PEN), al 2026-09-30. 331.90037 × 3 mL = $995.70.',
          'CMS NADAC 每毫升 $331.90037（OZEMPIC 1 MG/DOSE (4 MG/3 ML) PEN），截至 2026-09-30。331.90037 × 3 毫升 = $995.70。',
          'CMS NADAC $331.90037 प्रति mL (OZEMPIC 1 MG/DOSE (4 MG/3 ML) PEN), 2026-09-30 तक। 331.90037 × 3 mL = $995.70।'
        )
      ),
      costplus(null, notListedPkg, notOnCostPlus),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'Novo Nordisk Patient Assistance',
        kind: 'pap',
        sponsor: 'Novo Nordisk',
        summary: L(
          'May provide Ozempic at no cost for qualifying uninsured patients.',
          'Puede proporcionar Ozempic sin costo a pacientes elegibles sin seguro.',
          '可能为符合条件的无保险患者免费提供 Ozempic。',
          'पात्र बिना बीमा वाले रोगियों को Ozempic निःशुल्क दे सकता है।'
        ),
        eligibility: L(
          'Uninsured, US resident, prescription required, household income limits.',
          'Sin seguro, residente de EE. UU., receta requerida y límites de ingresos.',
          '无保险、美国居民、须有处方，并有家庭收入限制。',
          'बिना बीमा, अमेरिकी निवासी, पर्चा आवश्यक, घरेलू आय सीमा।'
        ),
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
    form: L(
      '5 mg tablet, 30-day supply',
      'tableta 5 mg, suministro de 30 días',
      '5 毫克片剂，30 天用量',
      '5 मिग्रा गोली, 30-दिन की आपूर्ति'
    ),
    category: L('Blood thinner', 'Anticoagulante', '抗凝药', 'रक्त पतला करने वाली दवा'),
    searchTerms: ['eliquis', 'apixaban', 'blood thinner', 'afib'],
    goodrxUrl: 'https://www.goodrx.com/eliquis',
    costPlusUrl: null,
    benchmarks: [
      nadac(
        331.27,
        L(
          '60 × 5 mg tablets (twice daily, 30 days)',
          '60 tabletas de 5 mg (dos veces al día, 30 días)',
          '60 × 5 毫克片剂（每日两次，30 天）',
          '60 × 5 मिग्रा गोलियाँ (दिन में दो बार, 30 दिन)'
        ),
        L(
          'CMS NADAC $5.52114 per tablet (ELIQUIS 5 MG TABLET), as-of 2026-09-30. 5.52114 × 60 = $331.27. No generic apixaban NADAC row was in the 2026-09-30 file.',
          'CMS NADAC $5.52114 por tableta (ELIQUIS 5 MG TABLET), al 2026-09-30. 5.52114 × 60 = $331.27. No había fila genérica de apixabán en el archivo del 2026-09-30.',
          'CMS NADAC 每片 $5.52114（ELIQUIS 5 MG TABLET），截至 2026-09-30。5.52114 × 60 = $331.27。2026-09-30 文件中没有仿制阿哌沙班行。',
          'CMS NADAC $5.52114 प्रति गोली (ELIQUIS 5 MG TABLET), 2026-09-30 तक। 5.52114 × 60 = $331.27। 2026-09-30 फ़ाइल में जेनेरिक एपिक्साबैन पंक्ति नहीं थी।'
        )
      ),
      costplus(null, notListedPkg, notOnCostPlus),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'Bristol Myers Squibb Patient Assistance',
        kind: 'pap',
        sponsor: 'Bristol Myers Squibb',
        summary: L(
          'Free Eliquis for people who qualify based on insurance and income.',
          'Eliquis gratis para quienes califiquen según seguro e ingresos.',
          '根据保险和收入符合条件者可免费获得 Eliquis。',
          'बीमा और आय के आधार पर पात्र लोगों के लिए मुफ्त Eliquis।'
        ),
        eligibility: L(
          'Uninsured or Medicare with unaffordable costs; income screening required.',
          'Sin seguro o Medicare con costos inasequibles; se revisan los ingresos.',
          '无保险，或 Medicare 自付费用过高；须进行收入审核。',
          'बिना बीमा या असहनीय लागत वाला Medicare; आय जाँच आवश्यक।'
        ),
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
    form: L('pen, 1 month', 'pluma, 1 mes', '笔式注射器，1 个月', 'पेन, 1 महीना'),
    category: L('Autoimmune', 'Autoinmune', '自身免疫', 'स्वप्रतिरक्षी'),
    searchTerms: ['humira', 'adalimumab', 'amjevita', 'arthritis', 'crohns'],
    goodrxUrl: 'https://www.goodrx.com/humira',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/adalimumab-aacf-40mg_0_8ml-prefilled-syringe-kit-1/',
    benchmarks: [
      nadac(
        6734.83,
        L(
          '2 Humira (CF) 40 mg/0.4 mL pens (typical monthly pack)',
          '2 plumas Humira (CF) 40 mg/0.4 mL (paquete mensual típico)',
          '2 支 Humira (CF) 40 毫克/0.4 毫升笔（典型月用量）',
          '2 Humira (CF) 40 मिग्रा/0.4 mL पेन (सामान्य मासिक पैक)'
        ),
        L(
          'CMS NADAC $3367.41479 per pen (HUMIRA(CF) PEN 40 MG/0.4 ML), as-of 2026-09-30. Two pens: $6,734.83. This is a national acquisition benchmark, not a store cash price.',
          'CMS NADAC $3367.41479 por pluma (HUMIRA(CF) PEN 40 MG/0.4 ML), al 2026-09-30. Dos plumas: $6,734.83. Es una referencia nacional de adquisición, no un precio de mostrador.',
          'CMS NADAC 每支 $3367.41479（HUMIRA(CF) PEN 40 MG/0.4 ML），截至 2026-09-30。两支：$6,734.83。此为全国采购参考价，并非店内自费价。',
          'CMS NADAC $3367.41479 प्रति पेन (HUMIRA(CF) PEN 40 MG/0.4 ML), 2026-09-30 तक। दो पेन: $6,734.83। यह राष्ट्रीय अधिग्रहण संदर्भ है, स्टोर की नकद कीमत नहीं।'
        )
      ),
      costplus(
        469.25,
        L(
          '1 adalimumab-aacf 40 mg/0.8 mL 2-pen kit (Humira biosimilar)',
          '1 kit de 2 plumas adalimumab-aacf 40 mg/0.8 mL (biosimilar de Humira)',
          '1 套 adalimumab-aacf 40 毫克/0.8 毫升双笔套装（Humira 生物类似药）',
          '1 adalimumab-aacf 40 मिग्रा/0.8 mL 2-पेन किट (Humira बायोसिमिलर)'
        ),
        L(
          'Cost Plus Drugs public API quote $469.25 for a 2-pen adalimumab-aacf kit (unit $395 + 15% + $5 pharmacist fee). This is the biosimilar list price, not brand Humira. Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $469.25 por un kit de 2 plumas de adalimumab-aacf (biosimilar, no Humira de marca). Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：adalimumab-aacf 双笔套装 $469.25（单价 $395 + 15% + $5 药师费）。此为生物类似药标价，不是品牌 Humira。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $469.25 दो-पेन adalimumab-aacf किट के लिए (इकाई $395 + 15% + $5)। यह बायोसिमिलर सूची कीमत है, ब्रांड Humira नहीं। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'AbbVie Patient Assistance',
        kind: 'pap',
        sponsor: 'AbbVie',
        summary: L(
          'myAbbVie Assist may provide Humira at no cost if you qualify.',
          'myAbbVie Assist puede proporcionar Humira sin costo si calificas.',
          '若符合条件，myAbbVie Assist 可能免费提供 Humira。',
          'पात्र होने पर myAbbVie Assist Humira निःशुल्क दे सकता है।'
        ),
        eligibility: L(
          'Uninsured or underinsured; financial criteria and prescription required.',
          'Sin seguro o con seguro insuficiente; criterios financieros y receta.',
          '无保险或保险不足；须符合财务标准并持有处方。',
          'बिना बीमा या अपर्याप्त बीमा; वित्तीय मानदंड और पर्चा आवश्यक।'
        ),
        url: 'https://www.abbvie.com/patients/patient-assistance.html',
      },
      pan,
      goodDays,
      {
        name: 'HealthWell Foundation',
        kind: 'nonprofit',
        sponsor: 'HealthWell Foundation',
        summary: L(
          'Copay and premium assistance when a matching disease fund is open.',
          'Ayuda con copagos y primas cuando hay un fondo de enfermedad abierto.',
          '在相应病种基金开放时，提供共付额和保费援助。',
          'जब मेल खाता रोग फंड खुला हो तो सह-भुगतान और प्रीमियम सहायता।'
        ),
        eligibility: L(
          'Insured; income generally up to 400–500% FPL depending on fund.',
          'Con seguro; ingresos generalmente hasta 400–500% FPL según el fondo.',
          '须有保险；收入一般不超过联邦贫困线的 400–500%，视基金而定。',
          'बीमा होना चाहिए; आय आमतौर पर फंड के अनुसार 400–500% FPL तक।'
        ),
        url: 'https://www.healthwellfoundation.org/',
      },
    ],
  },
  {
    id: 'sertraline',
    brand: 'Zoloft',
    generic: 'sertraline',
    form: L(
      '50 mg tablet, 30-day supply',
      'tableta 50 mg, suministro de 30 días',
      '50 毫克片剂，30 天用量',
      '50 मिग्रा गोली, 30-दिन की आपूर्ति'
    ),
    category: L('Mental health', 'Salud mental', '精神健康', 'मानसिक स्वास्थ्य'),
    searchTerms: ['zoloft', 'sertraline', 'ssri', 'depression', 'anxiety', '抑郁', 'अवसाद'],
    goodrxUrl: 'https://www.goodrx.com/sertraline',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/sertraline-50mg-tablet/',
    benchmarks: [
      nadac(
        1.04,
        tabs30x50,
        L(
          'CMS NADAC $0.03479 per tablet (SERTRALINE HCL 50 MG TABLET), as-of 2026-09-30. 0.03479 × 30 = $1.04.',
          'CMS NADAC $0.03479 por tableta (SERTRALINE HCL 50 MG TABLET), al 2026-09-30. 0.03479 × 30 = $1.04.',
          'CMS NADAC 每片 $0.03479（SERTRALINE HCL 50 MG TABLET），截至 2026-09-30。0.03479 × 30 = $1.04。',
          'CMS NADAC $0.03479 प्रति गोली (SERTRALINE HCL 50 MG TABLET), 2026-09-30 तक। 0.03479 × 30 = $1.04।'
        )
      ),
      costplus(
        5.69,
        tabs30x50,
        L(
          'Cost Plus Drugs public API quote $5.69 for 30 tablets of sertraline 50 mg. Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $5.69 por 30 tabletas de sertralina 50 mg. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：舍曲林 50 毫克 30 片 $5.69。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $5.69 सर्ट्रालीन 50 मिग्रा की 30 गोलियों के लिए। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      needyMeds,
      {
        name: 'Viatris Patient Assistance',
        kind: 'pap',
        sponsor: 'Viatris',
        summary: L(
          'Assistance for certain generic and brand mental-health medicines.',
          'Asistencia para ciertos medicamentos de salud mental de marca y genéricos.',
          '为部分品牌及仿制精神健康药品提供援助。',
          'कुछ जेनेरिक और ब्रांड मानसिक स्वास्थ्य दवाओं के लिए सहायता।'
        ),
        eligibility: L(
          'Uninsured with documented financial need.',
          'Sin seguro y con necesidad económica documentada.',
          '无保险且有书面经济困难证明。',
          'बिना बीमा और दस्तावेजी वित्तीय आवश्यकता के साथ।'
        ),
        url: 'https://www.viatris.com/',
      },
    ],
  },
  {
    id: 'amoxicillin',
    brand: 'Amoxil',
    generic: 'amoxicillin',
    form: L(
      '500 mg capsule, 10-day course',
      'cápsula 500 mg, tratamiento de 10 días',
      '500 毫克胶囊，10 天疗程',
      '500 मिग्रा कैप्सूल, 10-दिन का कोर्स'
    ),
    category: L('Antibiotic', 'Antibiótico', '抗生素', 'एंटीबायोटिक'),
    searchTerms: ['amoxicillin', 'amoxil', 'antibiotic', '抗生素', 'एंटीबायोटिक'],
    goodrxUrl: 'https://www.goodrx.com/amoxicillin',
    costPlusUrl: 'https://www.costplusdrugs.com/medications/amoxicillin-500mg-capsule-amoxil/',
    benchmarks: [
      nadac(
        2.36,
        L(
          '30 × 500 mg capsules (typical 10-day course)',
          '30 cápsulas de 500 mg (tratamiento típico de 10 días)',
          '30 × 500 毫克胶囊（典型 10 天疗程）',
          '30 × 500 मिग्रा कैप्सूल (सामान्य 10-दिन का कोर्स)'
        ),
        L(
          'CMS NADAC $0.07880 per capsule (AMOXICILLIN 500 MG CAPSULE), as-of 2026-09-30. 0.07880 × 30 = $2.36.',
          'CMS NADAC $0.07880 por cápsula (AMOXICILLIN 500 MG CAPSULE), al 2026-09-30. 0.07880 × 30 = $2.36.',
          'CMS NADAC 每粒 $0.07880（AMOXICILLIN 500 MG CAPSULE），截至 2026-09-30。0.07880 × 30 = $2.36。',
          'CMS NADAC $0.07880 प्रति कैप्सूल (AMOXICILLIN 500 MG CAPSULE), 2026-09-30 तक। 0.07880 × 30 = $2.36।'
        )
      ),
      costplus(
        6.72,
        caps30x500,
        L(
          'Cost Plus Drugs public API quote $6.72 for 30 amoxicillin 500 mg capsules. Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $6.72 por 30 cápsulas de amoxicilina 500 mg. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：阿莫西林 500 毫克胶囊 30 粒 $6.72。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $6.72 एमोक्सिसिलिन 500 मिग्रा के 30 कैप्सूल के लिए। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [needyMeds],
  },
  {
    id: 'advair',
    brand: 'Advair Diskus',
    generic: 'fluticasone / salmeterol',
    form: L('250/50 inhaler', 'inhalador 250/50', '250/50 吸入器', '250/50 इनहेलर'),
    category: L('Asthma / COPD', 'Asma / EPOC', '哮喘 / 慢阻肺', 'अस्थमा / COPD'),
    searchTerms: ['advair', 'fluticasone', 'salmeterol', 'wixela', 'copd', 'asthma'],
    goodrxUrl: 'https://www.goodrx.com/fluticasone-salmeterol',
    costPlusUrl:
      'https://www.costplusdrugs.com/medications/fluticasone-salmeterol-250mcg-50mcg-aerosol-powder-60-doses/',
    benchmarks: [
      nadac(
        74.71,
        L(
          '1 generic 250/50 inhaler (60 doses)',
          '1 inhalador genérico 250/50 (60 dosis)',
          '1 支仿制 250/50 吸入器（60 剂）',
          '1 जेनेरिक 250/50 इनहेलर (60 डोज़)'
        ),
        L(
          'CMS NADAC $1.24514 per dose (FLUTICASONE-SALMETEROL 250-50 / WIXELA 250-50 INHUB), as-of 2026-09-30. 1.24514 × 60 = $74.71. Brand Advair 250-50 Diskus NADAC was $3.12275 per dose ($187.37 per 60 doses).',
          'CMS NADAC $1.24514 por dosis (FLUTICASONE-SALMETEROL 250-50 / WIXELA 250-50 INHUB), al 2026-09-30. 1.24514 × 60 = $74.71. Advair Diskus 250-50 de marca: $3.12275 por dosis ($187.37 por 60 dosis).',
          'CMS NADAC 每剂 $1.24514（FLUTICASONE-SALMETEROL 250-50 / WIXELA 250-50 INHUB），截至 2026-09-30。1.24514 × 60 = $74.71。品牌 Advair 250-50 Diskus NADAC 为每剂 $3.12275（60 剂 $187.37）。',
          'CMS NADAC $1.24514 प्रति डोज़ (FLUTICASONE-SALMETEROL 250-50 / WIXELA 250-50 INHUB), 2026-09-30 तक। 1.24514 × 60 = $74.71। ब्रांड Advair 250-50 Diskus NADAC $3.12275 प्रति डोज़ था ($187.37 प्रति 60 डोज़)।'
        )
      ),
      costplus(
        47.55,
        L(
          '1 fluticasone-salmeterol 250/50 inhaler',
          '1 inhalador de fluticasona-salmeterol 250/50',
          '1 支氟替卡松-沙美特罗 250/50 吸入器',
          '1 फ्लुटिकासोन-साल्मेटेरॉल 250/50 इनहेलर'
        ),
        L(
          'Cost Plus Drugs public API quote $47.55 for 1 unit of fluticasone-salmeterol 250 mcg-50 mcg (unit $37 + 15% + $5 pharmacist fee). Retrieved October 3, 2026.',
          'Cotización pública de Cost Plus Drugs $47.55 por 1 unidad de fluticasona-salmeterol 250/50. Consultado el 3 de octubre de 2026.',
          'Cost Plus Drugs 公开接口报价：氟替卡松-沙美特罗 250/50 微克 1 支 $47.55（单价 $37 + 15% + $5 药师费）。获取于 2026 年 10 月 3 日。',
          'Cost Plus Drugs सार्वजनिक API भाव $47.55 फ्लुटिकासोन-साल्मेटेरॉल 250/50 की 1 इकाई के लिए (इकाई $37 + 15% + $5)। 3 अक्टूबर 2026 को लिया गया।'
        )
      ),
    ],
    pharmacies: areaPharmacies,
    programs: [
      {
        name: 'GSK Patient Assistance',
        kind: 'pap',
        sponsor: 'GSK',
        summary: L(
          'Free Advair or authorized generic for eligible patients.',
          'Advair o genérico autorizado gratis para pacientes elegibles.',
          '为符合条件的患者免费提供 Advair 或授权仿制药。',
          'पात्र रोगियों के लिए मुफ्त Advair या अधिकृत जेनेरिक।'
        ),
        eligibility: L(
          'Uninsured or Medicare Part D; income documentation required.',
          'Sin seguro o Medicare Parte D; se requiere documentación de ingresos.',
          '无保险或 Medicare D 部分；须提供收入证明。',
          'बिना बीमा या Medicare भाग D; आय दस्तावेज़ आवश्यक।'
        ),
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
    const hay = [
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
    return hay.includes(q);
  });
}
