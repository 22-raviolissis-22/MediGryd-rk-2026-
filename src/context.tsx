import React, { createContext, useContext, useMemo, useState } from 'react';
import type {
  HouseholdSize,
  IncomeBracket,
  InsuranceStatus,
  Language,
  Medication,
  ScreenId,
} from './types';

type AppState = {
  language: Language;
  screen: ScreenId;
  insurance: InsuranceStatus;
  household: HouseholdSize | null;
  income: IncomeBracket | null;
  medication: Medication | null;
  searchQuery: string;
  setLanguage: (lang: Language) => void;
  go: (screen: ScreenId) => void;
  back: () => void;
  setInsurance: (value: InsuranceStatus) => void;
  setHousehold: (value: HouseholdSize) => void;
  setIncome: (value: IncomeBracket) => void;
  setMedication: (med: Medication) => void;
  setSearchQuery: (q: string) => void;
  reset: () => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [screen, setScreen] = useState<ScreenId>('language');
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [insurance, setInsurance] = useState<InsuranceStatus>(null);
  const [household, setHousehold] = useState<HouseholdSize | null>(null);
  const [income, setIncome] = useState<IncomeBracket | null>(null);
  const [medication, setMedication] = useState<Medication | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const value = useMemo<AppState>(
    () => ({
      language,
      screen,
      insurance,
      household,
      income,
      medication,
      searchQuery,
      setLanguage,
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
      setSearchQuery,
      reset: () => {
        setScreen('language');
        setHistory([]);
        setInsurance(null);
        setHousehold(null);
        setIncome(null);
        setMedication(null);
        setSearchQuery('');
      },
    }),
    [language, screen, insurance, household, income, medication, searchQuery]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
