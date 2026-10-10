import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language } from './types';

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
