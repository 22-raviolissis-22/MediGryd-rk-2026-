import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChoiceButton, Screen, openUrl } from '../components/ui';
import { useApp } from '../context';
import { t } from '../i18n';
import { colors, radius } from '../theme';

export function ResultsScreen() {
  const { language, medication, insurance, reset } = useApp();
  const c = t(language);
  const [tab, setTab] = useState<'rx' | 'pap'>('rx');
  const med = medication;

  const pharmacies = useMemo(
    () => (med ? [...med.pharmacies].sort((a, b) => a.price - b.price) : []),
    [med]
  );

  if (!med) {
    return (
      <Screen>
        <Text style={styles.missing}>{c.noMatches}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.kicker}>{c.resultsFor}</Text>
      <Text style={styles.medName}>{med.brand}</Text>
      <Text style={styles.generic}>
        {med.generic} · {language === 'es' ? med.formEs : med.form}
      </Text>
      {insurance === 'yes' ? <Text style={styles.banner}>{c.insuredBanner}</Text> : null}

      <View style={styles.tabs}>
        <Pressable
          onPress={() => setTab('rx')}
          style={[styles.tab, tab === 'rx' && styles.tabOn]}
        >
          <Text style={[styles.tabTxt, tab === 'rx' && styles.tabTxtOn]}>{c.pharmaciesTab}</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('pap')}
          style={[styles.tab, tab === 'pap' && styles.tabOn]}
        >
          <Text style={[styles.tabTxt, tab === 'pap' && styles.tabTxtOn]}>{c.papsTab}</Text>
        </Pressable>
      </View>

      {tab === 'rx' ? (
        <>
          <Text style={styles.note}>{c.couponNote}</Text>
          {pharmacies.map((p, i) => (
            <View key={p.name} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.pharm}>{p.name}</Text>
                {i === 0 ? (
                  <View style={styles.best}>
                    <Text style={styles.bestTxt}>
                      {language === 'en' ? 'Lowest' : 'Más bajo'}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.meta}>
                {p.distanceMiles.toFixed(1)} {c.miles} · {p.address} · {p.hours}
              </Text>
              <Text style={styles.price}>${p.price.toFixed(2)}</Text>
              <Text style={styles.cash}>{c.cashPrice}</Text>
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.note}>{c.papHint}</Text>
          {med.programs.length === 0 ? <Text style={styles.note}>{c.noPrograms}</Text> : null}
          {med.programs.map((prog) => (
            <View key={prog.name + prog.sponsor} style={styles.card}>
              <View style={styles.kind}>
                <Text style={styles.kindTxt}>
                  {prog.kind === 'pap' ? c.manufacturerPAP : c.nonprofit}
                </Text>
              </View>
              <Text style={styles.pharm}>{prog.name}</Text>
              <Text style={styles.meta}>{prog.sponsor}</Text>
              <Text style={styles.body}>
                {language === 'es' ? prog.summaryEs : prog.summary}
              </Text>
              <Text style={styles.elig}>
                {language === 'es' ? prog.eligibilityEs : prog.eligibility}
              </Text>
              <ChoiceButton label={c.apply} onPress={() => openUrl(prog.url)} />
            </View>
          ))}
        </>
      )}

      <Pressable onPress={reset} style={styles.restart}>
        <Text style={styles.restartTxt}>{c.restart}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { color: colors.muted, fontWeight: '700', fontSize: 13, marginTop: 4 },
  medName: { fontSize: 28, fontWeight: '800', color: colors.ink },
  generic: { color: colors.muted, marginBottom: 8 },
  banner: {
    backgroundColor: colors.moss,
    color: colors.forestDark,
    padding: 10,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 13,
    lineHeight: 18,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    padding: 4,
    gap: 4,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 14, alignItems: 'center' },
  tabOn: { backgroundColor: colors.forest },
  tabTxt: { fontSize: 12, fontWeight: '800', color: colors.forest, textAlign: 'center' },
  tabTxtOn: { color: colors.white },
  note: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  card: {
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 4,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pharm: { fontSize: 16, fontWeight: '800', color: colors.ink, flex: 1 },
  best: {
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  bestTxt: { color: colors.forestDark, fontWeight: '800', fontSize: 11 },
  meta: { color: colors.muted, fontSize: 12 },
  price: { fontSize: 26, fontWeight: '800', color: colors.forest, marginTop: 4 },
  cash: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  kind: {
    alignSelf: 'flex-start',
    backgroundColor: colors.moss,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  kindTxt: { fontSize: 11, fontWeight: '800', color: colors.forest },
  body: { color: colors.ink, fontSize: 14, lineHeight: 20, marginTop: 4 },
  elig: { color: colors.muted, fontSize: 12, lineHeight: 18, marginBottom: 6 },
  restart: { alignItems: 'center', paddingVertical: 16 },
  restartTxt: { color: colors.forest, fontWeight: '800' },
  missing: { color: colors.muted, marginTop: 24 },
});
