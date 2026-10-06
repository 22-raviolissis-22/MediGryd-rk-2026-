import { Pressable, StyleSheet, View } from 'react-native';
import { ChipButton, shadow } from './AppChrome';
import { Text } from './AppText';
import { useApp } from '../context';
import { fill, loc, t } from '../i18n';
import { ink, typeface } from '../theme';
import type { Medication } from '../types';

export function SaveToggle({ med }: { med: Medication }) {
  const { language, isSaved, toggleSaved } = useApp();
  const c = t(language);
  const saved = isSaved(med.id);
  return (
    <ChipButton
      label={saved ? `★  ${c.savedMed}` : `☆  ${c.saveMed}`}
      selected={saved}
      onPress={() => toggleSaved(med.id)}
      accessibilityLabel={fill(saved ? c.unsaveA11y : c.saveA11y, { drug: med.brand })}
    />
  );
}

export function MedicationRow({ med, onOpen }: { med: Medication; onOpen: () => void }) {
  const { language } = useApp();
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onOpen}
        style={({ pressed }) => [styles.info, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`${med.brand}, ${med.generic}`}
      >
        <Text style={[styles.brand, typeface(language, 'display')]}>{med.brand}</Text>
        <Text style={[styles.generic, typeface(language, 'body')]}>
          {med.generic} · {loc(med.form, language)}
        </Text>
        <Text style={[styles.cat, typeface(language, 'bodySemi')]}>
          {loc(med.category, language)}
        </Text>
      </Pressable>
      <SaveToggle med={med} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...shadow,
  },
  info: { flex: 1 },
  brand: { fontSize: 18, color: ink },
  generic: { color: '#444', marginTop: 2, fontSize: 13 },
  cat: { color: '#5B7AD4', marginTop: 6, fontSize: 12 },
  pressed: { opacity: 0.75 },
});
