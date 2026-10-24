import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText';
import {
  ActionStack,
  BodyText,
  DisplayTitle,
  SearchBox,
  WhiteCard,
  WhitePill,
} from '../components/AppChrome';
import { MedicationRow, SaveToggle } from '../components/MedicationRow';
import { openUrl } from '../components/ui';
import { useApp } from '../context';
import { fill, formatIsoDate, loc, pharmacyHours, t } from '../i18n';
import {
  COST_PLUS_AS_OF,
  papMedications,
  regularMedications,
  routeSearch,
  searchInCatalog,
} from '../data/medications';
import { incomeOptions } from '../data/income';
import {
  genericOutlookIsStale,
  outlookForMedication,
} from '../data/genericOutlook';
import {
  matcherConclusion,
  papListingsAreStale,
  rankPrograms,
  type RankedProgram,
} from '../data/papMatcher';
import { explainOptions } from '../data/explainOptions';
import { priceForQuantity, quantityLabel, type QuantityPricing } from '../data/quantityPricing';
import { ink, periwinkle, typeface } from '../theme';
import type { HouseholdSize, Medication } from '../types';

export function ResultsScreen() {
  const {
    language,
    medication,
    setMedication,
    insurance,
    household,
    income,
    nadacFeed,
    searchQuery,
    setSearchQuery,
    resultsTab,
    setResultsTab,
    openMedication,
  } = useApp();
  const c = t(language);
  const tab = resultsTab;
  const [papQuery, setPapQuery] = useState('');
  const [pickingRx, setPickingRx] = useState(!medication || medication.kind !== 'regular');
  const [pickingPap, setPickingPap] = useState(!medication || medication.kind !== 'pap');
  const searchSource = useRef<'rx' | 'pap' | null>(null);
  const med = medication;
  const pricing = med ? priceForQuantity(med, nadacFeed, null) : null;
  const rxList = useMemo(() => searchInCatalog(regularMedications, searchQuery), [searchQuery]);
  const papList = useMemo(() => searchInCatalog(papMedications, papQuery), [papQuery]);

  useEffect(() => {
    if (searchSource.current === 'pap') return;
    const hit = routeSearch(searchQuery);
    if (hit) {
      if (medication?.id !== hit.id) setMedication(hit);
      const nextTab = hit.kind === 'pap' ? 'pap' : 'rx';
      if (resultsTab !== nextTab) setResultsTab(nextTab);
      if (hit.kind === 'pap') {
        setPapQuery((q) => (q === searchQuery ? q : searchQuery));
        setPickingPap(false);
        setPickingRx(true);
      } else {
        setPickingRx(false);
        setPickingPap(true);
      }
      return;
    }
    const q = searchQuery.trim();
    if (q.length < 3) return;
    if (
      searchInCatalog(papMedications, q).length > 0 &&
      searchInCatalog(regularMedications, q).length === 0
    ) {
      if (resultsTab !== 'pap') setResultsTab('pap');
      setPapQuery((cur) => (cur === q ? cur : q));
      setPickingPap(true);
    }
  }, [searchQuery, medication?.id, resultsTab, setMedication, setResultsTab]);

  useEffect(() => {
    if (searchSource.current === 'rx') return;
    const hit = routeSearch(papQuery);
    if (hit) {
      if (medication?.id !== hit.id) setMedication(hit);
      const nextTab = hit.kind === 'pap' ? 'pap' : 'rx';
      if (resultsTab !== nextTab) setResultsTab(nextTab);
      if (hit.kind === 'regular') {
        if (searchQuery !== papQuery) setSearchQuery(papQuery);
        setPickingRx(false);
        setPickingPap(true);
      } else {
        setPickingPap(false);
        setPickingRx(true);
      }
      return;
    }
    const q = papQuery.trim();
    if (q.length < 3) return;
    if (
      searchInCatalog(regularMedications, q).length > 0 &&
      searchInCatalog(papMedications, q).length === 0
    ) {
      if (resultsTab !== 'rx') setResultsTab('rx');
      if (searchQuery !== q) setSearchQuery(q);
      setPickingRx(true);
    }
  }, [papQuery, searchQuery, medication?.id, resultsTab, setMedication, setResultsTab, setSearchQuery]);

  const pickRx = (next: Medication) => {
    openMedication(next);
    setPickingRx(false);
  };
  const pickPap = (next: Medication) => {
    openMedication(next);
    setPickingPap(false);
  };
  const showRxDetails = !!med && med.kind === 'regular' && !pickingRx;
  const showPapDetails = !!med && med.kind === 'pap' && !pickingPap;
  const nadacAsOfLabel = fill(c.pricesUpdatedAsOf, { date: formatIsoDate(nadacFeed.asOfDate, language) });
  const costPlusAsOfLabel = fill(c.costPlusAsOf, { date: formatIsoDate(COST_PLUS_AS_OF, language) });
  const size: HouseholdSize = household ?? 1;
  const incomeLabel = income
    ? incomeOptions(size, language)[income]
    : c.papIncomeSkipped;
  const insuredBit = insurance === 'yes' ? c.papYouInsured : c.papYouUninsured;

  return (
    <>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => {
            searchSource.current = 'rx';
            setResultsTab('rx');
            if (!medication || medication.kind !== 'regular') setPickingRx(true);
          }}
          style={[styles.tab, tab === 'rx' && styles.tabOn]}
        >
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
          onPress={() => {
            searchSource.current = 'pap';
            setResultsTab('pap');
            if (!medication || medication.kind !== 'pap') setPickingPap(true);
          }}
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
          <SearchBox
            value={searchQuery}
            onChangeText={(text) => {
              searchSource.current = 'rx';
              setSearchQuery(text);
              setPickingRx(true);
            }}
            placeholder={c.regularSearchPlaceholder}
            accessibilityLabel={c.searchA11y}
          />
          <BodyText>{c.regularPickHint}</BodyText>
          {pickingRx || !showRxDetails ? (
            <>
              {searchQuery.trim() && rxList.length === 0 ? (
                <WhiteCard>
                  <BodyText>{c.noMatches}</BodyText>
                </WhiteCard>
              ) : (
                rxList.map((item) => (
                  <MedicationRow key={item.id} med={item} onOpen={() => pickRx(item)} />
                ))
              )}
            </>
          ) : null}

          {showRxDetails && med ? (
        <>
          <ActionStack>
            <WhiteCard>
              <BodyText>{c.resultsFor}</BodyText>
              <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.pharmacyBadge}</Text>
              <DisplayTitle>{med.brand}</DisplayTitle>
              <BodyText>
                {med.generic} · {loc(med.form, language)}
              </BodyText>
              <View style={styles.saveRow}>
                <SaveToggle med={med} />
              </View>
            </WhiteCard>
            <WhitePill label={c.changeMedicine} onPress={() => setPickingRx(true)} />
          </ActionStack>
          <WhiteCard>
            <BodyText>{c.regularKindBanner}</BodyText>
          </WhiteCard>
          {insurance === 'yes' ? (
            <WhiteCard>
              <BodyText>{c.insuredBanner}</BodyText>
            </WhiteCard>
          ) : null}
          <WhiteCard>
            <BodyText>{c.priceDisclaimer}</BodyText>
            <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>{nadacAsOfLabel}</Text>
          </WhiteCard>

          <DisplayTitle>{c.lowestToday}</DisplayTitle>

          {med.benchmarks
            .filter((b) => b.source === 'costplus')
            .map((b) => (
              <ActionStack key="costplus-buy">
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
                    {b.asOf
                      ? fill(c.costPlusAsOf, { date: formatIsoDate(b.asOf, language) })
                      : costPlusAsOfLabel}
                  </Text>
                  <Text style={[styles.note, typeface(language, 'body')]}>
                    {loc(b.note, language)}
                  </Text>
                  {pricing?.costPlus && !pricing.costPlus.matchesQty ? (
                    <Text style={[styles.renewal, typeface(language, 'bodyBold')]}>
                      {fill(c.costPlusQtyNote, {
                        base: loc(pricing.costPlus.quotedFor, language),
                        qty: quantityLabel(pricing, language),
                      })}
                    </Text>
                  ) : null}
                </WhiteCard>
                {med.costPlusUrl ? (
                  <WhitePill label={c.buyCostPlus} onPress={() => openUrl(med.costPlusUrl!)} />
                ) : null}
              </ActionStack>
            ))}

          <CouponBlock med={med} />

          <ExplainOptionsCard med={med} pricing={pricing!} />

          <DisplayTitle>{c.nadacBenchmark}</DisplayTitle>
          {med.benchmarks
            .filter((b) => b.source === 'nadac')
            .map((b) => (
              <NadacCard key="nadac-ref" med={med} pricing={pricing!} note={loc(b.note, language)} />
            ))}

          <GenericOutlookCard medicationId={med.id} />

          {med.pharmacies.length > 0 ? (
            <>
              <DisplayTitle>{c.nearbyPharmacies}</DisplayTitle>
              <BodyText>{c.nearbyHint}</BodyText>
              <WhiteCard>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.modeledCashNote}</Text>
              </WhiteCard>
              {med.pharmacies.map((p) => (
                <ActionStack key={p.id}>
                  <WhiteCard>
                    <Text style={[styles.pharm, typeface(language, 'display')]}>{p.name}</Text>
                    <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{p.district}</Text>
                    <Text style={[styles.meta, typeface(language, 'body')]}>{p.address}</Text>
                    <Text style={[styles.meta, typeface(language, 'body')]}>
                      {pharmacyHours(language, p.hoursId)}
                    </Text>
                    {p.cashPrice != null ? (
                      <>
                        <Text style={[styles.section, typeface(language, 'bodyBold')]}>
                          {c.cashAtStore}
                        </Text>
                        <Text style={[styles.price, typeface(language, 'display')]}>
                          ${p.cashPrice.toFixed(2)}
                        </Text>
                      </>
                    ) : null}
                  </WhiteCard>
                  <WhitePill label={c.openLocator} onPress={() => openUrl(p.locatorUrl)} />
                </ActionStack>
              ))}
            </>
          ) : null}
        </>
          ) : null}
        </>
      ) : (
        <>
          <SearchBox
            value={papQuery}
            onChangeText={(text) => {
              searchSource.current = 'pap';
              setPapQuery(text);
              setPickingPap(true);
            }}
            placeholder={c.papSearchPlaceholder}
            accessibilityLabel={c.papSearchPlaceholder}
          />
          {showPapDetails ? null : (
            <>
              <BodyText>{c.papPickHint}</BodyText>
              <WhiteCard>
                <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.papWhatTitle}</Text>
                <BodyText>{c.papWhatBody}</BodyText>
                <Text style={[styles.note, typeface(language, 'body')]}>
                  {c.papManufacturerDirect}
                </Text>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.papEligibility}</Text>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.papApplication}</Text>
                <Text style={[styles.renewal, typeface(language, 'bodyBold')]}>
                  {c.papEligibilityNote}
                </Text>
              </WhiteCard>
            </>
          )}
          {pickingPap || !showPapDetails ? (
            <>
              {papQuery.trim() && papList.length === 0 ? (
                <WhiteCard>
                  <BodyText>{c.noMatches}</BodyText>
                </WhiteCard>
              ) : (
                papList.map((item) => (
                  <MedicationRow key={item.id} med={item} onOpen={() => pickPap(item)} />
                ))
              )}
            </>
          ) : null}
          {showPapDetails && med ? (
            <>
              <ActionStack>
                <WhiteCard>
                  <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.papBadge}</Text>
                  <DisplayTitle>{med.brand}</DisplayTitle>
                  <BodyText>
                    {med.generic} · {loc(med.form, language)}
                  </BodyText>
                </WhiteCard>
                <WhitePill label={c.changeMedicine} onPress={() => setPickingPap(true)} />
              </ActionStack>
              <WhiteCard>
                <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.papRequiredTitle}</Text>
                <BodyText>
                  {fill(c.papRequiredWhy, { drug: `${med.brand} (${med.generic})` })}
                </BodyText>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.papWhatBody}</Text>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.papManufacturerDirect}</Text>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.papEligibility}</Text>
                <Text style={[styles.note, typeface(language, 'body')]}>{c.papApplication}</Text>
                <Text style={[styles.renewal, typeface(language, 'bodyBold')]}>
                  {c.papEligibilityNote}
                </Text>
              </WhiteCard>
              <WhiteCard>
                <BodyText>{c.papRequiredCoupons}</BodyText>
              </WhiteCard>
              <CouponBlock med={med} />
              <ExplainOptionsCard med={med} pricing={pricing!} />
              {pricing?.nadac ? (
                <>
                  <DisplayTitle>{c.nadacBenchmark}</DisplayTitle>
                  <NadacCard med={med} pricing={pricing} note={null} />
                </>
              ) : null}
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
            </>
          ) : null}
        </>
      )}
    </>
  );
}

function NadacCard({
  med,
  pricing,
  note,
}: {
  med: Medication;
  pricing: QuantityPricing;
  /** Extra source note shown under the figure, if any. */
  note: string | null;
}) {
  const { language, nadacFeed } = useApp();
  const c = t(language);
  const benchmark = med.benchmarks.find((b) => b.source === 'nadac');
  const asOfLabel = fill(c.pricesUpdatedAsOf, {
    date: formatIsoDate(pricing.nadac?.asOfDate ?? nadacFeed.asOfDate, language),
  });
  return (
    <WhiteCard>
      <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.nadacNotBuyable}</Text>
      {pricing.nadac ? (
        <>
          <Text style={[styles.price, typeface(language, 'display')]}>
            {`$${pricing.nadac.total.toFixed(2)}`}
          </Text>
          <Text style={[styles.meta, typeface(language, 'body')]}>
            {quantityLabel(pricing, language)}
          </Text>
        </>
      ) : benchmark ? (
        <>
          <Text style={[styles.price, typeface(language, 'display')]}>
            {loc(benchmark.package, language)}
          </Text>
          <Text style={[styles.meta, typeface(language, 'body')]}>
            {loc(benchmark.package, language)}
          </Text>
        </>
      ) : null}
      <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>{asOfLabel}</Text>
      {pricing.nadac && pricing.qty != null ? (
        <Text style={[styles.note, typeface(language, 'body')]}>
          {fill(c.nadacQtyMath, {
            unit: String(pricing.nadac.perUnit),
            qty: String(pricing.qty),
            total: pricing.nadac.total.toFixed(2),
            date: formatIsoDate(pricing.nadac.asOfDate, language),
          })}
        </Text>
      ) : null}
      {note ? <Text style={[styles.note, typeface(language, 'body')]}>{note}</Text> : null}
    </WhiteCard>
  );
}

function ExplainOptionsCard({ med, pricing }: { med: Medication; pricing: QuantityPricing }) {
  const { language, insurance, income } = useApp();
  const c = t(language);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [med.id]);

  const conclusion = matcherConclusion({ programIds: med.programIds, insurance, income });
  const { sentences, applyTo } = explainOptions({ med, language, conclusion, pricing });

  return (
    <ActionStack>
      <WhiteCard>
        <Pressable
          onPress={() => setOpen((v) => !v)}
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          style={({ pressed }) => [styles.explainBtn, pressed && { opacity: 0.85 }]}
        >
          <Text style={[styles.explainBtnTxt, typeface(language, 'display')]}>
            {`${open ? '▾' : '▸'}  ${c.explainButton}`}
          </Text>
        </Pressable>
        {open
          ? sentences.map((s, i) => (
              <Text key={i} style={[styles.explainLine, typeface(language, 'body')]}>
                {`${i + 1}.  ${s}`}
              </Text>
            ))
          : null}
        {open && applyTo ? (
          <Text style={[styles.pharm, styles.explainProgram, typeface(language, 'display')]}>
            {applyTo.name}
          </Text>
        ) : null}
      </WhiteCard>
      {open && applyTo ? (
        <WhitePill display label={c.explainApply} onPress={() => openUrl(applyTo.url)} />
      ) : null}
    </ActionStack>
  );
}

function CouponBlock({ med }: { med: Medication }) {
  const { language } = useApp();
  const c = t(language);
  return (
    <ActionStack>
      <WhiteCard>
        <Text style={[styles.kind, typeface(language, 'bodyBold')]}>{c.goodRxCoupon}</Text>
        <Text style={[styles.pharm, typeface(language, 'display')]}>{med.generic}</Text>
        {med.goodrxPrice != null ? (
          <Text style={[styles.price, typeface(language, 'display')]}>
            {fill(c.goodRxListed, { price: med.goodrxPrice.toFixed(2) })}
          </Text>
        ) : null}
        {med.retailEstMin != null && med.retailEstMax != null ? (
          <Text style={[styles.meta, typeface(language, 'body')]}>
            {fill(c.retailEst, {
              min: med.retailEstMin.toFixed(2),
              max: med.retailEstMax.toFixed(2),
            })}
          </Text>
        ) : null}
        <Text style={[styles.note, typeface(language, 'body')]}>{c.goodRxHint}</Text>
        <Text style={[styles.note, typeface(language, 'body')]}>{c.goodRxPromoNote}</Text>
        {med.singlecareUrl ? (
          <Text style={[styles.note, typeface(language, 'body')]}>{c.singleCareHint}</Text>
        ) : null}
      </WhiteCard>
      <View style={styles.couponRow}>
        <WhitePill grow label={c.openGoodRx} onPress={() => openUrl(med.goodrxUrl)} />
        {med.singlecareUrl ? (
          <WhitePill grow label={c.compareSingleCare} onPress={() => openUrl(med.singlecareUrl!)} />
        ) : null}
      </View>
    </ActionStack>
  );
}

function GenericOutlookCard({ medicationId }: { medicationId: string }) {
  const { language } = useApp();
  const c = t(language);
  const hit = outlookForMedication(medicationId);
  if (!hit) return null;

  const headline =
    hit.tier === 'within12Months'
      ? c.outlookWithin12
      : hit.tier === 'comingYears'
        ? c.outlookComingYears
        : c.outlookAlreadyHas;

  return (
    <>
      {genericOutlookIsStale() ? (
        <WhiteCard>
          <Text style={[styles.renewal, typeface(language, 'body')]}>{c.outlookStaleBanner}</Text>
        </WhiteCard>
      ) : null}
      <WhiteCard>
        <Text style={[styles.note, typeface(language, 'body')]}>{headline}</Text>
        {hit.record.expiryDate && hit.record.expiryLabel ? (
          <Text style={[styles.note, typeface(language, 'body')]}>
            {fill(c.outlookSourceDate, {
              date: formatIsoDate(hit.record.expiryDate, language),
              label: hit.record.expiryLabel,
            })}
          </Text>
        ) : null}
        {hit.record.biosimilarExplainer ? (
          <Text style={[styles.note, typeface(language, 'body')]}>{c.outlookBiosimilarVsGeneric}</Text>
        ) : null}
        <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>
          {fill(c.outlookVerifiedAsOf, {
            date: formatIsoDate(hit.record.verifiedAsOf, language),
          })}
        </Text>
      </WhiteCard>
    </>
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
          <WhiteCard>
            <Text style={[styles.renewal, typeface(language, 'bodyBold')]}>{c.papDisclaimer}</Text>
          </WhiteCard>
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
  userLine,
}: {
  row: RankedProgram;
  language: import('../types').Language;
  userLine: string;
}) {
  const c = t(language);
  const p = row.program;
  return (
    <ActionStack>
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
        <Text style={[styles.retrieved, typeface(language, 'bodyBold')]}>
          {fill(c.papVerifiedAsOf, { date: formatIsoDate(p.verifiedAsOf, language) })}
        </Text>
      </WhiteCard>
      <WhitePill label={c.papLearnMore} onPress={() => openUrl(p.applicationUrl)} />
    </ActionStack>
  );
}

const styles = StyleSheet.create({
  saveRow: { alignItems: 'center', marginTop: 10 },
  explainBtn: {
    alignSelf: 'center',
    backgroundColor: periwinkle,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 48,
    justifyContent: 'center',
  },
  explainBtnTxt: { fontSize: 16, lineHeight: 22, color: '#FFFFFF', textAlign: 'center' },
  explainLine: {
    fontSize: 14,
    lineHeight: 21,
    color: ink,
    textAlign: 'left',
    marginTop: 10,
  },
  explainProgram: { marginTop: 12 },
  couponRow: { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
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
});
