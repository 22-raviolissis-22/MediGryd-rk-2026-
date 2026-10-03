import { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { AppChrome, BodyText, WhiteCard } from '../components/AppChrome';
import { useApp } from '../context';
import { medications, searchMedications } from '../data/medications';
import { t } from '../i18n';
import { fonts, ink } from '../theme';
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
        <Pressable key={med.id} onPress={() => select(med)} style={styles.card}>
          <Text style={styles.brand}>{med.brand}</Text>
          <Text style={styles.generic}>
            {med.generic} · {language === 'es' ? med.formEs : med.form}
          </Text>
          <Text style={styles.cat}>{language === 'es' ? med.categoryEs : med.category}</Text>
        </Pressable>
      ))}
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
  },
  brand: { fontFamily: fonts.display, fontSize: 18, color: ink },
  generic: { fontFamily: fonts.body, color: '#444', marginTop: 2, fontSize: 13 },
  cat: { fontFamily: fonts.bodySemi, color: '#5B7AD4', marginTop: 6, fontSize: 12 },
});
