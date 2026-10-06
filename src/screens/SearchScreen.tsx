import { useMemo } from 'react';
import { AppChrome, BodyText, WhiteCard } from '../components/AppChrome';
import { MedicationRow } from '../components/MedicationRow';
import { useApp } from '../context';
import { medications, searchMedications } from '../data/medications';
import { t } from '../i18n';
import type { Medication } from '../types';

export function SearchScreen() {
  const { language, go, setMedication, searchQuery } = useApp();
  const c = t(language);

  const results = useMemo(() => searchMedications(searchQuery), [searchQuery]);
  const list = searchQuery.trim() ? results : medications;
  const emptySearch = searchQuery.trim().length > 0 && results.length === 0;

  const select = (med: Medication) => {
    setMedication(med);
    go('results');
  };

  return (
    <AppChrome autoFocusSearch>
      <WhiteCard>
        <BodyText>
          {emptySearch ? c.noMatches : searchQuery.trim() ? c.commonRx : c.searchEmpty}
        </BodyText>
      </WhiteCard>
      {list.map((med) => (
        <MedicationRow key={med.id} med={med} onOpen={() => select(med)} />
      ))}
    </AppChrome>
  );
}