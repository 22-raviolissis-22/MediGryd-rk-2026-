# CalRx Assist

Expo / React Native app for California congressional districts **17** and **19**. It screens for Medi-Cal / Covered California, then shows **sourced price benchmarks** (not invented store quotes) plus **verified nearby pharmacies** and patient assistance programs (PAPs).

The flow is language → insurance → household/income when uninsured → eligibility → medication search → dual results (benchmarks & pharmacies vs. PAPs).

## Run on Expo Go (iPhone)

1. Install [Expo Go](https://expo.dev/go) on your phone.
2. From this folder:

```bash
npm install
npx expo start
```

3. Scan the QR code with the Camera app (iOS) or Expo Go (Android).

Keep the phone on the same Wi‑Fi network as your computer. Portrait iPhone layout is the intended target.

## Run in a browser (preview)

```bash
npm install
npx expo start --web --port 43123
```

On web the UI is framed as a vertical iPhone (390×844).

## Data sources

**Retrieval date: October 3, 2026.** Benchmarks in the app are snapshots from that pull. In-store cash prices vary and must be confirmed at the pharmacy. NADAC and Cost Plus figures are **not** per-pharmacy prices.

### CMS NADAC (National Average Drug Acquisition Cost)

- **Source:** [NADAC 2026 weekly file on data.medicaid.gov](https://data.medicaid.gov/dataset/fbb83258-11c7-47f5-8b18-5f8e79f7e704) (public U.S. government data).
- **API:** `POST https://data.medicaid.gov/api/1/datastore/query/fbb83258-11c7-47f5-8b18-5f8e79f7e704/0`
- **What we used:** Current `nadac_per_unit` for each listed product, filtered to `as_of_date = 2026-09-30` (latest week in the file on retrieval day). Effective date on those rows was `2026-09-23`.
- **How it is shown:** Per-unit NADAC × typical package size for the strength already in the app (for example 30 atorvastatin 20 mg tablets). Each card is labeled **NADAC benchmark**.

### Mark Cuban Cost Plus Drugs

- **Source:** Public Cost Plus Drugs pricing API (`https://us-central1-costplusdrugs-publicapi.cloudfunctions.net/main`) and catalog (`https://api.costplusdrugs.com/pricelist/cpd`). Product pages live on [costplusdrugs.com](https://www.costplusdrugs.com/).
- **What we used:** `requested_quote` for the matching strength and quantity. Cost Plus’s published formula is **acquisition cost + 15% markup + pharmacist fee** (quotes include that fee; shipping is extra).
- **Not listed:** Lantus / insulin glargine, Ozempic / semaglutide, and Eliquis / apixaban had **no catalog match** on October 3, 2026. Those cards say “Not listed” instead of inventing a price. Humira’s Cost Plus card is the **adalimumab-aacf biosimilar** kit, not brand Humira.

### Pharmacy addresses (CA-17 and CA-19)

Addresses come from official chain locators, not guesswork. Stores included:

| District | Pharmacy | Address | Locator |
| --- | --- | --- | --- |
| CA-17 | CVS Pharmacy | 576 E El Camino Real, Sunnyvale, CA 94087 | [CVS #9700](https://www.cvs.com/store-locator/sunnyvale-ca-pharmacies/576-e-el-camino-real-sunnyvale-ca-94087/storeid=9700) |
| CA-17 | CVS Pharmacy | 10455 S De Anza Blvd, Cupertino, CA 95014 | [CVS #9894](https://www.cvs.com/store-locator/cupertino-ca-pharmacies/10455-s-de-anza-blvd-cupertino-ca-95014/storeid=9894) |
| CA-17 | CVS Pharmacy | 2004 El Camino Real, Santa Clara, CA 95050 | [CVS #17658](https://www.cvs.com/store-locator/santa-clara-ca-pharmacies/2004-el-camino-real-santa-clara-ca-95050/storeid=17658) |
| CA-17 | Walgreens Pharmacy | 1833 N Milpitas Blvd, Milpitas, CA 95035 | [Walgreens #5480](https://www.walgreens.com/locator/walgreens-1833+n+milpitas+blvd-milpitas-ca-95035/id=5480) |
| CA-17 | Costco Pharmacy | 1709 Automation Pkwy, San Jose, CA 95131 | [Costco #1004](https://www.costco.com/w/-/ca/san-jose/1004) |
| CA-19 | Walgreens Pharmacy | 440 Blossom Hill Rd, San Jose, CA 95123 | [Walgreens #2739](https://www.walgreens.com/locator/walgreens-440+blossom+hill+rd-san+jose-ca-95123/id=2739) |
| CA-19 | Walgreens Pharmacy | 745 E Dunne Ave, Morgan Hill, CA 95037 | [Walgreens locator](https://www.walgreens.com/storelocator/pharmacy/morgan-hill-ca) |
| CA-19 | Walgreens Pharmacy | 770 1st St, Gilroy, CA 95020 | [Walgreens #9516](https://www.walgreens.com/locator/walgreens-770+1st+st-gilroy-ca-95020/id=9516) |
| CA-19 | Costco Pharmacy | 7251 Camino Arroyo, Gilroy, CA 95020 | [Costco Gilroy](https://www.costco.com/warehouse-locations/gilroy-ca-760.html) |
| CA-19 | Walgreens Pharmacy | 1532 N Main St, Salinas, CA 93906 | [Walgreens locator](https://www.walgreens.com/storelocator/pharmacy/salinas-ca) |

No store is shown with a dollar amount attached to that location.

## What the buttons do

| Screen | Behavior |
| --- | --- |
| Language | English or Español sets all later copy, then insurance. |
| Insurance **YES** | Coverage checklist, then skip income screening and go to medication search. |
| Insurance **NO** | Household size → income brackets for that size → eligibility. |
| Eligibility A | Medi-Cal notice + Covered California and BenefitsCal links. |
| Eligibility B | Covered California subsidy notice + enroll link. |
| Eligibility C | Standard marketplace notice + enroll link. |
| Search | Live filter of brand/generic names; tap a drug for benchmarks. |
| Results | NADAC / Cost Plus cards, CA-17 and CA-19 pharmacies, then PAP / nonprofit programs. |

## Stack

- Expo SDK 57, React Native, TypeScript
- No custom native modules — compatible with Expo Go
