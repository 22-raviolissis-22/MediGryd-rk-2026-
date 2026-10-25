# MediGryd

Expo / React Native app for California congressional districts **17** and **19**. After a Medi-Cal / Covered California screen, it shows prices and patient assistance programs from the **Patient Assistance Programs and Pricing Guide**: 15 standard generics with Cost Plus, GoodRx, and per-store cash prices at 10 local pharmacies, plus 10 high-cost brand medicines with manufacturer PAPs.

The flow is language → insurance → household/income when uninsured → eligibility → medication search → dual results (Regular Medicines vs. PAPs).

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
npm run export-web
npm run preview
```

That serves a static web build at http://127.0.0.1:43123 (IPv4). `npx expo start --web` still works for Expo Go / live reload.

On web the UI is framed as a vertical iPhone (390×844).

## Refresh NADAC prices

CMS publishes a new NADAC weekly file. This repo does **not** fetch the full table inside the phone app. Instead a small Node script downloads that week, keeps only the catalog drugs, and writes a trimmed JSON feed.

```bash
npm run update-prices
```

That writes:

- `nadac-prices.json` at the repo root (host this file)
- `src/data/nadac-snapshot.json` (bundled fallback shipped with the app)

Commit both files. Then publish `nadac-prices.json` at a **stable public HTTPS URL** (GitHub raw or a gist). Point the app at it in `src/prices/nadacFeed.ts` (`NADAC_FEED_URL`) or with `EXPO_PUBLIC_NADAC_FEED_URL` at build time.

Example after the file is on GitHub:

`https://raw.githubusercontent.com/<user>/<repo>/main/nadac-prices.json`

The default constant uses `reva-kaushik/calrx-assist`. Until that URL exists, launch still works: the app tries the URL, and on 404 / timeout / offline it **silently** uses the bundled snapshot (and any newer copy already cached in AsyncStorage).

On launch, if the device is online, the app fetches the hosted JSON, compares `asOfDate` to the bundled snapshot, and if newer it updates displayed NADAC prices and caches the file on-device.

Cost Plus, GoodRx, and local cash figures follow the October 13, 2026 pricing guide and are labeled on the results screen.

## Data sources

**Guide date: October 13, 2026.** Catalog, local cash prices, Cost Plus list prices, GoodRx coupon amounts, and PAP summaries come from the Patient Assistance Programs and Pricing Guide. Confirm at the pharmacy or on the linked Cost Plus / GoodRx / manufacturer pages before you pay or apply.

### CMS NADAC (National Average Drug Acquisition Cost)

- **Source:** [NADAC 2026 weekly file on data.medicaid.gov](https://data.medicaid.gov/dataset/fbb83258-11c7-47f5-8b18-5f8e79f7e704) (public U.S. government data).
- **API:** `POST https://data.medicaid.gov/api/1/datastore/query/fbb83258-11c7-47f5-8b18-5f8e79f7e704/0`
- **What we used:** Current `nadac_per_unit` for each listed product, filtered to `as_of_date = 2026-09-30` (latest week in the file on retrieval day). Effective date on those rows was `2026-09-23`.
- **How it is shown:** Per-unit NADAC × typical package size. On results this sits **below** buy-now options and is labeled **Fair-price reference (what pharmacies pay wholesalers — not a price you can buy at)**. NADAC is never treated as a checkout price. The results screen shows **Prices updated as of \<NADAC as-of date\>**. When a newer hosted feed is available, that date and the NADAC dollar amounts update; Cost Plus does not.

### Mark Cuban Cost Plus Drugs

- **Source:** Public Cost Plus Drugs pricing API (`https://us-central1-costplusdrugs-publicapi.cloudfunctions.net/main`) and catalog (`https://api.costplusdrugs.com/pricelist/cpd`). Product pages live on [costplusdrugs.com](https://www.costplusdrugs.com/).
- **What we used:** `requested_quote` for the matching strength and quantity. Cost Plus’s published formula is **acquisition cost + 15% markup + pharmacist fee** (quotes include that fee; shipping is extra). Results lead with this as a **buy-now** mail-order price and link the matching product page on [costplusdrugs.com](https://www.costplusdrugs.com/).
- **Not listed:** The 10 high-cost brand medicines (Farxiga, Jardiance, Eliquis, Humira, Trulicity, Xarelto, Keytruda, Herceptin, Xeljanz, Stelara) are not Cost Plus catalog items in the guide — those cards say “Not listed” and point to PAPs.
- **Amoxicillin:** not in the October 13 guide. Its Cost Plus figure is the October 3, 2026 public-API quote ($6.72 for 30 × 500 mg capsules) and is labeled with that date. Its fair-price figure is the NADAC snapshot row (AMOXICILLIN 500 MG CAPSULE, $0.0788 per capsule). No assistance program in the app covers it.
- **Quantity picker:** shown when a medicine has a per-unit NADAC row (atorvastatin, metformin, lisinopril, omeprazole, sertraline, amoxicillin, Eliquis). Only the NADAC figure scales with quantity; each Cost Plus quote is shown for the one quantity it was quoted for, with a note when another quantity is selected.

### GoodRx coupons

Each medication links to that drug’s real GoodRx page (`https://www.goodrx.com/<drug>`), for example [atorvastatin](https://www.goodrx.com/atorvastatin). The Regular Medicines tab also shows the guide’s coupon dollar amount when one is listed. Open GoodRx (or SingleCare) to see the live coupon.

A second button, **Compare on SingleCare**, sits beside the GoodRx link (with space so it does not overlap the price card) and opens that drug’s real SingleCare coupon page.

### Generic competition outlook

On the Regular Medicines tab, **Eliquis** still shows an Orange Book patent note and **Humira** notes existing biosimilars. Other guide medicines are already generic or are specialty brands handled on the PAP tab.

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

Each of these stores shows the guide’s cash price for each of the 15 standard medicines (for example atorvastatin 20 mg: $12.00 at CVS Sunnyvale, $9.99 at both Costco pharmacies).

### Patient assistance programs

The PAP tab includes the guide’s overview (what a PAP is, manufacturer shipping, income/insurance screens, application) and these 10 manufacturer programs:

| Medicine | Program |
| --- | --- |
| Farxiga (dapagliflozin) | AZ&Me Prescription Savings |
| Jardiance (empagliflozin) | Boehringer Ingelheim Cares |
| Eliquis (apixaban) | Bristol Myers Squibb Patient Assistance Foundation |
| Humira (adalimumab) | myAbbVie Assist |
| Trulicity (dulaglutide) | Lilly Cares |
| Xarelto (rivaroxaban) | Johnson & Johnson Patient Assistance |
| Keytruda (pembrolizumab) | Merck Helps |
| Herceptin (trastuzumab) | Genentech Access Solutions |
| Xeljanz (tofacitinib) | Pfizer RxPathways |
| Stelara (ustekinumab) | Janssen CarePath |

The 15 standard generics also list **Rx Outreach** (nonprofit mail-order, no income form). Eligibility figures are general estimates — confirm on the official program site or [NeedyMeds](https://www.needymeds.org/) before you apply.

Matching uses the insurance screener (household size, income bracket A/B/C, insured/uninsured). “Likely qualifies” only when the **entire** income bracket sits at or under the program FPL cap **and** insurance rules fit. It is never a guarantee — the UI says to confirm with the program. PAP enrollment typically expires yearly; the tab reminds users to reapply.

## What the buttons do

| Screen | Behavior |
| --- | --- |
| Language | English, Español, 简体中文, or हिन्दी sets all later copy, then insurance. |
| Insurance **YES** | Coverage checklist, then skip income screening and go to medication search. |
| Insurance **NO** | Household size → income brackets for that size → eligibility. |
| Eligibility A | Medi-Cal notice + Covered California and BenefitsCal links. |
| Eligibility B | Covered California subsidy notice + enroll link. |
| Eligibility C | Standard marketplace notice + enroll link. |
| Search | Live filter of brand/generic names; tap a drug for benchmarks. |
| Results | Cost Plus buy-now, GoodRx / SingleCare, NADAC wholesale reference, then each local pharmacy with its cash price. PAP tab: program overview plus ranked enrollment links. |

## Stack

- Expo SDK 57, React Native, TypeScript
- No custom native modules — compatible with Expo Go
