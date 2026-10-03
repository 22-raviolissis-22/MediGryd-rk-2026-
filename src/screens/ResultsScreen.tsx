import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppChrome,
  BodyText,
  DisplayTitle,
  WhiteCard,
  WhitePill,
} from '../components/AppChrome';
import { openUrl } from '../components/ui';
import { useApp } from '../context';
import { t } from '../i18n';
import { fonts, ink, periwinkle } from '../theme';

export function ResultsScreen() {
  const { language, medication, insurance } = useApp();
  const c = t(language);
  const [tab, setTab] = useState<'rx' | 'pap'>('rx');
  const med = medication;

  const pharmacies = useMemo(
    () => (med ? [...med.pharmacies].sort((a, b) => a.price - b.price) : []),
    [med]
  );

  if (!med) {
    return (
      <AppChrome>
        <WhiteCard>
          <BodyText>{c.noMatches}</BodyText>
        </WhiteCard>
      </AppChrome>
    );
  }

  return (
    <AppChrome>
      <WhiteCard>
        <BodyText>{c.resultsFor}</BodyText>
        <DisplayTitle>{med.brand}</DisplayTitle>
        <BodyText>
          {med.generic} · {language === 'es' ? med.formEs : med.form}
        </BodyText>
      </WhiteCard>
      {insurance === 'yes' ? (
        <WhiteCard>
          <BodyText>{c.insuredBanner}</BodyText>
        </WhiteCard>
      ) : null}

      <View style={styles.tabs}>
        <Pressable onPress={() => setTab('rx')} style={[styles.tab, tab === 'rx' && styles.tabOn]}>
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
          <BodyText>{c.couponNote}</BodyText>
          {pharmacies.map((p, i) => (
            <WhiteCard key={p.name}>
              <Text style={styles.pharm}>{p.name}</Text>
              <Text style={styles.meta}>
                {p.distanceMiles.toFixed(1)} {c.miles} · {p.address}
              </Text>
              <Text style={styles.price}>${p.price.toFixed(2)}</Text>
              <Text style={styles.cash}>{c.cashPrice}</Text>
              {i === 0 ? <Text style={styles.best}>{language === 'en' ? 'Lowest' : 'Más bajo'}</Text> : null}
            </WhiteCard>
          ))}
        </>
      ) : (
        <>
          <BodyText>{c.papHint}</BodyText>
          {med.programs.map((prog) => (
            <View key={prog.name + prog.sponsor}>
              <WhiteCard>
                <Text style={styles.kind}>
                  {prog.kind === 'pap' ? c.manufacturerPAP : c.nonprofit}
                </Text>
                <Text style={styles.pharm}>{prog.name}</Text>
                <BodyText>{language === 'es' ? prog.summaryEs : prog.summary}</BodyText>
              </WhiteCard>
              <WhitePill label={c.apply} onPress={() => openUrl(prog.url)} />
            </View>
          ))}
        </>
      )}
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', gap: 8 },
  tab: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabOn: { backgroundColor: periwinkle },
  tabTxt: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: ink,
    textAlign: 'center',
  },
  tabTxtOn: { color: '#FFFFFF' },
  pharm: { fontFamily: fonts.display, fontSize: 18, color: ink, textAlign: 'center' },
  meta: { fontFamily: fonts.body, fontSize: 12, color: '#444', textAlign: 'center', marginTop: 4 },
  price: { fontFamily: fonts.display, fontSize: 28, color: ink, textAlign: 'center', marginTop: 6 },
  cash: { fontFamily: fonts.body, fontSize: 12, textAlign: 'center', color: '#444' },
  best: { fontFamily: fonts.bodyBold, textAlign: 'center', marginTop: 6, color: '#5B7AD4' },
  kind: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textAlign: 'center',
    color: '#5B7AD4',
    marginBottom: 4,
  },
});
