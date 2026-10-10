import { AppChrome, BodyText, DisplayTitle, WhiteCard, WhitePill } from '../components/AppChrome';
import { MedicationRow } from '../components/MedicationRow';
import { useApp } from '../context';
import { medications } from '../data/medications';
import { t } from '../i18n';
import type { Medication } from '../types';

export function SavedScreen() {
  const { language, savedMedicationIds, setMedication, go } = useApp();
  const c = t(language);
  const saved = savedMedicationIds
    .map((id) => medications.find((m) => m.id === id))
    .filter((m): m is Medication => m != null);

  return (
    <AppChrome>
      <WhiteCard>
        <DisplayTitle>{c.savedTitle}</DisplayTitle>
        <BodyText>{saved.length === 0 ? c.savedEmpty : c.savedIntro}</BodyText>
      </WhiteCard>
      {saved.map((med) => (
        <MedicationRow
          key={med.id}
          med={med}
          onOpen={() => {
            setMedication(med);
            go('results');
          }}
        />
      ))}
      {saved.length === 0 ? (
        <WhitePill display label={c.browseMedicines} onPress={() => go('results')} />
      ) : null}
    </AppChrome>
  );
}
