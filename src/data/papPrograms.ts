import type { PapInsuranceRule, PapProgram } from '../types';
import { L } from '../i18n';

const GENERIC_IDS = [
  'atorvastatin',
  'metformin',
  'lisinopril',
  'levothyroxine',
  'amlodipine',
  'omeprazole',
  'glipizide',
  'losartan',
  'sertraline',
  'fluoxetine',
  'hydrochlorothiazide',
  'furosemide',
  'atenolol',
  'gabapentin',
  'potassium-chloride',
];

const defaultDocs = [
  L(
    'Completed program application signed by you and your prescriber',
    'Solicitud completa firmada por ti y tu médico',
    '由你和处方医生签字的完整申请表',
    'आप और डॉक्टर द्वारा हस्ताक्षरित पूरा आवेदन'
  ),
  L(
    'Proof of household income (tax return, W-2, or pay stubs)',
    'Comprobante de ingresos del hogar (declaración, W-2 o talones de pago)',
    '家庭收入证明（纳税申报、W-2 或工资单）',
    'घरेलू आय का प्रमाण (टैक्स रिटर्न, W-2, या वेतन पर्ची)'
  ),
  L(
    'Insurance information, or a statement that you are uninsured / underinsured',
    'Información de seguro, o una declaración de que no tienes cobertura suficiente',
    '保险信息，或无保险/保障不足的说明',
    'बीमा जानकारी, या यह कि आप बिना/अपर्याप्त बीमा हैं'
  ),
];

function pap(opts: {
  id: string;
  name: string;
  sponsor: string;
  medicationIds: string[];
  covers: PapProgram['covers'];
  summary: PapProgram['summary'];
  fplMax: number | null;
  insuranceRule: PapInsuranceRule;
  applicationUrl: string;
  phone: string;
  sendWhere: PapProgram['sendWhere'];
  cutoff: PapProgram['cutoff'];
  callScript: PapProgram['callScript'];
}): PapProgram {
  return {
    kind: 'pap',
    closedToNew: false,
    verifiedAsOf: '2026-10-13',
    documents: defaultDocs,
    verifiedNote: L(
      'Details from the Patient Assistance Programs and Pricing Guide. Confirm current rules on the official program site or NeedyMeds before you apply.',
      'Datos de la guía de PAP y precios. Confirma las reglas vigentes en el sitio oficial o NeedyMeds antes de solicitar.',
      '信息来自患者援助计划与定价指南。申请前请在官方网站或 NeedyMeds 核对现行规则。',
      'विवरण रोगी सहायता और मूल्य गाइड से। आवेदन से पहले आधिकारिक साइट या NeedyMeds पर नियम जाँचें।'
    ),
    ...opts,
  };
}

export const papPrograms: PapProgram[] = [
  pap({
    id: 'az-me',
    name: 'AZ&Me Prescription Savings',
    sponsor: 'AstraZeneca',
    medicationIds: ['farxiga'],
    covers: L(
      'Farxiga (dapagliflozin) 10 mg tablet for diabetes / heart failure.',
      'Farxiga (dapagliflozina) tableta 10 mg para diabetes / insuficiencia cardíaca.',
      'Farxiga（达格列净）10 毫克片剂，用于糖尿病 / 心衰。',
      'Farxiga (डापाग्लिफ्लोज़िन) 10 मिग्रा गोली, मधुमेह / हृदय विफलता के लिए।'
    ),
    summary: L(
      'AstraZeneca ships medicine to your home or clinic when you qualify. Income typically under 300% of the federal poverty level; uninsured or underinsured.',
      'AstraZeneca envía el medicamento a tu casa o clínica si calificas. Ingresos por lo general bajo el 300% del FPL; sin seguro o con cobertura insuficiente.',
      '符合条件时阿斯利康将药品寄到你家或诊所。收入通常低于联邦贫困线 300%；无保险或保障不足。',
      'पात्र होने पर AstraZeneca दवा घर या क्लिनिक भेजती है। आय आमतौर पर 300% FPL से कम; बिना या अपर्याप्त बीमा।'
    ),
    fplMax: 300,
    insuranceRule: 'uninsured',
    applicationUrl: 'https://www.azandmeapp.com/',
    phone: '1-800-292-6363',
    sendWhere: L(
      'Start at azandmeapp.com (AZ&Me Portal). Your prescriber completes the medical section. Confirm current fax/mail instructions on that site.',
      'Empieza en azandmeapp.com (portal AZ&Me). Tu médico completa la parte médica. Confirma fax/correo vigentes en ese sitio.',
      '从 azandmeapp.com（AZ&Me 门户）开始。处方医生填写医疗部分。请在该站核对现行传真/邮寄说明。',
      'azandmeapp.com (AZ&Me पोर्टल) से शुरू करें। डॉक्टर चिकित्सा भाग भरते हैं। फैक्स/डाक निर्देश उसी साइट पर जाँचें।'
    ),
    cutoff: L(
      'Income under 300% FPL. Uninsured or underinsured. U.S. residency and a valid prescription required.',
      'Ingresos bajo el 300% del FPL. Sin seguro o con cobertura insuficiente. Residencia en EE. UU. y receta válida.',
      '收入低于联邦贫困线 300%。无保险或保障不足。需美国居住身份和有效处方。',
      'आय 300% FPL से कम। बिना या अपर्याप्त बीमा। अमेरिका निवास और वैध पर्चा आवश्यक।'
    ),
    callScript: L(
      'Hello, I am calling AZ&Me at 1-800-292-6363 about Farxiga. My household has {size} people and my income is about {income}. I {insured}. Please start an application or tell me how my doctor completes the portal form.',
      'Hola, llamo a AZ&Me al 1-800-292-6363 por Farxiga. Somos {size} en el hogar y mis ingresos son unos {income}. {insured}. Inicien una solicitud o díganme cómo completa el médico el formulario.',
      '您好，我打给 AZ&Me 1-800-292-6363，咨询 Farxiga。家中 {size} 人，收入大约 {income}。我{insured}。请开始申请，或告知医生如何填写门户表格。',
      'नमस्ते, मैं AZ&Me 1-800-292-6363 पर Farxiga के लिए कॉल कर रहा/रही हूँ। घर में {size} लोग, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें या बताएँ डॉक्टर फॉर्म कैसे भरें।'
    ),
  }),
  pap({
    id: 'bi-cares',
    name: 'Boehringer Ingelheim Cares',
    sponsor: 'Boehringer Ingelheim',
    medicationIds: ['jardiance'],
    covers: L(
      'Jardiance (empagliflozin) 10 mg tablet for type 2 diabetes.',
      'Jardiance (empagliflozina) tableta 10 mg para diabetes tipo 2.',
      'Jardiance（恩格列净）10 毫克片剂，用于 2 型糖尿病。',
      'Jardiance (एम्पाग्लिफ्लोज़िन) 10 मिग्रा गोली, टाइप 2 मधुमेह के लिए।'
    ),
    summary: L(
      'BI Cares may provide Jardiance at no cost. Typical screen: income around 300–400% FPL, U.S. resident, uninsured.',
      'BI Cares puede proporcionar Jardiance sin costo. Filtro típico: ingresos alrededor del 300–400% del FPL, residente de EE. UU., sin seguro.',
      'BI Cares 可能免费提供 Jardiance。典型筛查：收入约联邦贫困线 300–400%，美国居民，无保险。',
      'BI Cares Jardiance बिना लागत दे सकता है। सामान्य जाँच: आय लगभग 300–400% FPL, अमेरिका निवासी, बिना बीमा।'
    ),
    fplMax: 400,
    insuranceRule: 'uninsured',
    applicationUrl: 'https://www.boehringer-ingelheim.com/us/our-responsibility/patient-assistance-program',
    phone: '1-800-556-8317',
    sendWhere: L(
      'Open the BI Cares / Boehringer Ingelheim patient-assistance portal. Apply with your prescriber and follow the current mail or fax instructions on that page.',
      'Abre el portal de asistencia de BI Cares / Boehringer Ingelheim. Solicita con tu médico y sigue las instrucciones de correo o fax vigentes.',
      '打开 BI Cares / 勃林格殷格翰患者援助门户。与处方医生一起申请，并按该页现行邮寄或传真说明提交。',
      'BI Cares / Boehringer Ingelheim सहायता पोर्टल खोलें। डॉक्टर के साथ आवेदन करें और उस पेज के डाक या फैक्स निर्देशों का पालन करें।'
    ),
    cutoff: L(
      'Income typically 300–400% FPL. U.S. resident. Uninsured.',
      'Ingresos por lo general 300–400% del FPL. Residente de EE. UU. Sin seguro.',
      '收入通常为联邦贫困线的 300–400%。美国居民。无保险。',
      'आय आमतौर पर 300–400% FPL। अमेरिका निवासी। बिना बीमा।'
    ),
    callScript: L(
      'Hello, I am calling Boehringer Ingelheim Cares at 1-800-556-8317 about Jardiance. Household {size}, income about {income}. I {insured}. Please start a BI Cares application.',
      'Hola, llamo a Boehringer Ingelheim Cares al 1-800-556-8317 por Jardiance. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud de BI Cares.',
      '您好，我打给 Boehringer Ingelheim Cares 1-800-556-8317，咨询 Jardiance。家庭 {size} 人，收入大约 {income}。我{insured}。请开始 BI Cares 申请。',
      'नमस्ते, मैं Boehringer Ingelheim Cares 1-800-556-8317 पर Jardiance के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया BI Cares आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'bms-paf',
    name: 'Bristol Myers Squibb Patient Assistance Foundation',
    sponsor: 'Bristol Myers Squibb Patient Assistance Foundation',
    medicationIds: ['eliquis'],
    covers: L(
      'Eliquis (apixaban) 5 mg tablet, a blood thinner.',
      'Eliquis (apixabán) tableta 5 mg, anticoagulante.',
      'Eliquis（阿哌沙班）5 毫克片剂，抗凝药。',
      'Eliquis (एपिक्सैबन) 5 मिग्रा गोली, रक्त पतला करने वाली दवा।'
    ),
    summary: L(
      'Free Eliquis for eligible uninsured patients or Medicare Part D patients who meet Foundation rules. Income guidelines apply; they are not posted as a public FPL percentage.',
      'Eliquis gratis para pacientes elegibles sin seguro o con Medicare Parte D que cumplan las reglas de la Fundación. Hay límites de ingresos, no publicados como % de FPL.',
      '符合基金会规则的无保险或 Medicare D 部分患者可免费获得 Eliquis。有收入限制，但未公布为贫困线百分比。',
      'पात्र बिना बीमा या Medicare भाग D रोगियों के लिए Eliquis मुफ्त। आय दिशानिर्देश लागू; सार्वजनिक FPL % नहीं।'
    ),
    fplMax: null,
    insuranceRule: 'uninsuredOrMedicare',
    applicationUrl: 'https://www.bmspaf.org/apply',
    phone: '1-800-736-0003',
    sendWhere: L(
      'Start at bmspaf.org/apply. Mail: Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769. Fax 1-800-736-1611. Phone Monday–Friday 8am–8pm ET.',
      'Empieza en bmspaf.org/apply. Correo: Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769. Fax 1-800-736-1611. Lunes a viernes, 8 a. m.–8 p. m. ET.',
      '从 bmspaf.org/apply 开始。邮寄：Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769。传真 1-800-736-1611。电话周一至周五东部时间 8:00–20:00。',
      'bmspaf.org/apply से शुरू करें। डाक: Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769। फैक्स 1-800-736-1611। सोम–शुक्र सुबह 8–शाम 8 ET।'
    ),
    cutoff: L(
      'Income guidelines apply (not published as a public FPL %). Uninsured, or Medicare Part D with Foundation spend rules.',
      'Se aplican límites de ingresos (sin % de FPL público). Sin seguro, o Medicare Parte D con las reglas de gasto de la Fundación.',
      '适用收入限制（无公开贫困线百分比）。无保险，或符合基金会支出规则的 Medicare D 部分。',
      'आय दिशानिर्देश लागू (सार्वजनिक FPL % नहीं)। बिना बीमा, या फाउंडेशन खर्च नियमों के साथ Medicare भाग D।'
    ),
    callScript: L(
      'Hello, I am calling the Bristol Myers Squibb Patient Assistance Foundation at 1-800-736-0003 about Eliquis. Household {size}, income about {income}. I {insured}. Please start an application.',
      'Hola, llamo a la Fundación de Asistencia de Bristol Myers Squibb al 1-800-736-0003 por Eliquis. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud.',
      '您好，我打给 Bristol Myers Squibb 患者援助基金会 1-800-736-0003，咨询 Eliquis。家庭 {size} 人，收入大约 {income}。我{insured}。请开始申请。',
      'नमस्ते, मैं Bristol Myers Squibb Patient Assistance Foundation 1-800-736-0003 पर Eliquis के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'abbvie-assist',
    name: 'myAbbVie Assist',
    sponsor: 'AbbVie',
    medicationIds: ['humira'],
    covers: L(
      'Humira (adalimumab) injectable for rheumatoid arthritis / IBD.',
      'Humira (adalimumab) inyectable para artritis reumatoide / EII.',
      'Humira（阿达木单抗）注射剂，用于类风湿关节炎 / 炎症性肠病。',
      'Humira (आदालिमुमैब) इंजेक्टेबल, रूमेटॉइड अर्थराइटिस / IBD के लिए।'
    ),
    summary: L(
      'myAbbVie Assist for uninsured or underinsured patients. Income typically under 600% of the federal poverty level. Confirm current enrollment rules on the official portal — they change.',
      'myAbbVie Assist para pacientes sin seguro o con cobertura insuficiente. Ingresos por lo general bajo el 600% del FPL. Confirma las reglas vigentes en el portal oficial.',
      'myAbbVie Assist 面向无保险或保障不足患者。收入通常低于联邦贫困线 600%。请在官方门户核对现行登记规则。',
      'myAbbVie Assist बिना या अपर्याप्त बीमा वाले रोगियों के लिए। आय आमतौर पर 600% FPL से कम। आधिकारिक पोर्टल पर वर्तमान नियम जाँचें।'
    ),
    fplMax: 600,
    insuranceRule: 'uninsured',
    applicationUrl: 'https://www.abbvie.com/patients/patient-support/patient-assistance.html',
    phone: '1-800-222-6885',
    sendWhere: L(
      'Open the myAbbVie Assist portal from AbbVie’s patient-assistance page. Call 1-800-222-6885 for current HUMIRA instructions.',
      'Abre el portal myAbbVie Assist desde la página de asistencia de AbbVie. Llama al 1-800-222-6885 para las instrucciones vigentes de HUMIRA.',
      '从 AbbVie 患者援助页打开 myAbbVie Assist 门户。请致电 1-800-222-6885 获取 HUMIRA 现行说明。',
      'AbbVie सहायता पेज से myAbbVie Assist पोर्टल खोलें। HUMIRA के वर्तमान निर्देशों के लिए 1-800-222-6885 पर कॉल करें।'
    ),
    cutoff: L(
      'Income under 600% FPL. Uninsured or underinsured.',
      'Ingresos bajo el 600% del FPL. Sin seguro o con cobertura insuficiente.',
      '收入低于联邦贫困线 600%。无保险或保障不足。',
      'आय 600% FPL से कम। बिना या अपर्याप्त बीमा।'
    ),
    callScript: L(
      'Hello, I am calling myAbbVie Assist at 1-800-222-6885 about Humira. Household {size}, income about {income}. I {insured}. Please tell me how to apply.',
      'Hola, llamo a myAbbVie Assist al 1-800-222-6885 por Humira. Hogar {size}, ingresos unos {income}. {insured}. Díganme cómo solicitar.',
      '您好，我打给 myAbbVie Assist 1-800-222-6885，咨询 Humira。家庭 {size} 人，收入大约 {income}。我{insured}。请告知如何申请。',
      'नमस्ते, मैं myAbbVie Assist 1-800-222-6885 पर Humira के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया बताएँ कैसे आवेदन करें।'
    ),
  }),
  pap({
    id: 'lilly-cares',
    name: 'Lilly Cares',
    sponsor: 'Eli Lilly and Company',
    medicationIds: ['trulicity'],
    covers: L(
      'Trulicity (dulaglutide) injectable for type 2 diabetes.',
      'Trulicity (dulaglutida) inyectable para diabetes tipo 2.',
      'Trulicity（度拉糖肽）注射剂，用于 2 型糖尿病。',
      'Trulicity (डुलाग्लूटाइड) इंजेक्टेबल, टाइप 2 मधुमेह के लिए।'
    ),
    summary: L(
      'Lilly Cares may provide Trulicity at no cost. Income up to 400% FPL, U.S. resident, typically uninsured.',
      'Lilly Cares puede proporcionar Trulicity sin costo. Ingresos hasta el 400% del FPL, residente de EE. UU., por lo general sin seguro.',
      'Lilly Cares 可能免费提供 Trulicity。收入不超过联邦贫困线 400%，美国居民，通常无保险。',
      'Lilly Cares Trulicity बिना लागत दे सकता है। आय 400% FPL तक, अमेरिका निवासी, आमतौर पर बिना बीमा।'
    ),
    fplMax: 400,
    insuranceRule: 'uninsured',
    applicationUrl: 'https://www.lilly.com/resources/lilly-cares',
    phone: '1-800-545-6962',
    sendWhere: L(
      'Apply through the Lilly Cares portal. Your prescriber must complete their section. Confirm current fax/mail details on lilly.com/resources/lilly-cares.',
      'Solicita en el portal Lilly Cares. Tu médico debe completar su parte. Confirma fax/correo vigentes en lilly.com/resources/lilly-cares.',
      '通过 Lilly Cares 门户申请。处方医生须完成其部分。请在 lilly.com/resources/lilly-cares 核对现行传真/邮寄信息。',
      'Lilly Cares पोर्टल से आवेदन करें। डॉक्टर का खंड पूरा होना चाहिए। फैक्स/डाक lilly.com/resources/lilly-cares पर जाँचें।'
    ),
    cutoff: L(
      'Income up to 400% FPL. U.S. resident. Typically uninsured.',
      'Ingresos hasta el 400% del FPL. Residente de EE. UU. Por lo general sin seguro.',
      '收入不超过联邦贫困线 400%。美国居民。通常无保险。',
      'आय 400% FPL तक। अमेरिका निवासी। आमतौर पर बिना बीमा।'
    ),
    callScript: L(
      'Hello, I am calling Lilly Cares at 1-800-545-6962 about Trulicity. Household {size}, income about {income}. I {insured}. Please start an application.',
      'Hola, llamo a Lilly Cares al 1-800-545-6962 por Trulicity. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud.',
      '您好，我打给 Lilly Cares 1-800-545-6962，咨询 Trulicity。家庭 {size} 人，收入大约 {income}。我{insured}。请开始申请。',
      'नमस्ते, मैं Lilly Cares 1-800-545-6962 पर Trulicity के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'jj-pap',
    name: 'Johnson & Johnson Patient Assistance',
    sponsor: 'Johnson & Johnson',
    medicationIds: ['xarelto'],
    covers: L(
      'Xarelto (rivaroxaban) 20 mg tablet, a blood thinner.',
      'Xarelto (rivaroxabán) tableta 20 mg, anticoagulante.',
      'Xarelto（利伐沙班）20 毫克片剂，抗凝药。',
      'Xarelto (रिवारोक्साबैन) 20 मिग्रा गोली, रक्त पतला करने वाली दवा।'
    ),
    summary: L(
      'J&J patient assistance for people who lack sufficient coverage. Income up to 500% FPL.',
      'Asistencia de J&J para quienes no tienen cobertura suficiente. Ingresos hasta el 500% del FPL.',
      '强生患者援助面向保障不足者。收入不超过联邦贫困线 500%。',
      'J&J रोगी सहायता पर्याप्त कवरेज न होने पर। आय 500% FPL तक।'
    ),
    fplMax: 500,
    insuranceRule: 'any',
    applicationUrl: 'https://www.jjpaf.org/',
    phone: '1-800-652-6682',
    sendWhere: L(
      'Start at jjpaf.org. Complete the application with your prescriber and follow the current submission instructions on that site.',
      'Empieza en jjpaf.org. Completa la solicitud con tu médico y sigue las instrucciones vigentes de ese sitio.',
      '从 jjpaf.org 开始。与处方医生一起填写申请，并按该站现行提交说明办理。',
      'jjpaf.org से शुरू करें। डॉक्टर के साथ आवेदन भरें और उस साइट के वर्तमान निर्देशों का पालन करें।'
    ),
    cutoff: L(
      'Income up to 500% FPL. Lacking sufficient coverage for Xarelto.',
      'Ingresos hasta el 500% del FPL. Sin cobertura suficiente para Xarelto.',
      '收入不超过联邦贫困线 500%。对 Xarelto 保障不足。',
      'आय 500% FPL तक। Xarelto के लिए पर्याप्त कवरेज नहीं।'
    ),
    callScript: L(
      'Hello, I am calling Johnson & Johnson Patient Assistance at 1-800-652-6682 about Xarelto. Household {size}, income about {income}. I {insured}. Please start an application.',
      'Hola, llamo a la asistencia de Johnson & Johnson al 1-800-652-6682 por Xarelto. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud.',
      '您好，我打给强生患者援助 1-800-652-6682，咨询 Xarelto。家庭 {size} 人，收入大约 {income}。我{insured}。请开始申请。',
      'नमस्ते, मैं Johnson & Johnson Patient Assistance 1-800-652-6682 पर Xarelto के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'merck-helps',
    name: 'Merck Helps',
    sponsor: 'Merck',
    medicationIds: ['keytruda'],
    covers: L(
      'Keytruda (pembrolizumab) injectable for oncology.',
      'Keytruda (pembrolizumab) inyectable de oncología.',
      'Keytruda（帕博利珠单抗）注射剂，用于肿瘤治疗。',
      'Keytruda (पेम्ब्रोलिज़ुमैब) इंजेक्टेबल, ऑन्कोलॉजी के लिए।'
    ),
    summary: L(
      'Merck Helps for uninsured or underinsured patients. Income up to 400% FPL.',
      'Merck Helps para pacientes sin seguro o con cobertura insuficiente. Ingresos hasta el 400% del FPL.',
      'Merck Helps 面向无保险或保障不足患者。收入不超过联邦贫困线 400%。',
      'Merck Helps बिना या अपर्याप्त बीमा वाले रोगियों के लिए। आय 400% FPL तक।'
    ),
    fplMax: 400,
    insuranceRule: 'uninsured',
    applicationUrl: 'https://www.merckhelps.com/',
    phone: '1-800-727-5400',
    sendWhere: L(
      'Open merckhelps.com and start the Keytruda / Merck Patient Assistance application with your oncology clinic.',
      'Abre merckhelps.com y comienza la solicitud de Keytruda / asistencia de Merck con tu clínica de oncología.',
      '打开 merckhelps.com，与肿瘤诊所一起开始 Keytruda / Merck 患者援助申请。',
      'merckhelps.com खोलें और अपनी ऑन्कोलॉजी क्लिनिक के साथ Keytruda / Merck आवेदन शुरू करें।'
    ),
    cutoff: L(
      'Income up to 400% FPL. Uninsured or underinsured.',
      'Ingresos hasta el 400% del FPL. Sin seguro o con cobertura insuficiente.',
      '收入不超过联邦贫困线 400%。无保险或保障不足。',
      'आय 400% FPL तक। बिना या अपर्याप्त बीमा।'
    ),
    callScript: L(
      'Hello, I am calling Merck Helps at 1-800-727-5400 about Keytruda. Household {size}, income about {income}. I {insured}. Please start an application.',
      'Hola, llamo a Merck Helps al 1-800-727-5400 por Keytruda. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud.',
      '您好，我打给 Merck Helps 1-800-727-5400，咨询 Keytruda。家庭 {size} 人，收入大约 {income}。我{insured}。请开始申请。',
      'नमस्ते, मैं Merck Helps 1-800-727-5400 पर Keytruda के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'genentech-access',
    name: 'Genentech Access Solutions',
    sponsor: 'Genentech',
    medicationIds: ['herceptin'],
    covers: L(
      'Herceptin (trastuzumab) injectable for oncology / breast cancer.',
      'Herceptin (trastuzumab) inyectable de oncología / cáncer de mama.',
      'Herceptin（曲妥珠单抗）注射剂，用于肿瘤 / 乳腺癌。',
      'Herceptin (ट्रैस्टुज़ुमैब) इंजेक्टेबल, ऑन्कोलॉजी / स्तन कैंसर के लिए।'
    ),
    summary: L(
      'Genentech Access Solutions for an insurance gap or uninsured patients. Income up to 500% FPL.',
      'Genentech Access Solutions para brechas de seguro o pacientes sin seguro. Ingresos hasta el 500% del FPL.',
      'Genentech Access Solutions 面向保险缺口或无保险患者。收入不超过联邦贫困线 500%。',
      'Genentech Access Solutions बीमा अंतर या बिना बीमा रोगियों के लिए। आय 500% FPL तक।'
    ),
    fplMax: 500,
    insuranceRule: 'any',
    applicationUrl: 'https://www.genentech-access.com/patient.html',
    phone: '1-866-422-2377',
    sendWhere: L(
      'Start at genentech-access.com/patient. Your oncology clinic usually submits the Access Solutions forms.',
      'Empieza en genentech-access.com/patient. Por lo general tu clínica de oncología envía los formularios.',
      '从 genentech-access.com/patient 开始。通常由肿瘤诊所提交 Access Solutions 表格。',
      'genentech-access.com/patient से शुरू करें। आमतौर पर ऑन्कोलॉजी क्लिनिक फॉर्म जमा करती है।'
    ),
    cutoff: L(
      'Income up to 500% FPL. Insurance gap or uninsured.',
      'Ingresos hasta el 500% del FPL. Brecha de seguro o sin seguro.',
      '收入不超过联邦贫困线 500%。保险缺口或无保险。',
      'आय 500% FPL तक। बीमा अंतर या बिना बीमा।'
    ),
    callScript: L(
      'Hello, I am calling Genentech Access Solutions at 1-866-422-2377 about Herceptin. Household {size}, income about {income}. I {insured}. Please start an application.',
      'Hola, llamo a Genentech Access Solutions al 1-866-422-2377 por Herceptin. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud.',
      '您好，我打给 Genentech Access Solutions 1-866-422-2377，咨询 Herceptin。家庭 {size} 人，收入大约 {income}。我{insured}。请开始申请。',
      'नमस्ते, मैं Genentech Access Solutions 1-866-422-2377 पर Herceptin के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'pfizer-rxpathways',
    name: 'Pfizer RxPathways',
    sponsor: 'Pfizer',
    medicationIds: ['xeljanz'],
    covers: L(
      'Xeljanz (tofacitinib) 5 mg tablet for rheumatoid arthritis.',
      'Xeljanz (tofacitinib) tableta 5 mg para artritis reumatoide.',
      'Xeljanz（托法替布）5 毫克片剂，用于类风湿关节炎。',
      'Xeljanz (टोफैसिटिनिब) 5 मिग्रा गोली, रूमेटॉइड अर्थराइटिस के लिए।'
    ),
    summary: L(
      'Pfizer RxPathways for uninsured patients or a Medicare coverage gap. Income up to 400% FPL.',
      'Pfizer RxPathways para pacientes sin seguro o con brecha de Medicare. Ingresos hasta el 400% del FPL.',
      'Pfizer RxPathways 面向无保险或 Medicare 保障缺口患者。收入不超过联邦贫困线 400%。',
      'Pfizer RxPathways बिना बीमा या Medicare कवरेज गैप के लिए। आय 400% FPL तक।'
    ),
    fplMax: 400,
    insuranceRule: 'uninsuredOrMedicare',
    applicationUrl: 'https://www.pfizerrxpathways.com/',
    phone: '1-844-989-7284',
    sendWhere: L(
      'Apply at pfizerrxpathways.com / PAP Connect with your prescriber. Phone 1-844-989-7284 if you cannot apply online.',
      'Solicita en pfizerrxpathways.com / PAP Connect con tu médico. Llama al 1-844-989-7284 si no puedes en línea.',
      '与处方医生一起在 pfizerrxpathways.com / PAP Connect 申请。无法在线请致电 1-844-989-7284。',
      'डॉक्टर के साथ pfizerrxpathways.com / PAP Connect पर आवेदन करें। ऑनलाइन न हो तो 1-844-989-7284 कॉल करें।'
    ),
    cutoff: L(
      'Income up to 400% FPL. Uninsured or Medicare gap.',
      'Ingresos hasta el 400% del FPL. Sin seguro o brecha de Medicare.',
      '收入不超过联邦贫困线 400%。无保险或 Medicare 缺口。',
      'आय 400% FPL तक। बिना बीमा या Medicare गैप।'
    ),
    callScript: L(
      'Hello, I am calling Pfizer RxPathways at 1-844-989-7284 about Xeljanz. Household {size}, income about {income}. I {insured}. Please start a PAP Connect application.',
      'Hola, llamo a Pfizer RxPathways al 1-844-989-7284 por Xeljanz. Hogar {size}, ingresos unos {income}. {insured}. Inicien PAP Connect.',
      '您好，我打给 Pfizer RxPathways 1-844-989-7284，咨询 Xeljanz。家庭 {size} 人，收入大约 {income}。我{insured}。请开始 PAP Connect 申请。',
      'नमस्ते, मैं Pfizer RxPathways 1-844-989-7284 पर Xeljanz के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया PAP Connect आवेदन शुरू करें।'
    ),
  }),
  pap({
    id: 'janssen-carepath',
    name: 'Janssen CarePath',
    sponsor: 'Janssen / Johnson & Johnson',
    medicationIds: ['stelara'],
    covers: L(
      'Stelara (ustekinumab) injectable for psoriasis / Crohn’s.',
      'Stelara (ustekinumab) inyectable para psoriasis / Crohn.',
      'Stelara（乌司奴单抗）注射剂，用于银屑病 / 克罗恩病。',
      'Stelara (उस्टेकिनुमैब) इंजेक्टेबल, सोरायसिस / क्रोहन के लिए।'
    ),
    summary: L(
      'Janssen CarePath support for commercial insurance or uninsured patients. Income guidelines apply; confirm on the CarePath portal.',
      'Apoyo de Janssen CarePath para seguro comercial o pacientes sin seguro. Hay límites de ingresos; confírmalos en el portal.',
      'Janssen CarePath 面向商业保险或无保险患者。有收入限制；请在 CarePath 门户确认。',
      'Janssen CarePath व्यावसायिक बीमा या बिना बीमा रोगियों के लिए। आय दिशानिर्देश लागू; पोर्टल पर पुष्टि करें।'
    ),
    fplMax: null,
    insuranceRule: 'any',
    applicationUrl: 'https://www.janssenaccessone.com/',
    phone: '1-877-227-3728',
    sendWhere: L(
      'Open Janssen Access One / CarePath and start a Stelara patient application with your prescriber.',
      'Abre Janssen Access One / CarePath y comienza una solicitud de Stelara con tu médico.',
      '打开 Janssen Access One / CarePath，与处方医生一起开始 Stelara 患者申请。',
      'Janssen Access One / CarePath खोलें और डॉक्टर के साथ Stelara आवेदन शुरू करें।'
    ),
    cutoff: L(
      'Income guidelines apply. Commercial insurance or uninsured support — confirm on CarePath.',
      'Se aplican límites de ingresos. Seguro comercial o apoyo sin seguro — confirma en CarePath.',
      '适用收入限制。商业保险或无保险支持 — 请在 CarePath 确认。',
      'आय दिशानिर्देश लागू। व्यावसायिक बीमा या बिना बीमा सहायता — CarePath पर पुष्टि करें।'
    ),
    callScript: L(
      'Hello, I am calling Janssen CarePath at 1-877-227-3728 about Stelara. Household {size}, income about {income}. I {insured}. Please start an application.',
      'Hola, llamo a Janssen CarePath al 1-877-227-3728 por Stelara. Hogar {size}, ingresos unos {income}. {insured}. Inicien una solicitud.',
      '您好，我打给 Janssen CarePath 1-877-227-3728，咨询 Stelara。家庭 {size} 人，收入大约 {income}。我{insured}。请开始申请。',
      'नमस्ते, मैं Janssen CarePath 1-877-227-3728 पर Stelara के लिए कॉल कर रहा/रही हूँ। घर {size}, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें।'
    ),
  }),
  {
    id: 'rx-outreach',
    name: 'Rx Outreach',
    kind: 'nonprofit',
    sponsor: 'Rx Outreach (nonprofit mail-order pharmacy)',
    medicationIds: GENERIC_IDS,
    covers: L(
      'Nonprofit cash prices for many generics on this list (atorvastatin, metformin, lisinopril, and others). Not a manufacturer PAP.',
      'Precios de farmacia sin fines de lucro para muchos genéricos de esta lista. No es un PAP del fabricante.',
      '本清单中多种仿制药的非营利现金价。不是制药商援助计划。',
      'इस सूची की कई जेनेरिक दवाओं की गैर-लाभ नकद कीमतें। निर्माता PAP नहीं।'
    ),
    summary: L(
      'Mail-order nonprofit pharmacy. No income limit and no PAP form — you pay their listed price with a valid prescription.',
      'Farmacia sin fines de lucro por correo. Sin límite de ingresos ni formulario PAP: pagas el precio publicado con una receta válida.',
      '非营利邮购药房。无收入限制、无援助表格——凭有效处方按公布价格支付。',
      'मेल-ऑर्डर गैर-लाभ फार्मेसी। कोई आय सीमा या PAP फॉर्म नहीं — वैध पर्च के साथ सूची कीमत चुकाएँ।'
    ),
    fplMax: null,
    insuranceRule: 'any',
    closedToNew: false,
    applicationUrl: 'https://rxoutreach.org/patients/',
    phone: '1-888-796-1234',
    verifiedAsOf: '2026-10-13',
    sendWhere: L(
      'Create an account at rxoutreach.org/patients or call 1-888-796-1234. Ask your clinician to e-prescribe or fax 1-800-875-6591.',
      'Crea una cuenta en rxoutreach.org/patients o llama al 1-888-796-1234. Pide receta electrónica o fax al 1-800-875-6591.',
      '在 rxoutreach.org/patients 注册或致电 1-888-796-1234。请医生电子处方或传真 1-800-875-6591。',
      'rxoutreach.org/patients पर खाता बनाएँ या 1-888-796-1234 कॉल करें। डॉक्टर से ई-प्रिस्क्राइब या फैक्स 1-800-875-6591 करवाएँ।'
    ),
    documents: [
      L(
        'Valid U.S. prescription sent to Rx Outreach',
        'Receta válida de EE. UU. enviada a Rx Outreach',
        '发送给 Rx Outreach 的有效美国处方',
        'Rx Outreach को भेजा गया वैध अमेरिकी पर्चा'
      ),
      L(
        'Payment method (they do not bill insurance)',
        'Método de pago (no facturan al seguro)',
        '支付方式（不向保险记账）',
        'भुगतान विधि (वे बीमा को बिल नहीं करते)'
      ),
    ],
    callScript: L(
      'Hello, I am calling Rx Outreach at 1-888-796-1234. I need {drug}. Please check that you carry it and tell me how my doctor should send the prescription. Household {size}; I {insured}.',
      'Hola, llamo a Rx Outreach al 1-888-796-1234. Necesito {drug}. Confirmen si lo tienen y cómo debe enviar la receta mi médico. Hogar {size}; {insured}.',
      '您好，我打给 Rx Outreach 1-888-796-1234。我需要 {drug}。请确认是否有货，并告知医生应如何传送处方。家庭 {size} 人；我{insured}。',
      'नमस्ते, मैं Rx Outreach 1-888-796-1234 पर कॉल कर रहा/रही हूँ। मुझे {drug} चाहिए। पुष्टि करें कि आपके पास है और डॉक्टर पर्चा कैसे भेजें। घर {size}; मैं {insured}।'
    ),
    cutoff: L(
      'No income or insurance cutoff. Not free manufacturer medicine — a nonprofit cash price if the drug is on their list.',
      'Sin tope de ingresos ni de seguro. No es medicina gratis del fabricante.',
      '无收入或保险门槛。不是制药商免费药。',
      'कोई आय या बीमा कटौती नहीं। निर्माता की मुफ्त दवा नहीं।'
    ),
    verifiedNote: L(
      'rxoutreach.org/patients. Phone 1-888-796-1234. Confirm the strength on Find Your Medication.',
      'rxoutreach.org/patients. Teléfono 1-888-796-1234. Confirma la presentación en Find Your Medication.',
      'rxoutreach.org/patients。电话 1-888-796-1234。请在 Find Your Medication 核对规格。',
      'rxoutreach.org/patients। फ़ोन 1-888-796-1234। Find Your Medication पर शक्ति जाँचें।'
    ),
  },
];

export const papById = Object.fromEntries(papPrograms.map((p) => [p.id, p])) as Record<
  string,
  PapProgram
>;
