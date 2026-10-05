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

## Refresh NADAC prices

CMS publishes a new NADAC weekly file. This repo does **not** fetch the full table inside the phone app. Instead a small Node script downloads that week, keeps only the 12 drugs in the app, and writes a trimmed JSON feed.

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

Cost Plus Drugs quotes stay the October 3, 2026 snapshot and are labeled as such on the results screen.

## Data sources

**Retrieval date: October 3, 2026.** Benchmarks in the app are snapshots from that pull. In-store cash prices vary and must be confirmed at the pharmacy. NADAC and Cost Plus figures are **not** per-pharmacy prices.

### CMS NADAC (National Average Drug Acquisition Cost)

- **Source:** [NADAC 2026 weekly file on data.medicaid.gov](https://data.medicaid.gov/dataset/fbb83258-11c7-47f5-8b18-5f8e79f7e704) (public U.S. government data).
- **API:** `POST https://data.medicaid.gov/api/1/datastore/query/fbb83258-11c7-47f5-8b18-5f8e79f7e704/0`
- **What we used:** Current `nadac_per_unit` for each listed product, filtered to `as_of_date = 2026-09-30` (latest week in the file on retrieval day). Effective date on those rows was `2026-09-23`.
- **How it is shown:** Per-unit NADAC × typical package size. On results this sits **below** buy-now options and is labeled **Fair-price reference (what pharmacies pay wholesalers — not a price you can buy at)**. NADAC is never treated as a checkout price. The results screen shows **Prices updated as of \<NADAC as-of date\>**. When a newer hosted feed is available, that date and the NADAC dollar amounts update; Cost Plus does not.

### Mark Cuban Cost Plus Drugs

- **Source:** Public Cost Plus Drugs pricing API (`https://us-central1-costplusdrugs-publicapi.cloudfunctions.net/main`) and catalog (`https://api.costplusdrugs.com/pricelist/cpd`). Product pages live on [costplusdrugs.com](https://www.costplusdrugs.com/).
- **What we used:** `requested_quote` for the matching strength and quantity. Cost Plus’s published formula is **acquisition cost + 15% markup + pharmacist fee** (quotes include that fee; shipping is extra). Results lead with this as a **buy-now** mail-order price and link the matching product page on [costplusdrugs.com](https://www.costplusdrugs.com/).
- **Not listed:** Lantus / insulin glargine, Ozempic / semaglutide, and Eliquis / apixaban had **no catalog match** on October 3, 2026. Those cards say “Not listed” instead of inventing a price. Humira’s Cost Plus card is the **adalimumab-aacf biosimilar** kit, not brand Humira.

### GoodRx coupons

Each medication links to that drug’s real GoodRx page (`https://www.goodrx.com/<drug>`), for example [atorvastatin](https://www.goodrx.com/atorvastatin) or [Lantus](https://www.goodrx.com/lantus). Coupon dollar amounts are **not** copied into the app because they vary by pharmacy; the user opens GoodRx to see the current coupon.

A second button, **Compare on SingleCare**, sits beside the GoodRx link and opens that drug’s real SingleCare coupon page (`https://www.singlecare.com/prescription/<drug-name>`). SingleCare lists free coupon prices without a subscription upsell. Coupon amounts are not copied into the app.

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

### Patient assistance programs (verified October 2026)

The PAP tab is a matcher, not a directory of invented links. Each entry was checked against the manufacturer or nonprofit **application** page plus [RxAssist](https://www.rxassist.org/) / [NeedyMeds](https://www.needymeds.org/) listings. Phone numbers, fax/mail addresses, and FPL rules come from those sources. **Lilly Cares** and **AZ&Me** are omitted because they do not cover any drug in this app.

Manufacturer PAPs in the catalog: Pfizer PAP Connect (Lipitor), GSK PAP (Ventolin HFA, Advair Diskus), Sanofi Patient Connection (Lantus), NovoCare PAP (Ozempic, 200% FPL, uninsured; Medicare Part D not eligible in 2026), Bristol Myers Squibb PAF (Eliquis; income cap unpublished). **myAbbVie Assist is closed to new HUMIRA patients as of July 1, 2026** — the app says so and does not treat it as an open match.

Nonprofit / free-or-low-cost: Rx Outreach (no income application; listed generics), TotalAssist, HealthWell Foundation, Good Days (copay funds for insured patients; funds open and close).

No verified manufacturer PAP for generic metformin, lisinopril, omeprazole, sertraline, or amoxicillin. Amoxicillin also was not on the Rx Outreach list we checked. The matcher says that plainly.

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
| Results | Cost Plus buy-now + GoodRx coupon first, then NADAC as a non-purchasable wholesale reference, CA-17/CA-19 pharmacies (no store prices), then PAP / nonprofit programs. |

## Stack

- Expo SDK 57, React Native, TypeScript
- No custom native modules — compatible with Expo Go
