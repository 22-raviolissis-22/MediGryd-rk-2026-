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
import { incomeOptions } from '../data/income';
import { fillScript, papListingsAreStale, rankPrograms, type RankedProgram } from '../data/papMatcher';
import { nadacPriceFor } from '../prices/nadacFeed';
import { ink, periwinkle, typeface } from '../theme';
import type { HouseholdSize } from '../types';

export function ResultsScreen() {
  const { language, medication, insurance, household, income, nadacFeed } = useApp();
  const c = t(language);
  const [tab, setTab] = useState<'rx' | 'pap'>('rx');
  const med = medication;
  const nadacAsOfLabel = fill(c.pricesUpdatedAsOf, { date: formatIsoDate(nadacFeed.asOfDate, language) });
  const costPlusAsOfLabel = fill(c.costPlusAsOf, { date: formatIsoDate(COST_PLUS_AS_OF, language) });
  const size: HouseholdSize = household ?? 1;
  const incomeLabel = income
    ? incomeOptions(size, language)[income]
    : c.papIncomeSkipped;
  const insuredBit = insurance === 'yes' ? c.papYouInsured : c.papYouUninsured;

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
              <Text style={[styles.note, typeface(language, 'body')]}>{c.goodRxPromoNote}</Text>
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
        <PapTab
          language={language}
          hasManufacturerPap={med.hasManufacturerPap}
          ranked={rankPrograms({
            programIds: med.programIds,
            insurance,
            household,
            income,
            language,
            incomeLabel,
            insuredLabel: c.papYouInsured,
            uninsuredLabel: c.papYouUninsured,
            userLineTpl: c.papUserSituation,
            cutoffLineTpl: c.papCutoffVsYou,
            unpublishedCutoff: c.papUnpublishedCutoff,
            noLimitCutoff: c.papNoLimitCutoff,
          })}
          scriptVars={{
            size: household ? String(household) : c.papHouseholdSkipped,
            income: incomeLabel,
            insured: insuredBit,
            drug: `${med.brand} (${med.generic})`,
          }}
        />
      )}
    </AppChrome>
  );
}

function PapTab({
  language,
  hasManufacturerPap,
  ranked,
  scriptVars,
}: {
  language: import('../types').Language;
  hasManufacturerPap: boolean;
  ranked: RankedProgram[];
  scriptVars: { size: string; income: string; insured: string; drug: string };
}) {
  const c = t(language);
  const likely = ranked.filter((r) => r.bucket === 'likely');
  const other = ranked.filter((r) => r.bucket === 'other');
  const userLine = fill(c.papUserSituation, {
    size: scriptVars.size,
    income: scriptVars.income,
    insured: scriptVars.insured,
  });

  return (
    <>
      {papListingsAreStale(ranked.map((r) => r.program)) ? (
        <WhiteCard>
          <Text style={[styles.renewal, typeface(language, 'body')]}>{c.papStaleBanner}</Text>
        </WhiteCard>
      ) : null}
      <WhiteCard>
        <BodyText>{c.papHint}</BodyText>
        <Text style={[styles.note, typeface(language, 'body')]}>{c.papDisclaimer}</Text>
        <Text style={[styles.renewal, typeface(language, 'bodyBold')]}>{c.papRenewal}</Text>
      </WhiteCard>
      <WhiteCard>
        <Text style={[styles.meta, typeface(language, 'body')]}>{userLine}</Text>
      </WhiteCard>
      {!hasManufacturerPap ? (
        <WhiteCard>
          <Text style={[styles.closed, typeface(language, 'bodyBold')]}>{c.papNoManufacturer}</Text>
        </WhiteCard>
      ) : null}
      {ranked.length === 0 ? (
        <WhiteCard>
          <BodyText>{c.papNoProgramsAtAll}</BodyText>
        </WhiteCard>
      ) : null}

      {ranked.length > 0 ? (
        <>
          <DisplayTitle>{c.papLikelyTitle}</DisplayTitle>
          {likely.length === 0 ? (
            <WhiteCard>
              <BodyText>{c.papEmptyLikely}</BodyText>
            </WhiteCard>
          ) : (
            likely.map((row) => (
              <ProgramCard
                key={row.program.id}
                row={row}
                language={language}
                scriptVars={scriptVars}
                userLine={userLine}
              />
            ))
          )}
          {other.length > 0 ? <DisplayTitle>{c.papOtherTitle}</DisplayTitle> : null}
          {other.map((row) => (
            <ProgramCard
              key={row.program.id}
              row={row}
              language={language}
              scriptVars={scriptVars}
              userLine={userLine}
            />
          ))}
        </>
      ) : null}
    </>
  );
}

function ProgramCard({
  row,
  language,
  scriptVars,
  userLine,
}: {
  row: RankedProgram;
  language: import('../types').Language;
  scriptVars: { size: string; income: string; insured: string; drug: string };
  userLine: string;
}) {
  const c = t(language);
  const p = row.program;
  return (
    <View>
      <WhiteCard>
        <Text style={[styles.kind, typeface(language, 'bodyBold')]}>
          {p.closedToNew
            ? c.papClosed
            : p.kind === 'pap'
              ? c.manufacturerPAP
              : c.nonprofit}
        </Text>
        <Text style={[styles.pharm, typeface(language, 'display')]}>{p.name}</Text>
        <BodyText>{loc(p.summary, language)}</BodyText>
        <Text style={[styles.section, typeface(language, 'bodyBold')]}>{c.papCovers}</Text>
        <Text style={[styles.meta, typeface(language, 'body')]}>{loc(p.covers, language)}</Text>
        <Text style={[styles.compare, typeface(language, 'bodyBold')]}>{userLine}</Text>
        <Text style={[styles.compare, typeface(language, 'body')]}>{row.cutoffLine}</Text>
        <Text style={[styles.section, typeface(language, 'bodyBold')]}>{c.papDocuments}</Text>
        {p.documents.map((d) => (
          <Text key={d.en} style={[styles.bullet, typeface(language, 'body')]}>
            {`•  ${loc(d, language)}`}
          </Text>
        ))}
        <Text style={[styles.section, typeface(language, 'bodyBold')]}>{c.papSend}</Text>
        <Text style={[styles.meta, typeface(language, 'body')]}>{loc(p.sendWhere, language)}</Text>
        <Text style={[styles.section, typeface(language, 'bodyBold')]}>{c.papCall}</Text>
        <Text style={[styles.phone, typeface(language, 'display')]}>{p.phone}</Text>
        <Text style={[styles.section, typeface(language, 'bodyBold')]}>{c.papScript}</Text>
        <Text style={[styles.script, typeface(language, 'body')]}>
          {fillScript(loc(p.callScript, language), scriptVars)}
        </Text>
        <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>
          {fill(c.papVerifiedAsOf, { date: formatIsoDate(p.verifiedAsOf, language) })}
        </Text>
      </WhiteCard>
      <WhitePill label={c.papOpenApply} onPress={() => openUrl(p.applicationUrl)} />
    </View>
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
  renewal: {
    fontSize: 13,
    lineHeight: 18,
    color: '#2C4A9A',
    textAlign: 'center',
    marginTop: 10,
  },
  closed: {
    fontSize: 13,
    lineHeight: 18,
    color: '#2C4A9A',
    textAlign: 'center',
  },
  section: {
    fontSize: 12,
    color: '#5B7AD4',
    textAlign: 'center',
    marginTop: 10,
  },
  bullet: {
    fontSize: 12,
    lineHeight: 17,
    color: '#444',
    textAlign: 'left',
    marginTop: 4,
  },
  compare: {
    fontSize: 12,
    lineHeight: 17,
    color: '#2C4A9A',
    textAlign: 'center',
    marginTop: 6,
  },
  phone: { fontSize: 18, color: ink, textAlign: 'center', marginTop: 4 },
  script: {
    fontSize: 12,
    lineHeight: 18,
    color: '#333',
    textAlign: 'left',
    marginTop: 6,
  },
});
