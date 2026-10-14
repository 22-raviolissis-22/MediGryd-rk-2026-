import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  HouseholdSize,
  IncomeBracket,
  InsuranceStatus,
  Language,
  Medication,
  ScreenId,
} from './types';
import { bundledNadacFeed, resolveNadacFeed, type NadacFeed } from './prices/nadacFeed';
import { medications } from './data/medications';
import {
  DEFAULT_PREFS,
  clearWebSession,
  loadPrefs,
  loadWebSession,
  saveLanguage,
  savePlanPhone,
  saveSavedMedications,
  saveTextSize,
  saveWebSession,
  type TextSize,
} from './storage';

type AppState = {
  language: Language;
  screen: ScreenId;
  insurance: InsuranceStatus;
  household: HouseholdSize | null;
  income: IncomeBracket | null;
  medication: Medication | null;
  resultsTab: 'rx' | 'pap';
  searchQuery: string;
  nadacFeed: NadacFeed;
  canGoBack: boolean;
  textSize: TextSize;
  textScale: number;
  savedMedicationIds: string[];
  planPhone: string;
  setLanguage: (lang: Language) => void;
  go: (screen: ScreenId) => void;
  back: () => void;
  setInsurance: (value: InsuranceStatus) => void;
  setHousehold: (value: HouseholdSize) => void;
  setIncome: (value: IncomeBracket) => void;
  setMedication: (med: Medication) => void;
  setResultsTab: (tab: 'rx' | 'pap') => void;
  openMedication: (med: Medication) => void;
  setSearchQuery: (q: string) => void;
  setTextSize: (size: TextSize) => void;
  isSaved: (medId: string) => boolean;
  toggleSaved: (medId: string) => void;
  setPlanPhone: (phone: string) => void;
  reset: () => void;
};

export const LARGE_TEXT_SCALE = 1.3;

const AppContext = createContext<AppState | null>(null);

function medById(id: string | null): Medication | null {
  if (!id) return null;
  return medications.find((m) => m.id === id) ?? null;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [restored] = useState(() => loadWebSession());
  const [language, setLanguage] = useState<Language>(restored?.language ?? 'en');
  const [screen, setScreen] = useState<ScreenId>(restored?.screen ?? 'language');
  const [history, setHistory] = useState<ScreenId[]>(restored?.history ?? []);
  const [insurance, setInsurance] = useState<InsuranceStatus>(restored?.insurance ?? null);
  const [household, setHousehold] = useState<HouseholdSize | null>(restored?.household ?? null);
  const [income, setIncome] = useState<IncomeBracket | null>(restored?.income ?? null);
  const [medication, setMedication] = useState<Medication | null>(() =>
    medById(restored?.medicationId ?? null)
  );
  const [resultsTab, setResultsTab] = useState<'rx' | 'pap'>(restored?.resultsTab ?? 'rx');
  const [searchQuery, setSearchQuery] = useState(restored?.searchQuery ?? '');
  const [nadacFeed, setNadacFeed] = useState<NadacFeed>(bundledNadacFeed);
  const [textSize, setTextSizeState] = useState<TextSize>(DEFAULT_PREFS.textSize);
  const [savedMedicationIds, setSavedIds] = useState<string[]>(DEFAULT_PREFS.savedMedicationIds);
  const [planPhone, setPlanPhoneState] = useState(DEFAULT_PREFS.planPhone);

  useEffect(() => {
    let cancelled = false;
    resolveNadacFeed()
      .then((feed) => {
        if (!cancelled) setNadacFeed(feed);
      })
      .catch(() => {
        /* bundled snapshot already shown */
      });
    loadPrefs().then((prefs) => {
      if (cancelled) return;
      setTextSizeState(prefs.textSize);
      setSavedIds(prefs.savedMedicationIds);
      setPlanPhoneState(prefs.planPhone);
      if (prefs.language) setLanguage(prefs.language);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    saveWebSession({
      screen,
      history,
      insurance,
      household,
      income,
      medicationId: medication?.id ?? null,
      resultsTab,
      searchQuery,
      language,
    });
  }, [
    screen,
    history,
    insurance,
    household,
    income,
    medication,
    resultsTab,
    searchQuery,
    language,
  ]);

  const value = useMemo<AppState>(
    () => ({
      language,
      screen,
      insurance,
      household,
      income,
      medication,
      resultsTab,
      searchQuery,
      nadacFeed,
      canGoBack: history.length > 0,
      textSize,
      textScale: textSize === 'large' ? LARGE_TEXT_SCALE : 1,
      savedMedicationIds,
      planPhone,
      setLanguage: (lang) => {
        setLanguage(lang);
        saveLanguage(lang);
      },
      go: (next) => {
        setHistory((h) => (screen === next ? h : [...h, screen]));
        setScreen(next);
      },
      back: () => {
        setHistory((h) => {
          if (h.length === 0) return h;
          const prev = h[h.length - 1];
          setScreen(prev);
          return h.slice(0, -1);
        });
      },
      setInsurance,
      setHousehold,
      setIncome,
      setMedication,
      setResultsTab,
      openMedication: (med) => {
        setMedication(med);
        setResultsTab(med.kind === 'pap' ? 'pap' : 'rx');
      },
      setSearchQuery,
      setTextSize: (size) => {
        setTextSizeState(size);
        saveTextSize(size);
      },
      isSaved: (medId) => savedMedicationIds.includes(medId),
      toggleSaved: (medId) => {
        setSavedIds((ids) => {
          const next = ids.includes(medId) ? ids.filter((id) => id !== medId) : [...ids, medId];
          saveSavedMedications(next);
          return next;
        });
      },
      setPlanPhone: (phone) => {
        setPlanPhoneState(phone);
        savePlanPhone(phone);
      },
      reset: () => {
        clearWebSession();
        setScreen('language');
        setHistory([]);
        setInsurance(null);
        setHousehold(null);
        setIncome(null);
        setMedication(null);
        setResultsTab('rx');
        setSearchQuery('');
      },
    }),
    [
      language,
      screen,
      insurance,
      household,
      income,
      medication,
      resultsTab,
      searchQuery,
      nadacFeed,
      history,
      textSize,
      savedMedicationIds,
      planPhone,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
