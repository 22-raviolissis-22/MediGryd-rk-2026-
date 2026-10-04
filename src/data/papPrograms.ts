import type { PapProgram } from '../types';
import { L } from '../i18n';

/**
 * Verified Patient Assistance / free-medicine programs covering drugs in this app.
 * Cross-checked October 2026 against manufacturer sites plus RxAssist and NeedyMeds.
 * Do not add entries that cannot be confirmed. Lilly Cares and AZ&Me do not cover
 * any medication in this catalog, so they are omitted.
 */
export const papPrograms: PapProgram[] = [
  {
    id: 'pfizer-pap',
    name: 'Pfizer Patient Assistance Program (PAP Connect)',
    kind: 'pap',
    sponsor: 'Pfizer / Pfizer Patient Assistance Foundation',
    medicationIds: ['atorvastatin'],
    covers: L(
      'Pfizer-brand Lipitor (atorvastatin). Generic atorvastatin from other makers is not this PAP.',
      'Lipitor de marca Pfizer (atorvastatina). La atorvastatina genérica de otros fabricantes no entra en este PAP.',
      '辉瑞品牌 Lipitor（阿托伐他汀）。其他厂家的仿制药不在此援助计划内。',
      'फाइज़र ब्रांड Lipitor (एटोरवास्टैटिन)। अन्य निर्माताओं की जेनेरिक एटोरवास्टैटिन इस PAP में नहीं है।'
    ),
    summary: L(
      'Free Pfizer primary-care medicines for eligible uninsured or government-insured patients. Apply online with your prescriber through PAP Connect.',
      'Medicamentos de atención primaria de Pfizer gratis para pacientes elegibles sin seguro o con seguro público. Solicita en línea con tu médico en PAP Connect.',
      '符合条件的无保险或政府保险患者可免费获得辉瑞基层用药。与处方医生一起通过 PAP Connect 在线申请。',
      'पात्र बिना बीमा या सरकारी बीमा वाले रोगियों के लिए फाइज़र की प्राथमिक-देखभाल दवाएं मुफ्त। अपने डॉक्टर के साथ PAP Connect पर ऑनलाइन आवेदन करें।'
    ),
    fplMax: 300,
    insuranceRule: 'uninsuredOrGovernment',
    closedToNew: false,
    applicationUrl: 'https://www.pfizerpapconnect.com/',
    phone: '1-844-989-7284',
    sendWhere: L(
      'Apply online at PfizerPAPConnect.com. If you cannot apply online, call 1-844-989-PATH (1-844-989-7284) for the manual process.',
      'Solicita en línea en PfizerPAPConnect.com. Si no puedes en línea, llama al 1-844-989-7284 para el proceso manual.',
      '在 PfizerPAPConnect.com 在线申请。无法在线申请请致电 1-844-989-7284 走书面流程。',
      'PfizerPAPConnect.com पर ऑनलाइन आवेदन करें। ऑनलाइन न हो सके तो मैनुअल प्रक्रिया के लिए 1-844-989-7284 पर कॉल करें।'
    ),
    documents: [
      L(
        'Valid Lipitor prescription and FDA-approved diagnosis',
        'Receta válida de Lipitor y diagnóstico aprobado por la FDA',
        '有效的 Lipitor 处方及 FDA 批准适应症',
        'वैध Lipitor पर्चा और FDA-अनुमोदित निदान'
      ),
      L(
        'Proof of household income (W-2, pay stub, or prior-year tax return)',
        'Comprobante de ingresos del hogar (W-2, talón de pago o declaración de impuestos del año anterior)',
        '家庭收入证明（W-2、工资单或上一年纳税申报）',
        'घरेलू आय का प्रमाण (W-2, वेतन पर्ची, या पिछले वर्ष की टैक्स रिटर्न)'
      ),
      L(
        'Insurance information showing you are uninsured or have government coverage (commercial plans are not eligible)',
        'Información de seguro que muestre que no tienes seguro o tienes cobertura pública (los planes comerciales no califican)',
        '保险信息，证明无保险或持有政府保险（商业保险不符合）',
        'बीमा जानकारी जो दिखाए कि आप बिना बीमा हैं या सरकारी कवरेज है (व्यावसायिक योजनाएं पात्र नहीं)'
      ),
    ],
    callScript: L(
      'Hello, I need help applying to the Pfizer Patient Assistance Program for Lipitor. My household has {size} people and my income is about {income}. I {insured}. Can you start PAP Connect or mail a paper application? The number I was given is 1-844-989-7284.',
      'Hola, necesito ayuda para solicitar el Programa de Asistencia al Paciente de Pfizer para Lipitor. Somos {size} en el hogar y mis ingresos son unos {income}. {insured}. ¿Pueden iniciar PAP Connect o enviarme una solicitud en papel? El número es 1-844-989-7284.',
      '您好，我需要申请辉瑞患者援助计划以获得 Lipitor。我家有 {size} 人，收入大约 {income}。我{insured}。能否帮我开通 PAP Connect 或寄纸质申请表？电话是 1-844-989-7284。',
      'नमस्ते, मुझे Lipitor के लिए फाइज़र रोगी सहायता कार्यक्रम में आवेदन करने में मदद चाहिए। घर में {size} लोग हैं और आय लगभग {income} है। मैं {insured}। क्या आप PAP Connect शुरू कर सकते हैं या कागज़ी आवेदन भेज सकते हैं? नंबर 1-844-989-7284 है।'
    ),
    cutoff: L(
      'At or below 300% of the federal poverty level (pre-tax household income). Uninsured or government-insured only; commercial insurance is not eligible.',
      'Hasta el 300% del nivel federal de pobreza (ingresos del hogar antes de impuestos). Solo sin seguro o con seguro público; el seguro comercial no califica.',
      '税前年家庭收入不超过联邦贫困线的 300%。仅限无保险或政府保险；商业保险不符合。',
      'संघीय गरीबी रेखा के 300% या उससे कम (कर-पूर्व घरेलू आय)। केवल बिना बीमा या सरकारी बीमा; व्यावसायिक बीमा पात्र नहीं।'
    ),
    verifiedNote: L(
      'Confirmed on Pfizer RxPathways (income table and PAP Connect application). Listed in RxAssist / NeedyMeds manufacturer PAP directories.',
      'Confirmado en Pfizer RxPathways (tabla de ingresos y solicitud PAP Connect). Aparece en los directorios de PAP de RxAssist / NeedyMeds.',
      '已在 Pfizer RxPathways 核对（收入表与 PAP Connect 申请）。亦见于 RxAssist / NeedyMeds 制药商援助目录。',
      'Pfizer RxPathways पर पुष्टि (आय तालिका और PAP Connect आवेदन)। RxAssist / NeedyMeds निर्माता PAP निर्देशिकाओं में सूचीबद्ध।'
    ),
  },
  {
    id: 'gsk-pap',
    name: 'GSK Patient Assistance Program',
    kind: 'pap',
    sponsor: 'GSK Patient Access Programs Foundation',
    medicationIds: ['albuterol', 'advair'],
    covers: L(
      'GSK-brand Ventolin HFA and Advair Diskus (and other listed GSK prescription medicines on the application). Generic albuterol or fluticasone/salmeterol from other makers is not this PAP.',
      'Ventolin HFA y Advair Diskus de marca GSK (y otros medicamentos GSK listados en la solicitud). El albuterol o fluticasona/salmeterol genérico de otros fabricantes no entra en este PAP.',
      'GSK 品牌 Ventolin HFA 与 Advair Diskus（以及申请表上列出的其他 GSK 处方药）。其他厂家的仿制沙丁胺醇或氟替卡松/沙美特罗不在此计划内。',
      'GSK ब्रांड Ventolin HFA और Advair Diskus (और आवेदन पर सूचीबद्ध अन्य GSK दवाएं)। अन्य निर्माताओं की जेनेरिक अल्ब्यूटेरॉल या फ्लुटिकासोन/साल्मेटेरॉल इस PAP में नहीं है।'
    ),
    summary: L(
      'Certain GSK medicines at no cost. Uninsured patients, or Medicare Part D patients who have spent $600 on prescriptions this calendar year, may apply. Re-enrollment is typically every 12 months.',
      'Ciertos medicamentos de GSK sin costo. Pueden solicitar pacientes sin seguro, o con Medicare Parte D que hayan gastado $600 en recetas este año. La reinscripción suele ser cada 12 meses.',
      '部分 GSK 药品免费。无保险患者，或本日历年处方药自付已达 600 美元的 Medicare D 部分患者可申请。通常每 12 个月需重新登记。',
      'कुछ GSK दवाएं बिना लागत। बिना बीमा, या इस कैलेंडर वर्ष में पर्चे पर $600 खर्च कर चुके Medicare भाग D रोगी आवेदन कर सकते हैं। आमतौर पर हर 12 महीने में फिर नामांकन।'
    ),
    fplMax: 300,
    insuranceRule: 'uninsuredOrMedicare',
    closedToNew: false,
    applicationUrl:
      'https://gskforyou.com/content/dam/cf-pharma/gskforyou/master/pdf/GSK-PAP-English.pdf',
    phone: '1-866-728-4368',
    sendWhere: L(
      'Fax the signed application, prescription, and income/insurance papers to 1-855-474-3063, or mail GSK Patient Assistance Program, PO Box 220590, Charlotte, NC 28222-0590. Hours: Monday–Friday 8am–8pm ET.',
      'Envía por fax la solicitud firmada, la receta y los papeles de ingresos/seguro al 1-855-474-3063, o por correo a GSK Patient Assistance Program, PO Box 220590, Charlotte, NC 28222-0590. Lunes a viernes, 8 a. m.–8 p. m. ET.',
      '将已签字的申请、处方及收入/保险材料传真至 1-855-474-3063，或邮寄 GSK Patient Assistance Program, PO Box 220590, Charlotte, NC 28222-0590。周一至周五东部时间 8:00–20:00。',
      'हस्ताक्षरित आवेदन, पर्चा और आय/बीमा कागज़ात 1-855-474-3063 पर फ़ैक्स करें, या डाक से GSK Patient Assistance Program, PO Box 220590, Charlotte, NC 28222-0590। सोम–शुक्र सुबह 8–शाम 8 ET।'
    ),
    documents: [
      L(
        'Completed, signed GSK PAP non-vaccine application',
        'Solicitud GSK PAP (no vacunas) completa y firmada',
        '填妥并签字的 GSK PAP 非疫苗申请表',
        'पूरा और हस्ताक्षरित GSK PAP गैर-टीका आवेदन'
      ),
      L(
        'Signed original prescription (faxes must come from the prescriber’s office with a cover sheet)',
        'Receta original firmada (los faxes deben salir del consultorio con portada)',
        '医生签字的原始处方（传真须从诊所发出并附封面页）',
        'हस्ताक्षरित मूल पर्चा (फ़ैक्स डॉक्टर के कार्यालय से कवर शीट के साथ होना चाहिए)'
      ),
      L(
        'Proof of household income; Medicare Part D patients also need an EOB showing $600 spent on prescriptions this year',
        'Comprobante de ingresos; si tienes Medicare Parte D, también un EOB que muestre $600 gastados en recetas este año',
        '家庭收入证明；Medicare D 部分患者还需本年度处方药已花费 600 美元的给付说明（EOB）',
        'घरेलू आय का प्रमाण; Medicare भाग D पर इस वर्ष पर्चे पर $600 खर्च दिखाता EOB भी चाहिए'
      ),
    ],
    callScript: L(
      'Hello, I am calling the GSK Patient Assistance Program at 1-866-728-4368 about {drug}. I live in the United States. My household has {size} people and my income is about {income}. I {insured}. Please send or walk me through the non-vaccine PAP application, and tell me whether to fax 1-855-474-3063 or mail PO Box 220590, Charlotte, NC 28222.',
      'Hola, llamo al Programa de Asistencia de GSK al 1-866-728-4368 por {drug}. Vivo en Estados Unidos. Somos {size} en el hogar y mis ingresos son unos {income}. {insured}. Ayúdenme con la solicitud PAP (no vacunas) y díganme si debo enviar fax al 1-855-474-3063 o correo a PO Box 220590, Charlotte, NC 28222.',
      '您好，我打给 GSK 患者援助计划 1-866-728-4368，咨询 {drug}。我住在美国。家中 {size} 人，收入大约 {income}。我{insured}。请协助非疫苗 PAP 申请，并告知应传真 1-855-474-3063 还是邮寄 PO Box 220590, Charlotte, NC 28222。',
      'नमस्ते, मैं GSK रोगी सहायता 1-866-728-4368 पर {drug} के बारे में कॉल कर रहा/रही हूँ। मैं अमेरिका में रहता/रहती हूँ। घर में {size} लोग, आय लगभग {income}। मैं {insured}। कृपया गैर-टीका PAP आवेदन बताएँ, फ़ैक्स 1-855-474-3063 या डाक PO Box 220590, Charlotte, NC 28222।'
    ),
    cutoff: L(
      'Household income at or below 300% FPL (for example $47,880 for 1 person in the 48 contiguous states, 2026). Uninsured with no drug coverage, or Medicare Part D after $600 spent this year. Commercial insurance is generally directed elsewhere.',
      'Ingresos del hogar ≤300% del FPL (p. ej. $47,880 para 1 persona en los 48 estados contiguos, 2026). Sin seguro de medicamentos, o Medicare Parte D después de gastar $600 este año. El seguro comercial suele ir a otros programas.',
      '家庭收入不超过联邦贫困线 300%（2026 年美国本土 1 人约 47,880 美元）。无药品保险，或本年度已花费 600 美元的 Medicare D 部分。商业保险一般走其他项目。',
      'घरेलू आय ≤300% FPL (2026 में 48 राज्यों में 1 व्यक्ति के लिए उदाहरण $47,880)। बिना दवा कवरेज, या इस वर्ष $600 खर्च के बाद Medicare भाग D। व्यावसायिक बीमा आमतौर पर अन्य कार्यक्रमों की ओर जाता है।'
    ),
    verifiedNote: L(
      'Application PDF, PO Box, fax, and phone from GSK For You / GSKPAF. Income tables and $600 Medicare rule on gskpaf.org. Ventolin HFA and Advair Diskus are GSK inhalers in this PAP.',
      'PDF de solicitud, apartado postal, fax y teléfono de GSK For You / GSKPAF. Tablas de ingresos y regla de $600 de Medicare en gskpaf.org. Ventolin HFA y Advair Diskus son inhaladores GSK de este PAP.',
      '申请 PDF、邮箱、传真和电话来自 GSK For You / GSKPAF。收入表与 Medicare 600 美元规则见 gskpaf.org。Ventolin HFA 与 Advair Diskus 为本计划中的 GSK 吸入器。',
      'आवेदन PDF, PO Box, फ़ैक्स और फ़ोन GSK For You / GSKPAF से। आय तालिका और Medicare $600 नियम gskpaf.org पर। Ventolin HFA और Advair Diskus इस PAP के GSK इनहेलर हैं।'
    ),
  },
  {
    id: 'sanofi-spc',
    name: 'Sanofi Patient Connection',
    kind: 'pap',
    sponsor: 'Sanofi Cares North America',
    medicationIds: ['insulin-glargine'],
    covers: L(
      'Lantus (insulin glargine) and Toujeo, plus other Sanofi products listed on the application.',
      'Lantus (insulina glargina) y Toujeo, más otros productos Sanofi listados en la solicitud.',
      'Lantus（甘精胰岛素）和 Toujeo，以及申请表上列出的其他赛诺菲产品。',
      'Lantus (इंसुलिन ग्लार्जिन) और Toujeo, तथा आवेदन पर सूचीबद्ध अन्य Sanofi उत्पाद।'
    ),
    summary: L(
      'Free Sanofi medicine if household income is at or below 400% FPL and you have no coverage — or no access to the product through your insurance. Assistance is for up to 12 months; reapply each year.',
      'Medicamento Sanofi gratis si los ingresos del hogar son ≤400% del FPL y no tienes cobertura, o no tienes acceso al producto por tu seguro. La ayuda dura hasta 12 meses; vuelve a solicitar cada año.',
      '若家庭收入不超过联邦贫困线 400%，且没有保险覆盖或保险无法获得该药品，可免费获得赛诺菲药品。援助最长 12 个月，需每年重新申请。',
      'यदि घरेलू आय ≤400% FPL है और कवरेज नहीं है — या बीमा से दवा नहीं मिलती — तो Sanofi दवा मुफ्त। सहायता 12 महीने तक; हर साल फिर आवेदन करें।'
    ),
    fplMax: 400,
    insuranceRule: 'any',
    closedToNew: false,
    applicationUrl: 'https://www.sanofipatientconnection.com/media/pdf/SPC_Application.pdf',
    phone: '1-888-847-4877',
    sendWhere: L(
      'Download the application, complete it with your doctor (both must sign), then fax 1-888-847-1797 or mail Sanofi Patient Connection, PO Box 222138, Charlotte, NC 28222-2138. Phone Monday–Friday 9am–8pm ET.',
      'Descarga la solicitud, complétala con tu médico (ambos deben firmar) y envía por fax al 1-888-847-1797 o por correo a Sanofi Patient Connection, PO Box 222138, Charlotte, NC 28222-2138. Teléfono lunes a viernes, 9 a. m.–8 p. m. ET.',
      '下载申请表，与医生共同填写（双方签字），传真 1-888-847-1797 或邮寄 Sanofi Patient Connection, PO Box 222138, Charlotte, NC 28222-2138。电话周一至周五东部时间 9:00–20:00。',
      'आवेदन डाउनलोड करें, डॉक्टर के साथ भरें (दोनों हस्ताक्षर), फिर फ़ैक्स 1-888-847-1797 या डाक Sanofi Patient Connection, PO Box 222138, Charlotte, NC 28222-2138। फ़ोन सोम–शुक्र सुबह 9–शाम 8 ET।'
    ),
    documents: [
      L(
        'Sanofi Patient Connection application signed by you and your prescriber',
        'Solicitud de Sanofi Patient Connection firmada por ti y tu médico',
        '由你和处方医生签字的 Sanofi Patient Connection 申请表',
        'आप और आपके डॉक्टर द्वारा हस्ताक्षरित Sanofi Patient Connection आवेदन'
      ),
      L(
        'Proof of household income at or below 400% FPL',
        'Comprobante de ingresos del hogar ≤400% del FPL',
        '家庭收入不超过联邦贫困线 400% 的证明',
        'घरेलू आय ≤400% FPL का प्रमाण'
      ),
      L(
        'If you may be eligible for Medicaid, a Medicaid denial letter before they assess PAP eligibility',
        'Si podrías calificar para Medicaid, una carta de denegación de Medicaid antes de evaluar el PAP',
        '若可能符合 Medicaid，需先提供 Medicaid 拒绝信，然后才评估援助资格',
        'यदि Medicaid के पात्र हो सकते हैं, तो PAP मूल्यांकन से पहले Medicaid अस्वीकृति पत्र'
      ),
    ],
    callScript: L(
      'Hello, I am calling Sanofi Patient Connection at 1-888-847-4877 about Lantus. My household has {size} people and my income is about {income}. I {insured}. Please mail me an application or confirm I can fax the PDF to 1-888-847-1797. I understand I must reapply every 12 months.',
      'Hola, llamo a Sanofi Patient Connection al 1-888-847-4877 por Lantus. Somos {size} en el hogar y mis ingresos son unos {income}. {insured}. Envíenme una solicitud o confirmen que puedo faxear el PDF al 1-888-847-1797. Entiendo que debo volver a solicitar cada 12 meses.',
      '您好，我打给 Sanofi Patient Connection 1-888-847-4877，咨询 Lantus。家中 {size} 人，收入大约 {income}。我{insured}。请寄申请表，或确认可将 PDF 传真至 1-888-847-1797。我知道须每 12 个月重新申请。',
      'नमस्ते, मैं Sanofi Patient Connection 1-888-847-4877 पर Lantus के लिए कॉल कर रहा/रही हूँ। घर में {size} लोग, आय लगभग {income}। मैं {insured}। कृपया आवेदन भेजें या पुष्टि करें कि PDF 1-888-847-1797 पर फ़ैक्स कर सकता/सकती हूँ। मुझे पता है हर 12 महीने में फिर आवेदन करना होगा।'
    ),
    cutoff: L(
      'Household income at or below 400% FPL (for example $63,840 for 1 person in the 48 contiguous states, 2026). No insurance coverage, or no access to Lantus through your plan. Commercial patients may qualify only if the plan does not cover the product.',
      'Ingresos del hogar ≤400% del FPL (p. ej. $63,840 para 1 persona en los 48 estados contiguos, 2026). Sin cobertura, o sin acceso a Lantus a través de tu plan. Con seguro comercial solo si el plan no cubre el producto.',
      '家庭收入不超过联邦贫困线 400%（2026 年美国本土 1 人约 63,840 美元）。无保险，或保险计划无法获得 Lantus。商业保险仅在计划不覆盖该药时可能符合。',
      'घरेलू आय ≤400% FPL (2026 में 48 राज्यों में 1 व्यक्ति के लिए उदाहरण $63,840)। कोई कवरेज नहीं, या योजना से Lantus नहीं मिलता। व्यावसायिक बीमा तभी यदि योजना दवा कवर न करे।'
    ),
    verifiedNote: L(
      'Lantus listed on the official SPC application PDF. FPL table and 12-month reapply rule on sanofipatientconnection.com.',
      'Lantus figura en el PDF oficial de solicitud de SPC. Tabla de FPL y reinscripción a 12 meses en sanofipatientconnection.com.',
      '官方 SPC 申请 PDF 列有 Lantus。联邦贫困线表与 12 个月再申请规则见 sanofipatientconnection.com。',
      'आधिकारिक SPC आवेदन PDF पर Lantus सूचीबद्ध। FPL तालिका और 12-महीने पुनः आवेदन sanofipatientconnection.com पर।'
    ),
  },
  {
    id: 'novo-pap',
    name: 'Novo Nordisk Patient Assistance Program',
    kind: 'pap',
    sponsor: 'Novo Nordisk / NovoCare',
    medicationIds: ['ozempic'],
    covers: L(
      'Ozempic (semaglutide injection) for uninsured patients who meet the 2026 Ozempic-specific income cap. Medicare Part D patients are not eligible for Ozempic PAP in 2026.',
      'Ozempic (semaglutida inyectable) para pacientes sin seguro que cumplan el tope de ingresos 2026 específico de Ozempic. Los pacientes de Medicare Parte D no son elegibles para el PAP de Ozempic en 2026.',
      'Ozempic（司美格鲁肽注射液），面向符合 2026 年 Ozempic 专项收入上限的无保险患者。2026 年 Medicare D 部分患者不符合 Ozempic 援助计划。',
      'Ozempic (सेमाग्लूटाइड इंजेक्शन) बिना बीमा वाले रोगियों के लिए जो 2026 की Ozempic-विशिष्ट आय सीमा पूरी करें। 2026 में Medicare भाग D रोगी Ozempic PAP के पात्र नहीं।'
    ),
    summary: L(
      'Free Ozempic if you are uninsured, a U.S. resident, and household income is at or below 200% FPL. Apply online (you need your provider’s email) or use the paper form. Enrollment expires; you must reapply.',
      'Ozempic gratis si no tienes seguro, resides en EE. UU. y los ingresos del hogar son ≤200% del FPL. Solicita en línea (necesitas el correo de tu médico) o usa el formulario en papel. La inscripción caduca; debes volver a solicitar.',
      '若无保险、为美国居民且家庭收入不超过联邦贫困线 200%，可免费获得 Ozempic。在线申请（需医生邮箱）或使用纸质表。登记会到期，必须重新申请。',
      'यदि बिना बीमा, अमेरिका निवासी, और घरेलू आय ≤200% FPL हो तो Ozempic मुफ्त। ऑनलाइन आवेदन करें (डॉक्टर का ईमेल चाहिए) या कागज़ी फ़ॉर्म। नामांकन समाप्त होता है; फिर आवेदन करें।'
    ),
    fplMax: 200,
    insuranceRule: 'uninsured',
    closedToNew: false,
    applicationUrl: 'https://diabetespap.novocare.com/',
    phone: '1-866-310-7549',
    sendWhere: L(
      'Fastest: online at diabetespap.novocare.com (patient portion, then your clinician completes theirs by email). Paper: NovoCare PAP application PDF; fax 1-866-441-4190 or mail Novo Nordisk, Inc., PO Box 370, Somerville, NJ 08876. Faxes must come from the prescriber’s office.',
      'Más rápido: en línea en diabetespap.novocare.com (tú llenas tu parte; el clínico completa la suya por correo). Papel: PDF de NovoCare PAP; fax 1-866-441-4190 o correo Novo Nordisk, Inc., PO Box 370, Somerville, NJ 08876. Los faxes deben salir del consultorio.',
      '最快：在 diabetespap.novocare.com 在线填写患者部分，临床医生通过邮件完成其部分。纸质：NovoCare PAP 申请 PDF；传真 1-866-441-4190 或邮寄 Novo Nordisk, Inc., PO Box 370, Somerville, NJ 08876。传真须从诊所发出。',
      'सबसे तेज़: diabetespap.novocare.com पर ऑनलाइन (रोगी भाग, फिर क्लिनिशियन ईमेल से)। कागज़: NovoCare PAP PDF; फ़ैक्स 1-866-441-4190 या डाक Novo Nordisk, Inc., PO Box 370, Somerville, NJ 08876। फ़ैक्स डॉक्टर के कार्यालय से।'
    ),
    documents: [
      L(
        'Patient and prescriber sections of the PAP application',
        'Secciones del paciente y del médico en la solicitud PAP',
        '援助申请的患者部分与医生部分',
        'PAP आवेदन के रोगी और डॉक्टर खंड'
      ),
      L(
        'Proof of income at or below 200% FPL, or consent to a soft credit inquiry',
        'Comprobante de ingresos ≤200% del FPL, o consentimiento para una consulta de crédito suave',
        '收入不超过联邦贫困线 200% 的证明，或同意软性信用查询',
        'आय ≤200% FPL का प्रमाण, या सॉफ्ट क्रेडिट जाँच की सहमति'
      ),
      L(
        'If you appear Medicaid-eligible, a Medicaid denial letter',
        'Si podrías calificar para Medicaid, una carta de denegación de Medicaid',
        '若看起来符合 Medicaid，需提供 Medicaid 拒绝信',
        'यदि Medicaid-पात्र लगते हैं, तो Medicaid अस्वीकृति पत्र'
      ),
    ],
    callScript: L(
      'Hello, I am calling NovoCare PAP at 1-866-310-7549 about Ozempic. I am uninsured. My household has {size} people and my income is about {income}. I need the 2026 patient assistance application. I have my doctor’s email for the online form at diabetespap.novocare.com.',
      'Hola, llamo a NovoCare PAP al 1-866-310-7549 por Ozempic. No tengo seguro. Somos {size} en el hogar y mis ingresos son unos {income}. Necesito la solicitud 2026. Tengo el correo de mi médico para el formulario en diabetespap.novocare.com.',
      '您好，我打给 NovoCare PAP 1-866-310-7549，咨询 Ozempic。我没有保险。家中 {size} 人，收入大约 {income}。我需要 2026 年援助申请。我有医生邮箱，可在 diabetespap.novocare.com 填写。',
      'नमस्ते, मैं NovoCare PAP 1-866-310-7549 पर Ozempic के लिए कॉल कर रहा/रही हूँ। मेरे पास बीमा नहीं है। घर में {size} लोग, आय लगभग {income}। मुझे 2026 आवेदन चाहिए। ऑनलाइन फ़ॉर्म diabetespap.novocare.com के लिए डॉक्टर का ईमेल है।'
    ),
    cutoff: L(
      'Uninsured only for Ozempic, at or below 200% FPL (for example $31,920 for 1 person in the 48 contiguous states, 2026). Commercial insurance is not eligible. Medicare Part D is not eligible for Ozempic PAP in 2026.',
      'Solo sin seguro para Ozempic, ≤200% del FPL (p. ej. $31,920 para 1 persona en los 48 estados contiguos, 2026). El seguro comercial no califica. Medicare Parte D no es elegible para el PAP de Ozempic en 2026.',
      'Ozempic 仅限无保险，收入不超过联邦贫困线 200%（2026 年美国本土 1 人约 31,920 美元）。商业保险不符合。2026 年 Medicare D 部分不符合 Ozempic 援助。',
      'Ozempic के लिए केवल बिना बीमा, ≤200% FPL (2026 में 48 राज्यों में 1 व्यक्ति के लिए उदाहरण $31,920)। व्यावसायिक बीमा पात्र नहीं। 2026 में Medicare भाग D Ozempic PAP के लिए पात्र नहीं।'
    ),
    verifiedNote: L(
      'NovoCare Ozempic 200% FPL rule and 1-866-310-7549 on novocare.com; online apply at diabetespap.novocare.com. Also reflected in independent 2026 PAP guides and NeedyMeds/RxAssist listings.',
      'Regla de 200% FPL de Ozempic y el 1-866-310-7549 en novocare.com; solicitud en diabetespap.novocare.com. También en guías PAP 2026 y listados de NeedyMeds/RxAssist.',
      'NovoCare 网站上的 Ozempic 200% 贫困线规则与电话 1-866-310-7549；在线申请 diabetespap.novocare.com。亦见于 2026 年独立 PAP 指南及 NeedyMeds/RxAssist。',
      'NovoCare पर Ozempic 200% FPL नियम और 1-866-310-7549; ऑनलाइन diabetespap.novocare.com। 2026 PAP गाइड और NeedyMeds/RxAssist में भी।'
    ),
  },
  {
    id: 'bms-paf',
    name: 'Bristol Myers Squibb Patient Assistance Foundation',
    kind: 'pap',
    sponsor: 'Bristol Myers Squibb Patient Assistance Foundation',
    medicationIds: ['eliquis'],
    covers: L(
      'Eliquis (apixaban), listed on the BMSPAF application and bmspaf.org medicines list.',
      'Eliquis (apixabán), listado en la solicitud de BMSPAF y en la lista de medicamentos de bmspaf.org.',
      'Eliquis（阿哌沙班），列于 BMSPAF 申请表及 bmspaf.org 药品名单。',
      'Eliquis (एपिक्सैबन), BMSPAF आवेदन और bmspaf.org दवा सूची पर।'
    ),
    summary: L(
      'Free Eliquis for eligible patients. You generally must lack coverage for the medicine, or have Medicare Part D and have spent at least 3% of yearly household income on out-of-pocket prescriptions this calendar year. The Foundation does not publish a public FPL percentage.',
      'Eliquis gratis para pacientes elegibles. Por lo general no debes tener cobertura del medicamento, o tener Medicare Parte D y haber gastado al menos el 3% de los ingresos anuales del hogar en recetas de bolsillo este año. La Fundación no publica un porcentaje de FPL.',
      '符合条件者可免费获得 Eliquis。通常须没有该药保险，或有 Medicare D 部分且本日历年处方药自付已达年家庭收入的 3%。基金会未公布公开的贫困线百分比。',
      'पात्र रोगियों के लिए Eliquis मुफ्त। आम तौर पर दवा का कवरेज न हो, या Medicare भाग D हो और इस वर्ष जेब से पर्चे पर वार्षिक घरेलू आय का कम से कम 3% खर्च हो। फाउंडेशन सार्वजनिक FPL प्रतिशत नहीं छापती।'
    ),
    fplMax: null,
    insuranceRule: 'uninsuredOrMedicare',
    closedToNew: false,
    applicationUrl: 'https://www.bmspaf.org/apply',
    phone: '1-800-736-0003',
    sendWhere: L(
      'Start at bmspaf.org/apply (eligibility check, then application). You can also mail the completed form to Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769 or fax 1-800-736-1611. Phone Monday–Friday 8am–8pm ET. Applying directly is free.',
      'Empieza en bmspaf.org/apply (elegibilidad y luego solicitud). También puedes enviar el formulario a Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769 o fax 1-800-736-1611. Lunes a viernes, 8 a. m.–8 p. m. ET. Solicitar directo es gratis.',
      '从 bmspaf.org/apply 开始（资格评估后申请）。也可将填妥表格邮寄 Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769，或传真 1-800-736-1611。电话周一至周五东部时间 8:00–20:00。直接申请免费。',
      'bmspaf.org/apply से शुरू करें। फॉर्म डाक से Bristol Myers Squibb Patient Assistance Foundation, PO Box 220769, Charlotte, NC 28222-0769 या फ़ैक्स 1-800-736-1611। सोम–शुक्र सुबह 8–शाम 8 ET। सीधे आवेदन मुफ्त है।'
    ),
    documents: [
      L(
        'Completed BMSPAF application signed by you and your licensed prescriber',
        'Solicitud BMSPAF completa firmada por ti y tu médico autorizado',
        '由你和持照处方医生签字的完整 BMSPAF 申请',
        'आप और लाइसेंसशुदा डॉक्टर द्वारा हस्ताक्षरित पूरा BMSPAF आवेदन'
      ),
      L(
        'Proof of household income (tax return, W-2, 1099, or consecutive pay stubs) — the Foundation compares this to its unpublished limits',
        'Comprobante de ingresos del hogar (declaración, W-2, 1099 o talones de pago) — la Fundación lo compara con sus límites no publicados',
        '家庭收入证明（纳税申报、W-2、1099 或连续工资单）——基金会用其未公开的限额比对',
        'घरेलू आय का प्रमाण (टैक्स रिटर्न, W-2, 1099, या वेतन पर्चियाँ) — फाउंडेशन इसे अपनी अप्रकाशित सीमाओं से मिलाती है'
      ),
      L(
        'Medicare Part D: pharmacy report showing out-of-pocket prescription spend of at least 3% of household income this year, plus Extra Help/LIS denial if requested',
        'Medicare Parte D: informe de farmacia con gasto de bolsillo de al menos el 3% de los ingresos del hogar este año, y denegación de Extra Help/LIS si la piden',
        'Medicare D 部分：药房报告，显示本年度处方药自付至少达家庭收入的 3%；如要求还需 Extra Help/LIS 拒绝信',
        'Medicare भाग D: इस वर्ष घरेलू आय के कम से कम 3% जेब खर्च की फार्मेसी रिपोर्ट, और माँगे जाने पर Extra Help/LIS अस्वीकृति'
      ),
    ],
    callScript: L(
      'Hello, I am calling the Bristol Myers Squibb Patient Assistance Foundation at 1-800-736-0003 about Eliquis. My household has {size} people and my income is about {income}. I {insured}. Please start an application or tell me how to submit to PO Box 220769, Charlotte, NC 28222 or fax 1-800-736-1611. I know you do not publish the exact income cutoff.',
      'Hola, llamo a la Fundación de Asistencia de Bristol Myers Squibb al 1-800-736-0003 por Eliquis. Somos {size} en el hogar y mis ingresos son unos {income}. {insured}. Inicien una solicitud o díganme cómo enviar a PO Box 220769, Charlotte, NC 28222 o fax 1-800-736-1611. Sé que no publican el corte exacto de ingresos.',
      '您好，我打给 Bristol Myers Squibb 患者援助基金会 1-800-736-0003，咨询 Eliquis。家中 {size} 人，收入大约 {income}。我{insured}。请开始申请，或告知如何提交至 PO Box 220769, Charlotte, NC 28222 或传真 1-800-736-1611。我知道你们不公布精确收入上限。',
      'नमस्ते, मैं Bristol Myers Squibb Patient Assistance Foundation 1-800-736-0003 पर Eliquis के लिए कॉल कर रहा/रही हूँ। घर में {size} लोग, आय लगभग {income}। मैं {insured}। कृपया आवेदन शुरू करें या PO Box 220769, Charlotte, NC 28222 / फ़ैक्स 1-800-736-1611 बताएँ। मुझे पता है सटीक आय कटौती प्रकाशित नहीं है।'
    ),
    cutoff: L(
      'Income must be below the Foundation’s unpublished household limits (not posted as a public FPL %). Uninsured for Eliquis, or Medicare Part D after 3% of household income spent on prescriptions this year. Medicaid-eligible patients need a denial. Commercial insurance is generally not this program.',
      'Los ingresos deben estar por debajo de los límites no publicados de la Fundación (no hay un % de FPL público). Sin cobertura de Eliquis, o Medicare Parte D tras gastar el 3% de los ingresos del hogar en recetas este año. Si podrías tener Medicaid, hace falta una denegación. El seguro comercial por lo general no es este programa.',
      '收入须低于基金会未公布的家庭限额（没有公开的贫困线百分比）。Eliquis 无保险，或 Medicare D 部分且本年度处方自付已达家庭收入的 3%。可能符合 Medicaid 者需拒绝信。商业保险一般不属于本计划。',
      'आय फाउंडेशन की अप्रकाशित घरेलू सीमा से नीचे होनी चाहिए (सार्वजनिक FPL % नहीं)। Eliquis बिना कवरेज, या इस वर्ष पर्चे पर घरेलू आय का 3% खर्च करने के बाद Medicare भाग D। Medicaid-पात्र को अस्वीकृति चाहिए। व्यावसायिक बीमा आम तौर पर यह कार्यक्रम नहीं है।'
    ),
    verifiedNote: L(
      'Eliquis named on bmspaf.org and the NeedyMeds BMSPAF application PDF (assets.needymeds.org/papforms/bmspae0042.pdf): phone 800-736-0003, fax 800-736-1611, PO Box 220769.',
      'Eliquis aparece en bmspaf.org y en el PDF de solicitud BMSPAF de NeedyMeds (assets.needymeds.org/papforms/bmspae0042.pdf): teléfono 800-736-0003, fax 800-736-1611, PO Box 220769.',
      'Eliquis 见于 bmspaf.org 及 NeedyMeds 的 BMSPAF 申请 PDF：电话 800-736-0003，传真 800-736-1611，PO Box 220769。',
      'Eliquis bmspaf.org और NeedyMeds BMSPAF आवेदन PDF पर: फ़ोन 800-736-0003, फ़ैक्स 800-736-1611, PO Box 220769।'
    ),
  },
  {
    id: 'abbvie-humira',
    name: 'myAbbVie Assist (HUMIRA)',
    kind: 'pap',
    sponsor: 'AbbVie',
    medicationIds: ['humira'],
    covers: L(
      'HUMIRA (adalimumab) — new-patient enrollment closed.',
      'HUMIRA (adalimumab) — el alta de pacientes nuevos está cerrada.',
      'HUMIRA（阿达木单抗）——已停止接收新患者。',
      'HUMIRA (आदालिमुमैब) — नए रोगी नामांकन बंद।'
    ),
    summary: L(
      'Effective July 1, 2026, myAbbVie Assist no longer accepts new HUMIRA patients. People already enrolled are supported only through the end of their current eligibility term and cannot renew HUMIRA. This is not an open PAP.',
      'Desde el 1 de julio de 2026, myAbbVie Assist ya no acepta pacientes nuevos de HUMIRA. Quienes ya están inscritos solo reciben apoyo hasta el final de su período actual y no pueden renovar HUMIRA. Esto no es un PAP abierto.',
      '自 2026 年 7 月 1 日起，myAbbVie Assist 不再接收 HUMIRA 新患者。已在册者仅支持至当前资格期结束，且不能为 HUMIRA 续期。这不是开放的援助计划。',
      '1 जुलाई 2026 से myAbbVie Assist नए HUMIRA रोगियों को स्वीकार नहीं करता। पहले से नामांकित केवल वर्तमान पात्रता अवधि तक समर्थित हैं और HUMIRA नवीकरण नहीं कर सकते। यह खुला PAP नहीं है।'
    ),
    fplMax: null,
    insuranceRule: 'any',
    closedToNew: true,
    applicationUrl:
      'https://www.abbvie.com/patients/patient-support/patient-assistance/available-programs/humira-program-update.html',
    phone: '1-800-222-6885',
    sendWhere: L(
      'Do not send a new HUMIRA PAP application. Read AbbVie’s HUMIRA program update page. Existing enrollees: 1-800-222-6885, Monday–Friday 7am–7pm CT; fax 1-866-250-2803. Mail for other AbbVie products (not new HUMIRA): AbbVie Patient Access Support, D-617927, AP5 NE, 1 N. Waukegan Rd., North Chicago, IL 60064.',
      'No envíes una solicitud nueva de PAP para HUMIRA. Lee la página de actualización de AbbVie. Ya inscritos: 1-800-222-6885, lunes a viernes 7 a. m.–7 p. m. CT; fax 1-866-250-2803. Correo para otros productos AbbVie (no HUMIRA nuevo): AbbVie Patient Access Support, D-617927, AP5 NE, 1 N. Waukegan Rd., North Chicago, IL 60064.',
      '请勿提交新的 HUMIRA 援助申请。请阅读 AbbVie 的 HUMIRA 计划更新页。已在册者：1-800-222-6885，周一至周五中部时间 7:00–19:00；传真 1-866-250-2803。其他 AbbVie 产品邮寄（非新 HUMIRA）：AbbVie Patient Access Support, D-617927, AP5 NE, 1 N. Waukegan Rd., North Chicago, IL 60064。',
      'नया HUMIRA PAP आवेदन न भेजें। AbbVie की HUMIRA अपडेट पेज पढ़ें। मौजूदा नामांकित: 1-800-222-6885, सोम–शुक्र सुबह 7–शाम 7 CT; फ़ैक्स 1-866-250-2803। अन्य AbbVie उत्पादों के लिए डाक (नया HUMIRA नहीं): AbbVie Patient Access Support, D-617927, AP5 NE, 1 N. Waukegan Rd., North Chicago, IL 60064।'
    ),
    documents: [
      L(
        'New HUMIRA applicants: none — the PAP is closed to new patients as of July 1, 2026',
        'Solicitantes nuevos de HUMIRA: ninguno — el PAP está cerrado a pacientes nuevos desde el 1 de julio de 2026',
        'HUMIRA 新申请人：无需材料——自 2026 年 7 月 1 日起该援助已对新增患者关闭',
        'नए HUMIRA आवेदक: कुछ नहीं — 1 जुलाई 2026 से PAP नए रोगियों के लिए बंद है'
      ),
      L(
        'Current enrollees: whatever AbbVie already has on file; call before the eligibility term ends — HUMIRA cannot be renewed',
        'Ya inscritos: lo que AbbVie ya tenga; llama antes de que termine el período — HUMIRA no se puede renovar',
        '已在册者：AbbVie 已存档材料；资格期结束前致电——HUMIRA 不能续期',
        'वर्तमान नामांकित: जो AbbVie के पास पहले से है; अवधि खत्म होने से पहले कॉल करें — HUMIRA नवीकरण नहीं होगा'
      ),
    ],
    callScript: L(
      'Hello, I am calling myAbbVie Assist at 1-800-222-6885 about HUMIRA. I understand new patients are closed as of July 1, 2026. {insured}. Household size {size}, income about {income}. Can you confirm whether I am an existing enrollee, and if not, what biosimilar or other support options you can point me to?',
      'Hola, llamo a myAbbVie Assist al 1-800-222-6885 por HUMIRA. Entiendo que los pacientes nuevos están cerrados desde el 1 de julio de 2026. {insured}. Hogar de {size}, ingresos unos {income}. ¿Pueden confirmar si ya estoy inscrito y, si no, qué biosimilar u otras opciones indican?',
      '您好，我打给 myAbbVie Assist 1-800-222-6885，咨询 HUMIRA。我知道自 2026 年 7 月 1 日起已停止接收新患者。我{insured}。家庭 {size} 人，收入大约 {income}。请确认我是否已在册；若不是，还能介绍哪些生物类似药或其他支持？',
      'नमस्ते, मैं myAbbVie Assist 1-800-222-6885 पर HUMIRA के लिए कॉल कर रहा/रही हूँ। मुझे पता है 1 जुलाई 2026 से नए रोगी बंद हैं। मैं {insured}। घर {size}, आय लगभग {income}। क्या मैं मौजूदा नामांकित हूँ? यदि नहीं, कौन सा बायोसिमिलर या अन्य सहारा बता सकते हैं?'
    ),
    cutoff: L(
      'Closed to new HUMIRA patients (July 1, 2026). Not an open income cutoff.',
      'Cerrado a pacientes nuevos de HUMIRA (1 de julio de 2026). No hay un corte de ingresos abierto.',
      '已对 HUMIRA 新患者关闭（2026 年 7 月 1 日）。不是开放的收入门槛。',
      'नए HUMIRA रोगियों के लिए बंद (1 जुलाई 2026)। कोई खुली आय कटौती नहीं।'
    ),
    verifiedNote: L(
      'AbbVie HUMIRA program update page states new patients closed July 1, 2026; phone 1-800-222-6885 remains on AbbVie patient-assistance pages.',
      'La página de actualización de HUMIRA de AbbVie indica el cierre a pacientes nuevos el 1 de julio de 2026; el 1-800-222-6885 sigue en las páginas de asistencia.',
      'AbbVie HUMIRA 计划更新页写明 2026 年 7 月 1 日起停止新患者；患者援助页面仍保留电话 1-800-222-6885。',
      'AbbVie HUMIRA अपडेट पेज: नए रोगी 1 जुलाई 2026 से बंद; सहायता पृष्ठों पर अभी भी 1-800-222-6885 है।'
    ),
  },
  {
    id: 'rx-outreach',
    name: 'Rx Outreach',
    kind: 'nonprofit',
    sponsor: 'Rx Outreach (nonprofit mail-order pharmacy)',
    medicationIds: [
      'atorvastatin',
      'metformin',
      'lisinopril',
      'omeprazole',
      'albuterol',
      'sertraline',
      'advair',
    ],
    covers: L(
      'Nonprofit prices (not a manufacturer PAP) for medicines on their list, including atorvastatin, metformin, lisinopril, omeprazole, sertraline, albuterol HFA, and fluticasone/salmeterol (generic Advair). Amoxicillin is not on the published list we checked.',
      'Precios de farmacia sin fines de lucro (no es un PAP del fabricante) para medicamentos de su lista, incluidos atorvastatina, metformina, lisinopril, omeprazol, sertralina, albuterol HFA y fluticasona/salmeterol (Advair genérico). Amoxicilina no estaba en la lista publicada que revisamos.',
      '非营利药房价格（不是制药商援助计划），涵盖其目录中的阿托伐他汀、二甲双胍、赖诺普利、奥美拉唑、舍曲林、沙丁胺醇 HFA 以及氟替卡松/沙美特罗（Advair 仿制）。我们所核的公布目录不含阿莫西林。',
      'गैर-लाभ कीमतें (निर्माता PAP नहीं) उनकी सूची की दवाओं के लिए, जिनमें एटोरवास्टैटिन, मेटफॉर्मिन, लिसिनोप्रिल, ओमेप्राज़ोल, सर्ट्रालीन, अल्ब्यूटेरॉल HFA और फ्लुटिकासोन/साल्मेटेरॉल (जेनेरिक Advair) शामिल हैं। जाँची गई सूची में अमोक्सिसिलिन नहीं था।'
    ),
    summary: L(
      'Mail-order nonprofit pharmacy. No income limit, no PAP application, no insurance billing — you pay their listed price and need a valid prescription. Confirm the strength on their Find Your Medication page.',
      'Farmacia sin fines de lucro por correo. Sin límite de ingresos, sin solicitud PAP ni cobro a seguro: pagas el precio publicado y necesitas una receta válida. Confirma la presentación en Find Your Medication.',
      '非营利邮购药房。无收入限制、无援助申请、不向保险记账——按公布价格支付，并需有效处方。请在 Find Your Medication 页面核对规格。',
      'मेल-ऑर्डर गैर-लाभ फार्मेसी। कोई आय सीमा नहीं, कोई PAP आवेदन नहीं, बीमा बिल नहीं — सूची कीमत चुकाएँ और वैध पर्चा चाहिए। Find Your Medication पर शक्ति जाँचें।'
    ),
    fplMax: null,
    insuranceRule: 'any',
    closedToNew: false,
    applicationUrl: 'https://rxoutreach.org/patients/',
    phone: '1-888-796-1234',
    sendWhere: L(
      'No PAP form. Create an account from the patients page or call 1-888-796-1234 / 1-314-222-0472. Ask your clinician to e-prescribe or fax the prescription to 1-800-875-6591. Pharmacy: 3171 Riverport Tech Center Dr, Maryland Heights, MO 63043.',
      'No hay formulario PAP. Crea una cuenta desde la página de pacientes o llama al 1-888-796-1234 / 1-314-222-0472. Pide a tu médico receta electrónica o fax al 1-800-875-6591. Farmacia: 3171 Riverport Tech Center Dr, Maryland Heights, MO 63043.',
      '无需援助表格。从患者页注册或致电 1-888-796-1234 / 1-314-222-0472。请医生电子处方或传真至 1-800-875-6591。药房地址：3171 Riverport Tech Center Dr, Maryland Heights, MO 63043。',
      'कोई PAP फ़ॉर्म नहीं। पेशेंट पेज से खाता बनाएँ या 1-888-796-1234 / 1-314-222-0472 कॉल करें। डॉक्टर से ई-प्रिस्क्राइब या फ़ैक्स 1-800-875-6591 करवाएँ। फार्मेसी: 3171 Riverport Tech Center Dr, Maryland Heights, MO 63043।'
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
        '支付方式（他们不向保险记账）',
        'भुगतान विधि (वे बीमा को बिल नहीं करते)'
      ),
    ],
    callScript: L(
      'Hello, I am calling Rx Outreach at 1-888-796-1234. I need {drug}. There is no income application — please check that you carry it and tell me how my doctor should send the prescription. My household has {size} people; I {insured}.',
      'Hola, llamo a Rx Outreach al 1-888-796-1234. Necesito {drug}. No hay solicitud de ingresos: confirmen si lo tienen y cómo debe enviar la receta mi médico. Somos {size} en el hogar; {insured}.',
      '您好，我打给 Rx Outreach 1-888-796-1234。我需要 {drug}。没有收入申请——请确认是否有货，并告知医生应如何传送处方。家中 {size} 人；我{insured}。',
      'नमस्ते, मैं Rx Outreach 1-888-796-1234 पर कॉल कर रहा/रही हूँ। मुझे {drug} चाहिए। आय आवेदन नहीं है — पुष्टि करें कि आपके पास है और डॉक्टर पर्चा कैसे भेजें। घर में {size} लोग; मैं {insured}।'
    ),
    cutoff: L(
      'No income or insurance cutoff. Not free manufacturer medicine — a nonprofit cash price if the drug is on their list.',
      'Sin tope de ingresos ni de seguro. No es medicina gratis del fabricante: un precio de efectivo de farmacia sin fines de lucro si el medicamento está en su lista.',
      '无收入或保险门槛。不是制药商免费药——若目录有该药，则为非营利现金价。',
      'कोई आय या बीमा कटौती नहीं। निर्माता की मुफ्त दवा नहीं — यदि सूची में हो तो गैर-लाभ नकद कीमत।'
    ),
    verifiedNote: L(
      'rxoutreach.org/patients and Find Your Medication list (checked October 2026): metformin, lisinopril, omeprazole, sertraline, atorvastatin, albuterol HFA, fluticasone/salmeterol. Phone 1-888-796-1234. Amoxicillin not listed.',
      'rxoutreach.org/patients y Find Your Medication (octubre 2026): metformina, lisinopril, omeprazol, sertralina, atorvastatina, albuterol HFA, fluticasona/salmeterol. Teléfono 1-888-796-1234. Amoxicilina no listada.',
      'rxoutreach.org/patients 与 Find Your Medication（2026 年 10 月核对）含二甲双胍、赖诺普利、奥美拉唑、舍曲林、阿托伐他汀、沙丁胺醇 HFA、氟替卡松/沙美特罗。电话 1-888-796-1234。未列阿莫西林。',
      'rxoutreach.org/patients और Find Your Medication (अक्टूबर 2026): मेटफॉर्मिन, लिसिनोप्रिल, ओमेप्राज़ोल, सर्ट्रालीन, एटोरवास्टैटिन, अल्ब्यूटेरॉल HFA, फ्लुटिकासोन/साल्मेटेरॉल। फ़ोन 1-888-796-1234। अमोक्सिसिलिन सूची में नहीं।'
    ),
  },
  {
    id: 'totalassist',
    name: 'TotalAssist (Patient Advocate Foundation)',
    kind: 'nonprofit',
    sponsor: 'Patient Advocate Foundation (successor to PAN Foundation copay grants)',
    medicationIds: ['humira', 'ozempic', 'eliquis', 'insulin-glargine'],
    covers: L(
      'Copay and other out-of-pocket grants if an open fund matches your diagnosis — not a guarantee for any one brand. Check current funds when you apply.',
      'Becas para copagos y otros gastos de bolsillo si un fondo abierto coincide con tu diagnóstico — no hay garantía para una marca. Revisa los fondos vigentes al solicitar.',
      '若有开放基金与你的诊断匹配，可补助共付额及其他自付费用——不保证某一品牌。申请时请核对当前基金。',
      'सह-भुगतान और अन्य जेब खर्च अनुदान यदि कोई खुला फंड आपके निदान से मेल खाए — किसी ब्रांड की गारंटी नहीं। आवेदन करते समय वर्तमान फंड जाँचें।'
    ),
    summary: L(
      'Charitable grants for insured patients (typically up to 500% FPL; each fund has its own rules). Funds open and close. This is copay help, not free manufacturer bottles.',
      'Becas benéficas para pacientes con seguro (por lo general hasta 500% del FPL; cada fondo tiene reglas). Los fondos abren y cierran. Es ayuda para copagos, no frascos gratis del fabricante.',
      '面向有保险患者的慈善补助（一般不超过联邦贫困线 500%；各基金规则不同）。基金不定期开关。这是共付额帮助，不是制药商免费药瓶。',
      'बीमा वाले रोगियों के लिए धर्मार्थ अनुदान (आमतौर पर 500% FPL तक; हर फंड के नियम अलग)। फंड खुलते-बंद होते हैं। यह सह-भुगतान मदद है, निर्माता की मुफ्त बोतल नहीं।'
    ),
    fplMax: 500,
    insuranceRule: 'insured',
    closedToNew: false,
    applicationUrl: 'https://totalassist.org/apply-patients/',
    phone: '1-866-512-3861',
    sendWhere: L(
      'Apply online at totalassist.org/apply-patients or call 866-512-3861, Monday–Friday 8:30am–5:30pm ET. Claims for some legacy grants: fax (757) 952-0119 or mail TotalAssist, 421 Butler Farm Rd., Hampton, VA 23666.',
      'Solicita en línea en totalassist.org/apply-patients o llama al 866-512-3861, lunes a viernes 8:30 a. m.–5:30 p. m. ET. Reclamos de algunas becas anteriores: fax (757) 952-0119 o correo TotalAssist, 421 Butler Farm Rd., Hampton, VA 23666.',
      '在 totalassist.org/apply-patients 在线申请，或致电 866-512-3861，周一至周五东部时间 8:30–17:30。部分旧补助理赔：传真 (757) 952-0119 或邮寄 TotalAssist, 421 Butler Farm Rd., Hampton, VA 23666。',
      'totalassist.org/apply-patients पर ऑनलाइन या 866-512-3861, सोम–शुक्र 8:30–5:30 ET। कुछ पुराने अनुदान दावे: फ़ैक्स (757) 952-0119 या डाक TotalAssist, 421 Butler Farm Rd., Hampton, VA 23666।'
    ),
    documents: [
      L(
        'Active health insurance (plan name, ID, group, copay/coinsurance)',
        'Seguro médico activo (nombre del plan, ID, grupo, copago/coseguro)',
        '有效医疗保险（计划名称、ID、团体号、共付/共保）',
        'सक्रिय स्वास्थ्य बीमा (योजना नाम, ID, ग्रुप, सह-भुगतान/सह-बीमा)'
      ),
      L(
        'Diagnosis and prescriber information so they can match an open fund',
        'Diagnóstico e información del médico para asociar un fondo abierto',
        '诊断与处方医生信息，以便匹配开放基金',
        'निदान और डॉक्टर की जानकारी ताकि खुला फंड मिल सके'
      ),
      L(
        'Household size and income (they often verify automatically; keep tax or pay records ready)',
        'Tamaño del hogar e ingresos (a menudo verifican solos; ten a mano impuestos o recibos de pago)',
        '家庭人口与收入（他们常自动核验；请备好税表或工资记录）',
        'घर का आकार और आय (अक्सर खुद जाँचते हैं; टैक्स या वेतन रिकॉर्ड रखें)'
      ),
    ],
    callScript: L(
      'Hello, I am calling TotalAssist at 1-866-512-3861. I have insurance and need copay help for {drug}. Household size {size}, income about {income}. Is there an open fund for my diagnosis, and can you start the online application with me?',
      'Hola, llamo a TotalAssist al 1-866-512-3861. Tengo seguro y necesito ayuda con el copago de {drug}. Hogar de {size}, ingresos unos {income}. ¿Hay un fondo abierto para mi diagnóstico y pueden iniciar la solicitud en línea conmigo?',
      '您好，我打给 TotalAssist 1-866-512-3861。我有保险，需要 {drug} 的共付额帮助。家庭 {size} 人，收入大约 {income}。我的诊断是否有开放基金？能否一起开始在线申请？',
      'नमस्ते, मैं TotalAssist 1-866-512-3861 पर कॉल कर रहा/रही हूँ। मेरे पास बीमा है और {drug} के सह-भुगतान में मदद चाहिए। घर {size}, आय लगभग {income}। क्या मेरे निदान के लिए खुला फंड है, और ऑनलाइन आवेदन शुरू कर सकते हैं?'
    ),
    cutoff: L(
      'Must have insurance. Income typically at or below 500% FPL, but each disease fund sets its own rules and may be closed. Confirm with TotalAssist — this app cannot see which funds are open today.',
      'Debes tener seguro. Los ingresos suelen ser ≤500% del FPL, pero cada fondo tiene reglas y puede estar cerrado. Confirma con TotalAssist: esta app no ve qué fondos están abiertos hoy.',
      '必须有保险。收入一般不超过联邦贫困线 500%，但各病种基金规则不同且可能关闭。请向 TotalAssist 确认——本应用无法看到今日哪些基金开放。',
      'बीमा होना चाहिए। आय आमतौर पर ≤500% FPL, लेकिन हर रोग फंड के नियम अलग और बंद हो सकते हैं। TotalAssist से पुष्टि करें — यह ऐप आज कौन से फंड खुले हैं नहीं देख सकता।'
    ),
    verifiedNote: L(
      'totalassist.org/apply-patients and eligibility pages; phone 866-512-3861. PAN Foundation successor as of 2026.',
      'totalassist.org/apply-patients y páginas de elegibilidad; teléfono 866-512-3861. Sucesor de PAN Foundation en 2026.',
      'totalassist.org/apply-patients 与资格页；电话 866-512-3861。2026 年起为 PAN Foundation 的后继项目。',
      'totalassist.org/apply-patients और पात्रता पृष्ठ; फ़ोन 866-512-3861। 2026 में PAN Foundation का उत्तराधिकारी।'
    ),
  },
  {
    id: 'healthwell',
    name: 'HealthWell Foundation',
    kind: 'nonprofit',
    sponsor: 'HealthWell Foundation',
    medicationIds: ['humira', 'ozempic', 'eliquis', 'insulin-glargine'],
    covers: L(
      'Copay, coinsurance, deductible, or premium help when a matching disease fund is open. Not a manufacturer PAP and not guaranteed for a specific brand.',
      'Ayuda con copago, coseguro, deducible o prima cuando hay un fondo de enfermedad abierto. No es un PAP del fabricante ni está garantizado para una marca.',
      '当对应病种基金开放时，可补助共付额、共保、免赔额或保费。不是制药商援助，也不保证某一品牌。',
      'सह-भुगतान, सह-बीमा, डिडक्टिबल या प्रीमियम मदद जब मेल खाता रोग फंड खुला हो। निर्माता PAP नहीं और किसी ब्रांड की गारंटी नहीं।'
    ),
    summary: L(
      'Insured patients only. Disease funds use 300%, 400%, or 500% FPL. Apply online or by phone; funds open and close.',
      'Solo pacientes con seguro. Los fondos usan 300%, 400% o 500% del FPL. Solicita en línea o por teléfono; los fondos abren y cierran.',
      '仅限有保险患者。各病种基金采用贫困线的 300%、400% 或 500%。可在线或电话申请；基金不定期开关。',
      'केवल बीमा वाले रोगी। रोग फंड 300%, 400% या 500% FPL इस्तेमाल करते हैं। ऑनलाइन या फ़ोन से आवेदन; फंड खुलते-बंद होते हैं।'
    ),
    fplMax: 500,
    insuranceRule: 'insured',
    closedToNew: false,
    applicationUrl: 'https://healthwellfoundation.my.salesforce-sites.com/onlineapplication',
    phone: '1-800-675-8416',
    sendWhere: L(
      'Apply online at the HealthWell Salesforce application, or call (800) 675-8416, Monday–Friday 9am–5pm ET. Fax (800) 282-7692. Mail: P.O. Box 489, Buckeystown, MD 21717.',
      'Solicita en línea en la aplicación Salesforce de HealthWell, o llama al (800) 675-8416, lunes a viernes 9 a. m.–5 p. m. ET. Fax (800) 282-7692. Correo: P.O. Box 489, Buckeystown, MD 21717.',
      '在 HealthWell 的 Salesforce 在线申请，或致电 (800) 675-8416，周一至周五东部时间 9:00–17:00。传真 (800) 282-7692。邮寄：P.O. Box 489, Buckeystown, MD 21717。',
      'HealthWell Salesforce आवेदन पर ऑनलाइन, या (800) 675-8416, सोम–शुक्र सुबह 9–शाम 5 ET। फ़ैक्स (800) 282-7692। डाक: P.O. Box 489, Buckeystown, MD 21717।'
    ),
    documents: [
      L(
        'Insurance information and copay/coinsurance amounts',
        'Información del seguro y montos de copago/coseguro',
        '保险信息及共付/共保金额',
        'बीमा जानकारी और सह-भुगतान/सह-बीमा राशियाँ'
      ),
      L(
        'Diagnosis so they can match a fund',
        'Diagnóstico para asociar un fondo',
        '诊断以便匹配基金',
        'फंड मिलान के लिए निदान'
      ),
      L(
        'Household income and size (funds cap at 300–500% FPL)',
        'Ingresos y tamaño del hogar (los fondos topean en 300–500% del FPL)',
        '家庭收入与人口（基金上限为贫困线的 300–500%）',
        'घरेलू आय और आकार (फंड 300–500% FPL पर सीमित)'
      ),
    ],
    callScript: L(
      'Hello, I am calling the HealthWell Foundation at 1-800-675-8416. I have insurance and need help with {drug}. Household size {size}, income about {income}. Is a fund open for my diagnosis, and can you take my application by phone?',
      'Hola, llamo a HealthWell Foundation al 1-800-675-8416. Tengo seguro y necesito ayuda con {drug}. Hogar de {size}, ingresos unos {income}. ¿Hay un fondo abierto para mi diagnóstico y pueden tomar la solicitud por teléfono?',
      '您好，我打给 HealthWell Foundation 1-800-675-8416。我有保险，需要 {drug} 方面的帮助。家庭 {size} 人，收入大约 {income}。我的诊断是否有开放基金？能否电话办理申请？',
      'नमस्ते, मैं HealthWell Foundation 1-800-675-8416 पर कॉल कर रहा/रही हूँ। मेरे पास बीमा है और {drug} में मदद चाहिए। घर {size}, आय लगभग {income}। क्या मेरे निदान का फंड खुला है, और फ़ोन पर आवेदन ले सकते हैं?'
    ),
    cutoff: L(
      'Insurance required. Income up to 300–500% FPL depending on the fund (we show 500% as the highest published cap). The matching fund must be open.',
      'Se exige seguro. Ingresos hasta 300–500% del FPL según el fondo (mostramos 500% como el tope publicado más alto). El fondo debe estar abierto.',
      '必须有保险。收入上限依基金为贫困线的 300–500%（此处以已公布的最高 500% 显示）。对应基金必须开放。',
      'बीमा आवश्यक। फंड के अनुसार आय 300–500% FPL तक (हम उच्चतम प्रकाशित 500% दिखाते हैं)। मेल खाता फंड खुला होना चाहिए।'
    ),
    verifiedNote: L(
      'Online application healthwellfoundation.my.salesforce-sites.com/onlineapplication; phone (800) 675-8416; FPL rules on healthwellfoundation.org.',
      'Solicitud en línea healthwellfoundation.my.salesforce-sites.com/onlineapplication; teléfono (800) 675-8416; reglas de FPL en healthwellfoundation.org.',
      '在线申请 healthwellfoundation.my.salesforce-sites.com/onlineapplication；电话 (800) 675-8416；贫困线规则见 healthwellfoundation.org。',
      'ऑनलाइन आवेदन healthwellfoundation.my.salesforce-sites.com/onlineapplication; फ़ोन (800) 675-8416; FPL नियम healthwellfoundation.org पर।'
    ),
  },
  {
    id: 'good-days',
    name: 'Good Days',
    kind: 'nonprofit',
    sponsor: 'Good Days',
    medicationIds: ['humira', 'ozempic', 'eliquis', 'insulin-glargine'],
    covers: L(
      'Copay assistance when your diagnosis has an open, funded Good Days program. Not a manufacturer PAP.',
      'Ayuda de copago cuando tu diagnóstico tiene un programa Good Days abierto y con fondos. No es un PAP del fabricante.',
      '当你的诊断有开放且有资金的 Good Days 项目时，可获共付额援助。不是制药商援助计划。',
      'सह-भुगतान सहायता जब आपके निदान का खुला, फंडेड Good Days कार्यक्रम हो। निर्माता PAP नहीं।'
    ),
    summary: L(
      'Requires insurance that covers at least 50% of treatment, income at or below 500% FPL, a U.S. Social Security number, and an FDA-approved medicine for a covered diagnosis. Reapply each calendar year if invited.',
      'Requiere seguro que cubra al menos el 50% del tratamiento, ingresos ≤500% del FPL, número de Seguro Social de EE. UU. y un medicamento aprobado por la FDA para un diagnóstico cubierto. Vuelve a solicitar cada año si te invitan.',
      '要求保险至少覆盖治疗费用的 50%、收入不超过联邦贫困线 500%、美国社保号，以及用于覆盖诊断的 FDA 批准药品。若获邀请须每年重新申请。',
      'ऐसा बीमा जो उपचार का कम से कम 50% कवर करे, आय ≤500% FPL, अमेरिकी सोशल सिक्योरिटी नंबर, और कवर निदान के लिए FDA-अनुमोदित दवा। आमंत्रित होने पर हर कैलेंडर वर्ष फिर आवेदन करें।'
    ),
    fplMax: 500,
    insuranceRule: 'insured',
    closedToNew: false,
    applicationUrl: 'https://mygooddays.org/patients/how-to-apply/qualify/',
    phone: '1-877-968-7233',
    sendWhere: L(
      'Apply from the Good Days how-to-apply / qualify page after you confirm an open program. Care Navigators: 877-968-7233. Main office: Good Days, 2611 Internet Blvd Suite 105, Frisco, TX 75034. Fax 214-570-3621.',
      'Solicita desde la página de cómo aplicar / calificar de Good Days después de confirmar un programa abierto. Navegadores: 877-968-7233. Oficina: Good Days, 2611 Internet Blvd Suite 105, Frisco, TX 75034. Fax 214-570-3621.',
      '确认有开放项目后，从 Good Days 申请/资格页提交。导航专员：877-968-7233。办公室：Good Days, 2611 Internet Blvd Suite 105, Frisco, TX 75034。传真 214-570-3621。',
      'खुला कार्यक्रम पुष्टि करने के बाद Good Days how-to-apply / qualify पेज से आवेदन करें। केयर नेविगेटर: 877-968-7233। कार्यालय: Good Days, 2611 Internet Blvd Suite 105, Frisco, TX 75034। फ़ैक्स 214-570-3621।'
    ),
    documents: [
      L(
        'Social Security number and insurance that covers at least 50% of treatment',
        'Número de Seguro Social y seguro que cubra al menos el 50% del tratamiento',
        '社保号，以及至少覆盖治疗费用 50% 的保险',
        'सोशल सिक्योरिटी नंबर और ऐसा बीमा जो उपचार का कम से कम 50% कवर करे'
      ),
      L(
        'Diagnosis, date of birth, and prescriber information',
        'Diagnóstico, fecha de nacimiento e información del médico',
        '诊断、出生日期和处方医生信息',
        'निदान, जन्म तिथि और डॉक्टर की जानकारी'
      ),
      L(
        'Estimate of household income and size (at or below 500% FPL)',
        'Estimación de ingresos y tamaño del hogar (≤500% del FPL)',
        '家庭收入与人口估计（不超过联邦贫困线 500%）',
        'घरेलू आय और आकार का अनुमान (≤500% FPL)'
      ),
    ],
    callScript: L(
      'Hello, I am calling Good Days at 1-877-968-7233. I have insurance that covers my treatment and I need copay help for {drug}. Household size {size}, income about {income}. Is a program open for my diagnosis, and can you start the application?',
      'Hola, llamo a Good Days al 1-877-968-7233. Tengo seguro que cubre mi tratamiento y necesito ayuda de copago para {drug}. Hogar de {size}, ingresos unos {income}. ¿Hay un programa abierto para mi diagnóstico y pueden iniciar la solicitud?',
      '您好，我打给 Good Days 1-877-968-7233。我的保险覆盖治疗，需要 {drug} 的共付额帮助。家庭 {size} 人，收入大约 {income}。我的诊断是否有开放项目？能否开始申请？',
      'नमस्ते, मैं Good Days 1-877-968-7233 पर कॉल कर रहा/रही हूँ। मेरे बीमा में उपचार कवर है और {drug} के सह-भुगतान में मदद चाहिए। घर {size}, आय लगभग {income}। क्या मेरे निदान का कार्यक्रम खुला है, और आवेदन शुरू कर सकते हैं?'
    ),
    cutoff: L(
      'Insurance covering at least 50% of treatment, and income at or below 500% FPL. The disease program must be open and funded.',
      'Seguro que cubra al menos el 50% del tratamiento e ingresos ≤500% del FPL. El programa de la enfermedad debe estar abierto y con fondos.',
      '保险至少覆盖治疗的 50%，收入不超过联邦贫困线 500%。该病种项目必须开放且有资金。',
      'उपचार का कम से कम 50% कवर करने वाला बीमा, और आय ≤500% FPL। रोग कार्यक्रम खुला और फंडेड होना चाहिए।'
    ),
    verifiedNote: L(
      'Eligibility and 877-968-7233 on mygooddays.org/patients/how-to-apply/qualify/. Listed in RxAssist/NeedyMeds copay-foundation directories.',
      'Elegibilidad y 877-968-7233 en mygooddays.org/patients/how-to-apply/qualify/. Aparece en directorios de fundaciones de copago de RxAssist/NeedyMeds.',
      '资格与电话 877-968-7233 见 mygooddays.org/patients/how-to-apply/qualify/。亦见于 RxAssist/NeedyMeds 共付额基金会目录。',
      'पात्रता और 877-968-7233 mygooddays.org/patients/how-to-apply/qualify/ पर। RxAssist/NeedyMeds सह-भुगतान निर्देशिकाओं में।'
    ),
  },
];

export const papById = Object.fromEntries(papPrograms.map((p) => [p.id, p])) as Record<
  string,
  PapProgram
>;
