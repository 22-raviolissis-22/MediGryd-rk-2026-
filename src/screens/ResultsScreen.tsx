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
import { fill, formatIsoDate, loc, pharmacyHours, t } from '../i18n';
import { COST_PLUS_AS_OF } from '../data/medications';
import { nadacPriceFor } from '../prices/nadacFeed';
import { ink, periwinkle, typeface } from '../theme';

export function ResultsScreen() {
  const { language, medication, insurance, nadacFeed } = useApp();
  const c = t(language);
  const [tab, setTab] = useState<'rx' | 'pap'>('rx');
  const med = medication;
  const nadacAsOfLabel = fill(c.pricesUpdatedAsOf, { date: formatIsoDate(nadacFeed.asOfDate, language) });
  const costPlusAsOfLabel = fill(c.costPlusAsOf, { date: formatIsoDate(COST_PLUS_AS_OF, language) });

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
          {med.generic} · {loc(med.form, language)}
        </BodyText>
      </WhiteCard>
      {insurance === 'yes' ? (
        <WhiteCard>
          <BodyText>{c.insuredBanner}</BodyText>
        </WhiteCard>
      ) : null}

      <View style={styles.tabs}>
        <Pressable onPress={() => setTab('rx')} style={[styles.tab, tab === 'rx' && styles.tabOn]}>
          <Text
            style={[
              styles.tabTxt,
              typeface(language, 'bodyBold'),
              tab === 'rx' && styles.tabTxtOn,
            ]}
          >
            {c.pharmaciesTab}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('pap')}
          style={[styles.tab, tab === 'pap' && styles.tabOn]}
        >
          <Text
            style={[
              styles.tabTxt,
              typeface(language, 'bodyBold'),
              tab === 'pap' && styles.tabTxtOn,
            ]}
          >
            {c.papsTab}
          </Text>
        </Pressable>
      </View>

      {tab === 'rx' ? (
        <>
          <WhiteCard>
            <BodyText>{c.priceDisclaimer}</BodyText>
            <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>{nadacAsOfLabel}</Text>
          </WhiteCard>

          <DisplayTitle>{c.lowestToday}</DisplayTitle>

          {med.benchmarks
            .filter((b) => b.source === 'costplus')
            .map((b) => (
              <View key="costplus-buy">
                <WhiteCard>
                  <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.costPlusList}</Text>
                  <Text style={[styles.price, typeface(language, 'display')]}>
                    {b.price == null ? c.notListed : `$${b.price.toFixed(2)}`}
                  </Text>
                  <Text style={[styles.meta, typeface(language, 'body')]}>
                    {loc(b.package, language)}
                  </Text>
                  <Text style={[styles.note, typeface(language, 'body')]}>{c.costPlusHint}</Text>
                  <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>
                    {costPlusAsOfLabel}
                  </Text>
                  <Text style={[styles.note, typeface(language, 'body')]}>
                    {loc(b.note, language)}
                  </Text>
                </WhiteCard>
                {med.costPlusUrl ? (
                  <WhitePill label={c.buyCostPlus} onPress={() => openUrl(med.costPlusUrl!)} />
                ) : null}
              </View>
            ))}

          <View>
            <WhiteCard>
              <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.goodRxCoupon}</Text>
              <Text style={[styles.pharm, typeface(language, 'display')]}>{med.generic}</Text>
              <Text style={[styles.note, typeface(language, 'body')]}>{c.goodRxHint}</Text>
            </WhiteCard>
            <WhitePill label={c.openGoodRx} onPress={() => openUrl(med.goodrxUrl)} />
          </View>

          <DisplayTitle>{c.nadacBenchmark}</DisplayTitle>
          {med.benchmarks
            .filter((b) => b.source === 'nadac')
            .map((b) => {
              const live = nadacPriceFor(nadacFeed, med.id);
              const price = live ?? b.price;
              return (
              <WhiteCard key="nadac-ref">
                <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.nadacNotBuyable}</Text>
                <Text style={[styles.price, typeface(language, 'display')]}>
                  {price == null ? c.notListed : `$${price.toFixed(2)}`}
                </Text>
                <Text style={[styles.meta, typeface(language, 'body')]}>
                  {loc(b.package, language)}
                </Text>
                <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>{nadacAsOfLabel}</Text>
                <Text style={[styles.note, typeface(language, 'body')]}>
                  {loc(b.note, language)}
                </Text>
              </WhiteCard>
              );
            })}

          <DisplayTitle>{c.nearbyPharmacies}</DisplayTitle>
          <BodyText>{c.nearbyHint}</BodyText>
          {med.pharmacies.map((p) => (
            <View key={p.district + p.address}>
              <WhiteCard>
                <Text style={[styles.pharm, typeface(language, 'display')]}>{p.name}</Text>
                <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{p.district}</Text>
                <Text style={[styles.meta, typeface(language, 'body')]}>{p.address}</Text>
                <Text style={[styles.meta, typeface(language, 'body')]}>
                  {pharmacyHours(language, p.hoursId)}
                </Text>
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
                <Text style={[styles.kind, typeface(language, 'bodyBold')]}>
                  {prog.kind === 'pap' ? c.manufacturerPAP : c.nonprofit}
                </Text>
                <Text style={[styles.pharm, typeface(language, 'display')]}>{prog.name}</Text>
                <BodyText>{loc(prog.summary, language)}</BodyText>
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
    fontSize: 12,
    color: ink,
    textAlign: 'center',
  },
  tabTxtOn: { color: '#FFFFFF' },
  pharm: { fontSize: 18, color: ink, textAlign: 'center' },
  meta: { fontSize: 12, color: '#444', textAlign: 'center', marginTop: 4 },
  price: { fontSize: 28, color: ink, textAlign: 'center', marginTop: 6 },
  note: {
    fontSize: 12,
    lineHeight: 17,
    color: '#444',
    textAlign: 'center',
    marginTop: 8,
  },
  retrieved: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: '#5B7AD4',
  },
  kind: {
    fontSize: 12,
    textAlign: 'center',
    color: '#5B7AD4',
    marginBottom: 4,
  },
});
