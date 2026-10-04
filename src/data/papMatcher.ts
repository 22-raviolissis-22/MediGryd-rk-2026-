import { loc } from '../i18n';
import { papById } from './papPrograms';
import type {
  HouseholdSize,
  IncomeBracket,
  InsuranceStatus,
  Language,
  PapInsuranceRule,
  PapProgram,
} from '../types';

/** 2026 HHS FPL for the 48 contiguous states (household 1–5). */
const FPL_2026: Record<HouseholdSize, number> = {
  1: 15960,
  2: 21640,
  3: 27320,
  4: 33000,
  5: 38680,
};

/**
 * Screener brackets in this app track Medi-Cal (~138% FPL) and Covered CA subsidy (~400% FPL).
 * We only mark "likely" when the user's entire bracket sits at or under the program cap.
 */
const BRACKET_FPL = {
  A: { min: 0, max: 138 },
  B: { min: 138, max: 400 },
  C: { min: 400, max: null as number | null },
};

export type MatchBucket = 'likely' | 'other';

export type RankedProgram = {
  program: PapProgram;
  bucket: MatchBucket;
  userLine: string;
  cutoffLine: string;
};

function money(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

export function fplDollars(size: HouseholdSize, percent: number) {
  return Math.round((FPL_2026[size] * percent) / 100);
}

function insuranceFits(rule: PapInsuranceRule, insurance: InsuranceStatus): boolean {
  if (insurance == null) return false;
  if (rule === 'any') return true;
  if (rule === 'uninsured') return insurance === 'no';
  if (rule === 'insured') return insurance === 'yes';
  if (rule === 'uninsuredOrGovernment' || rule === 'uninsuredOrMedicare') {
    return insurance === 'no';
  }
  return false;
}

function incomeLikely(program: PapProgram, income: IncomeBracket | null): boolean {
  if (program.id === 'rx-outreach') return true;
  if (!income) {
    return program.insuranceRule === 'insured' || program.insuranceRule === 'any';
  }
  if (program.fplMax == null) {
    return income === 'A' || income === 'B';
  }
  const upper = BRACKET_FPL[income].max;
  if (upper == null) return false;
  return upper <= program.fplMax;
}

export function rankPrograms(opts: {
  programIds: string[];
  insurance: InsuranceStatus;
  household: HouseholdSize | null;
  income: IncomeBracket | null;
  language: Language;
  incomeLabel: string;
  insuredLabel: string;
  uninsuredLabel: string;
  userLineTpl: string;
  cutoffLineTpl: string;
  unpublishedCutoff: string;
  noLimitCutoff: string;
}): RankedProgram[] {
  const size = opts.household ?? 1;
  const rows: RankedProgram[] = [];

  for (const id of opts.programIds) {
    const program = papById[id];
    if (!program) continue;

    const insOk = insuranceFits(program.insuranceRule, opts.insurance);
    const incOk = incomeLikely(program, opts.income);
    const bucket: MatchBucket =
      !program.closedToNew && insOk && incOk ? 'likely' : 'other';

    const insuredBit = opts.insurance === 'yes' ? opts.insuredLabel : opts.uninsuredLabel;
    const userLine = opts.userLineTpl
      .replace('{size}', String(size))
      .replace('{income}', opts.incomeLabel)
      .replace('{insured}', insuredBit);

    let cutoffDetail = loc(program.cutoff, opts.language);
    if (program.id === 'rx-outreach') {
      cutoffDetail = `${opts.noLimitCutoff} ${cutoffDetail}`;
    } else if (program.fplMax != null) {
      const cap = money(fplDollars(size, program.fplMax));
      cutoffDetail = opts.cutoffLineTpl
        .replace('{pct}', String(program.fplMax))
        .replace('{amount}', cap)
        .replace('{size}', String(size));
    } else if (!program.closedToNew) {
      cutoffDetail = `${opts.unpublishedCutoff} ${cutoffDetail}`;
    }

    rows.push({ program, bucket, userLine, cutoffLine: cutoffDetail });
  }

  rows.sort((a, b) => {
    if (a.bucket !== b.bucket) return a.bucket === 'likely' ? -1 : 1;
    if (a.program.kind !== b.program.kind) return a.program.kind === 'pap' ? -1 : 1;
    return a.program.name.localeCompare(b.program.name);
  });

  return rows;
}

export function fillScript(
  tpl: string,
  vars: { size: string; income: string; insured: string; drug: string }
) {
  return tpl
    .replaceAll('{size}', vars.size)
    .replaceAll('{income}', vars.income)
    .replaceAll('{insured}', vars.insured)
    .replaceAll('{drug}', vars.drug);
}

/** True when the newest listing date among these programs is more than 6 months before `now`. */
export function papListingsAreStale(
  programs: { verifiedAsOf: string }[],
  now: Date = new Date()
): boolean {
  if (programs.length === 0) return false;
  let newest = '';
  for (const p of programs) {
    if (p.verifiedAsOf > newest) newest = p.verifiedAsOf;
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(newest);
  if (!m) return false;
  const verified = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const staleAfter = new Date(verified);
  staleAfter.setMonth(staleAfter.getMonth() + 6);
  return now.getTime() > staleAfter.getTime();
}
