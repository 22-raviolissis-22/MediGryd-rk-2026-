import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, Title } from '../components/ui';
import { useApp } from '../context';
import { medications, searchMedications } from '../data/medications';
import { t } from '../i18n';
import { colors, radius } from '../theme';
import type { Medication } from '../types';

export function SearchScreen() {
  const { language, go, setMedication } = useApp();
  const c = t(language);
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchMedications(query), [query]);
  const list = query.trim() ? results : medications;
  const emptySearch = query.trim().length > 0 && results.length === 0;

  const select = (med: Medication) => {
    setMedication(med);
    go('results');
  };

  return (
    <Screen>
      <Title>{c.searchTitle}</Title>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={c.searchPlaceholder}
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          returnKeyType="search"
        />
      </View>
      {emptySearch ? (
        <Text style={styles.hint}>{c.noMatches}</Text>
      ) : (
        <Text style={styles.hint}>{query.trim() ? c.commonRx : c.searchEmpty}</Text>
      )}
      {list.map((med) => (
        <Pressable
          key={med.id}
          onPress={() => select(med)}
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.brand}>{med.brand}</Text>
          <Text style={styles.generic}>
            {med.generic} · {language === 'es' ? med.formEs : med.form}
          </Text>
          <Text style={styles.cat}>{language === 'es' ? med.categoryEs : med.category}</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.forest,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  input: {
    height: 46,
    fontSize: 16,
    color: colors.ink,
  },
  hint: { color: colors.muted, fontWeight: '700', marginTop: 4, fontSize: 13 },
  card: {
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  brand: { fontSize: 17, fontWeight: '800', color: colors.ink },
  generic: { color: colors.muted, marginTop: 2, fontSize: 13 },
  cat: { color: colors.leaf, marginTop: 6, fontWeight: '700', fontSize: 12 },
});
