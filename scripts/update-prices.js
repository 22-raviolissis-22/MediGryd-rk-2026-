#!/usr/bin/env node
/**
 * Download the latest CMS NADAC weekly CSV from data.medicaid.gov,
 * keep only the medications in this app, and write a small JSON feed.
 *
 * Usage: npm run update-prices
 *
 * Writes:
 *   nadac-prices.json              (repo root — host this at NADAC_FEED_URL)
 *   src/data/nadac-snapshot.json   (bundled fallback shipped in the app)
 */
const fs = require('fs');
const path = require('path');

const DATASET = 'fbb83258-11c7-47f5-8b18-5f8e79f7e704';
const QUERY = `https://data.medicaid.gov/api/1/datastore/query/${DATASET}/0`;
const DOWNLOAD = `${QUERY}/download`;

const ROOT = path.join(__dirname, '..');
const CATALOG = JSON.parse(fs.readFileSync(path.join(__dirname, 'nadac-catalog.json'), 'utf8'));
const OUT_ROOT = path.join(ROOT, 'nadac-prices.json');
const OUT_BUNDLE = path.join(ROOT, 'src', 'data', 'nadac-snapshot.json');

async function medicaid(body) {
  const res = await fetch(QUERY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`NADAC query failed: ${res.status}`);
  return res.json();
}

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

async function latestAsOfDate() {
  const cursor = new Date();
  for (let i = 0; i < 45; i++) {
    const day = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate() - i));
    const iso = ymd(day);
    const data = await medicaid({
      conditions: [{ resource: 't', property: 'as_of_date', value: iso, operator: '=' }],
      limit: 1,
      count: true,
    });
    if ((data.count || 0) > 0) return iso;
  }
  throw new Error('Could not find a recent NADAC as_of_date');
}

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const len = text.length;
  const nextRow = () => {
    const cells = [];
    let cell = '';
    let quoted = false;
    while (i < len) {
      const ch = text[i];
      if (quoted) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            cell += '"';
            i += 2;
            continue;
          }
          quoted = false;
          i += 1;
          continue;
        }
        cell += ch;
        i += 1;
        continue;
      }
      if (ch === '"') {
        quoted = true;
        i += 1;
        continue;
      }
      if (ch === ',') {
        cells.push(cell);
        cell = '';
        i += 1;
        continue;
      }
      if (ch === '\n') {
        i += 1;
        cells.push(cell);
        return cells;
      }
      if (ch === '\r') {
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
    }
    if (cell.length || cells.length) {
      cells.push(cell);
      return cells;
    }
    return null;
  };
  const header = nextRow();
  if (!header) return [];
  const idx = Object.fromEntries(header.map((h, n) => [h.replace(/^\uFEFF/, '').trim(), n]));
  let cells;
  while ((cells = nextRow())) {
    if (cells.length === 1 && cells[0] === '') continue;
    const get = (name) => cells[idx[name]] || '';
    rows.push({
      ndc_description: get('NDC Description'),
      ndc: get('NDC'),
      nadac_per_unit: get('NADAC Per Unit'),
      effective_date: get('Effective Date'),
      classification_for_rate_setting: get('Classification for Rate Setting'),
      as_of_date: get('As of Date'),
    });
  }
  return rows;
}

async function downloadWeekCsv(asOf) {
  const res = await fetch(DOWNLOAD, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      format: 'csv',
      conditions: [{ resource: 't', property: 'as_of_date', value: asOf, operator: '=' }],
    }),
  });
  if (!res.ok) throw new Error(`NADAC CSV download failed: ${res.status}`);
  return res.text();
}

function toIso(s) {
  if (!s) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (m) return `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  return s;
}

function pickRow(rows, item, previousPerUnit) {
  const matches = rows.filter((r) => r.ndc_description === item.ndcDescription);
  if (!matches.length) return null;
  const generics = matches.filter((r) => r.classification_for_rate_setting === 'G');
  const pool = item.preferGeneric && generics.length ? generics : matches;
  const hinted = item.preferPerUnit != null ? item.preferPerUnit : previousPerUnit;
  if (hinted != null) {
    const same = pool.find((r) => Math.abs(Number(r.nadac_per_unit) - hinted) < 1e-8);
    if (same) return same;
  }
  const counts = new Map();
  for (const r of pool) {
    const key = r.nadac_per_unit;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  let best = pool[0];
  let bestN = -1;
  for (const r of pool) {
    const n = counts.get(r.nadac_per_unit) || 0;
    if (n > bestN) {
      best = r;
      bestN = n;
    }
  }
  return best;
}

function roundMoney(n) {
  return Math.round(n * 100) / 100;
}

async function main() {
  console.log('Finding latest NADAC as_of_date…');
  const asOfDate = await latestAsOfDate();
  console.log(`Latest week as_of_date = ${asOfDate}`);
  console.log('Downloading that weekly CSV…');
  const csv = await downloadWeekCsv(asOfDate);
  const rows = parseCsv(csv);
  console.log(`Parsed ${rows.length} NADAC rows`);

  let previous = {};
  if (fs.existsSync(OUT_BUNDLE)) {
    try {
      const prev = JSON.parse(fs.readFileSync(OUT_BUNDLE, 'utf8'));
      for (const d of prev.drugs || []) previous[d.id] = d.nadacPerUnit;
    } catch {
      previous = {};
    }
  }

  const drugs = [];
  let effectiveDate = '';
  for (const item of CATALOG) {
    const row = pickRow(rows, item, previous[item.id]);
    if (!row) {
      console.warn(`No NADAC row for ${item.id} (${item.ndcDescription})`);
      continue;
    }
    const perUnit = Number(row.nadac_per_unit);
    if (!Number.isFinite(perUnit)) {
      console.warn(`Bad nadac_per_unit for ${item.id}: ${row.nadac_per_unit}`);
      continue;
    }
    if (!effectiveDate && row.effective_date) effectiveDate = toIso(row.effective_date);
    drugs.push({
      id: item.id,
      drug: item.drug,
      ndcDescription: row.ndc_description,
      strength: item.strength,
      quantity: item.quantity,
      nadacPerUnit: perUnit,
      nadacPrice: roundMoney(perUnit * item.quantity),
      asOfDate: toIso(row.as_of_date) || asOfDate,
      effectiveDate: toIso(row.effective_date) || effectiveDate,
    });
  }

  const generatedOn = ymd(new Date());
  const feed = {
    version: asOfDate,
    generatedOn,
    source: 'CMS NADAC weekly file via data.medicaid.gov',
    datasetId: DATASET,
    asOfDate,
    effectiveDate: toIso(effectiveDate) || asOfDate,
    drugs,
  };

  const json = `${JSON.stringify(feed, null, 2)}\n`;
  fs.writeFileSync(OUT_ROOT, json);
  fs.mkdirSync(path.dirname(OUT_BUNDLE), { recursive: true });
  fs.writeFileSync(OUT_BUNDLE, json);
  console.log(`Wrote ${drugs.length} drugs to ${path.relative(ROOT, OUT_ROOT)}`);
  console.log(`Copied bundled snapshot to ${path.relative(ROOT, OUT_BUNDLE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
