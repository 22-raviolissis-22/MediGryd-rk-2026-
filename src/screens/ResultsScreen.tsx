import { useState } from 'react';
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
          <WhiteCard>
            <BodyText>{c.priceDisclaimer}</BodyText>
            <Text style={styles.retrieved}>{c.retrievedOn}</Text>
          </WhiteCard>
          {med.benchmarks.map((b) => (
            <WhiteCard key={b.source + (b.package || '')}>
              <Text style={styles.kind}>{b.sourceLabel}</Text>
              <Text style={styles.price}>
                {b.price == null ? c.notListed : `$${b.price.toFixed(2)}`}
              </Text>
              <Text style={styles.meta}>{language === 'es' ? b.packageEs : b.package}</Text>
              <Text style={styles.note}>{language === 'es' ? b.noteEs : b.note}</Text>
            </WhiteCard>
          ))}
          <DisplayTitle>{c.nearbyPharmacies}</DisplayTitle>
          <BodyText>{c.nearbyHint}</BodyText>
          {med.pharmacies.map((p) => (
            <View key={p.district + p.address}>
              <WhiteCard>
                <Text style={styles.pharm}>{p.name}</Text>
                <Text style={styles.kind}>{p.district}</Text>
                <Text style={styles.meta}>{p.address}</Text>
                <Text style={styles.meta}>{p.hours}</Text>
              </WhiteCard>
              <WhitePill label={c.openLocator} onPress={() => openUrl(p.locatorUrl)} />
            </View>
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
  note: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: '#444',
    textAlign: 'center',
    marginTop: 8,
  },
  retrieved: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: '#5B7AD4',
  },
  kind: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textAlign: 'center',
    color: '#5B7AD4',
    marginBottom: 4,
  },
});
