import { useMemo } from 'react';
import { AppChrome, BodyText, DisplayTitle, WhiteCard } from '../components/AppChrome';
import { MedicationRow } from '../components/MedicationRow';
import { useApp } from '../context';
import { papMedications, regularMedications, searchInCatalog } from '../data/medications';
import { t } from '../i18n';
import type { Medication } from '../types';

export function SearchScreen() {
  const { language, go, openMedication, searchQuery } = useApp();
  const c = t(language);

  const rxHits = useMemo(
    () => searchInCatalog(regularMedications, searchQuery),
    [searchQuery]
  );
  const papHits = useMemo(() => searchInCatalog(papMedications, searchQuery), [searchQuery]);
  const emptySearch =
    searchQuery.trim().length > 0 && rxHits.length === 0 && papHits.length === 0;

  const select = (med: Medication) => {
    openMedication(med);
    go('results');
  };

  return (
    <AppChrome>
      <WhiteCard>
        <BodyText>
          {emptySearch ? c.noMatches : searchQuery.trim() ? c.commonRx : c.searchEmpty}
        </BodyText>
      </WhiteCard>
      {rxHits.length > 0 ? (
        <>
          <DisplayTitle>{c.pharmaciesTab}</DisplayTitle>
          {rxHits.map((med) => (
            <MedicationRow key={med.id} med={med} onOpen={() => select(med)} />
          ))}
        </>
      ) : null}
      {papHits.length > 0 ? (
        <>
          <DisplayTitle>{c.papsTab}</DisplayTitle>
          {papHits.map((med) => (
            <MedicationRow key={med.id} med={med} onOpen={() => select(med)} />
          ))}
        </>
      ) : null}
    </AppChrome>
  );
}
