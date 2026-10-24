import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  HouseholdSize,
  IncomeBracket,
  InsuranceStatus,
  Language,
  ScreenId,
} from './types';

export type TextSize = 'normal' | 'large';

export type Prefs = {
  textSize: TextSize;
  savedMedicationIds: string[];
  planPhone: string;
  language: Language | null;
};

export const DEFAULT_PREFS: Prefs = {
  textSize: 'normal',
  savedMedicationIds: [],
  planPhone: '',
  language: null,
};

const KEYS = {
  textSize: '@calrx/text-size',
  saved: '@calrx/saved-medications',
  planPhone: '@calrx/plan-phone',
  language: '@calrx/language',
} as const;

function parseLanguage(value: string | null): Language | null {
  if (value === 'en' || value === 'es' || value === 'zh' || value === 'hi') return value;
  return null;
}

export async function loadPrefs(): Promise<Prefs> {
  try {
    const [size, saved, phone, language] = await Promise.all([
      AsyncStorage.getItem(KEYS.textSize),
      AsyncStorage.getItem(KEYS.saved),
      AsyncStorage.getItem(KEYS.planPhone),
      AsyncStorage.getItem(KEYS.language),
    ]);
    let ids: string[] = [];
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) ids = parsed.filter((x): x is string => typeof x === 'string');
    }
    return {
      textSize: size === 'large' ? 'large' : 'normal',
      savedMedicationIds: ids,
      planPhone: phone ?? '',
      language: parseLanguage(language),
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

async function write(key: string, value: string) {
  try {
    if (value === '') await AsyncStorage.removeItem(key);
    else await AsyncStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}

export const saveTextSize = (size: TextSize) => write(KEYS.textSize, size);
export const saveSavedMedications = (ids: string[]) => write(KEYS.saved, JSON.stringify(ids));
export const savePlanPhone = (phone: string) => write(KEYS.planPhone, phone);
export const saveLanguage = (lang: Language) => write(KEYS.language, lang);

const SESSION_KEY = '@calrx/web-session';

const SCREENS: ScreenId[] = [
  'language',
  'insurance',
  'insuredNotice',
  'household',
  'income',
  'eligibility',
  'search',
  'results',
  'help',
  'saved',
];

export type WebSession = {
  screen: ScreenId;
  history: ScreenId[];
  insurance: InsuranceStatus;
  household: HouseholdSize | null;
  income: IncomeBracket | null;
  medicationId: string | null;
  resultsTab: 'rx' | 'pap';
  searchQuery: string;
  language: Language;
};

function webStore(): Storage | null {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* private mode */
  }
  try {
    if (typeof sessionStorage !== 'undefined') return sessionStorage;
  } catch {
    /* ignore */
  }
  return null;
}

export function loadWebSession(): WebSession | null {
  const store = webStore();
  if (!store) return null;
  try {
    const raw = store.getItem(SESSION_KEY) ?? (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) : null);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WebSession>;
    if (!parsed.screen || !SCREENS.includes(parsed.screen)) return null;
    const history = Array.isArray(parsed.history)
      ? parsed.history.filter((s): s is ScreenId => SCREENS.includes(s))
      : [];
    return {
      screen: parsed.screen,
      history,
      insurance: parsed.insurance === 'yes' || parsed.insurance === 'no' ? parsed.insurance : null,
      household:
        parsed.household === 1 ||
        parsed.household === 2 ||
        parsed.household === 3 ||
        parsed.household === 4 ||
        parsed.household === 5
          ? parsed.household
          : null,
      income: parsed.income === 'A' || parsed.income === 'B' || parsed.income === 'C' ? parsed.income : null,
      medicationId: typeof parsed.medicationId === 'string' ? parsed.medicationId : null,
      resultsTab: parsed.resultsTab === 'pap' ? 'pap' : 'rx',
      searchQuery: typeof parsed.searchQuery === 'string' ? parsed.searchQuery : '',
      language:
        parsed.language === 'es' || parsed.language === 'zh' || parsed.language === 'hi'
          ? parsed.language
          : 'en',
    };
  } catch {
    return null;
  }
}

export function saveWebSession(session: WebSession) {
  const store = webStore();
  if (!store) return;
  try {
    store.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearWebSession() {
  const store = webStore();
  if (!store) return;
  try {
    store.removeItem(SESSION_KEY);
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
