# CalRx Assist

Expo / React Native app for comparing **local cash pharmacy prices** and finding **patient assistance programs (PAPs)** and nonprofits that can provide medicine at low or no cost.

The flow matches a California coverage screener: language, insurance, household size, income, Medi-Cal / Covered California routing, then medication search and dual results (pharmacies vs. assistance).

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

## What the buttons do

| Screen | Behavior |
| --- | --- |
| Language | English or Español sets all later copy, then insurance. |
| Insurance **YES** | Coverage checklist, then skip income screening and go to medication search. |
| Insurance **NO** | Household size → income brackets for that size → eligibility. |
| Eligibility A | Medi-Cal notice + Covered California and BenefitsCal links. |
| Eligibility B | Covered California subsidy notice + enroll link. |
| Eligibility C | Standard marketplace notice + enroll link. |
| Search | Live filter of brand/generic names; tap a drug for prices. |
| Results | Tabs for local cash prices and PAP / nonprofit programs. Links open in the system browser. |

Prices and program rules are **illustrative local samples** so the app works offline in Expo Go. Confirm costs at the pharmacy and eligibility with each program.

## Stack

- Expo SDK 57, React Native, TypeScript
- No custom native modules — compatible with Expo Go
