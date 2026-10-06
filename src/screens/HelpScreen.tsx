import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppChrome, BodyText, DisplayTitle, WhiteCard, WhitePill } from '../components/AppChrome';
import { Text } from '../components/AppText';
import { openUrl } from '../components/ui';
import { useApp } from '../context';
import { HELPLINES_VERIFIED_AS_OF, helplines, phoneDigitCount, telUrl } from '../data/helplines';
import { areaPharmacies } from '../data/pharmacies';
import { fill, formatIsoDate, pharmacyHours, t } from '../i18n';
import { ink, typeface } from '../theme';

export function HelpScreen() {
  const { language } = useApp();
  const c = t(language);
  const verified = formatIsoDate(HELPLINES_VERIFIED_AS_OF, language);

  return (
    <AppChrome>
      <WhiteCard>
        <DisplayTitle>{c.helpTitle}</DisplayTitle>
        <BodyText>{c.helpIntro}</BodyText>
        <Text style={[styles.honest, typeface(language, 'bodyBold')]}>{c.helpHonestNote}</Text>
      </WhiteCard>

      {helplines.map((line) => (
        <View key={line.id}>
          <WhiteCard>
            <Text style={[styles.title, typeface(language, 'display')]}>{c[line.titleKey]}</Text>
            <Text style={[styles.number, typeface(language, 'display')]}>{line.display}</Text>
            <Text style={[styles.meta, typeface(language, 'body')]}>{c[line.descKey]}</Text>
            {line.hoursKey ? (
              <Text style={[styles.hours, typeface(language, 'bodyBold')]}>{c[line.hoursKey]}</Text>
            ) : null}
            {line.source ? (
              <Text style={[styles.source, typeface(language, 'body')]}>
                {fill(c.helpSource, { source: line.source, date: verified })}
              </Text>
            ) : null}
          </WhiteCard>
          <WhitePill
            display
            label={fill(c.helpCall, { number: line.display })}
            onPress={() => openUrl(telUrl(line.tel))}
          />
        </View>
      ))}

      <PlanNumberCard />

      <DisplayTitle>{c.helpPharmTitle}</DisplayTitle>
      <BodyText>{c.helpPharmIntro}</BodyText>
      {areaPharmacies.map((p) => (
        <View key={p.district + p.address}>
          <WhiteCard>
            <Text style={[styles.title, typeface(language, 'display')]}>{p.name}</Text>
            <Text style={[styles.district, typeface(language, 'bodyBold')]}>{p.district}</Text>
            <Text style={[styles.meta, typeface(language, 'body')]}>{p.address}</Text>
            <Text style={[styles.meta, typeface(language, 'body')]}>
              {pharmacyHours(language, p.hoursId)}
            </Text>
          </WhiteCard>
          <WhitePill label={c.helpPharmOpen} onPress={() => openUrl(p.locatorUrl)} />
        </View>
      ))}
    </AppChrome>
  );
}

function PlanNumberCard() {
  const { language, planPhone, setPlanPhone, textScale } = useApp();
  const c = t(language);
  const [editing, setEditing] = useState(planPhone === '');
  const [draft, setDraft] = useState(planPhone);
  const [error, setError] = useState(false);

  useEffect(() => {
    setDraft(planPhone);
    setEditing(planPhone === '');
  }, [planPhone]);

  const save = () => {
    const value = draft.trim();
    if (phoneDigitCount(value) < 7) {
      setError(true);
      return;
    }
    setError(false);
    setPlanPhone(value);
    setEditing(false);
  };

  return (
    <View>
      <WhiteCard>
        <Text style={[styles.title, typeface(language, 'display')]}>{c.helpPlanTitle}</Text>
        <Text style={[styles.meta, typeface(language, 'body')]}>{c.helpPlanIntro}</Text>
        {editing ? (
          <>
            <TextInput
              value={draft}
              onChangeText={(v) => {
                setDraft(v);
                if (error) setError(false);
              }}
              onSubmitEditing={save}
              placeholder={c.helpPlanPlaceholder}
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoComplete="tel"
              returnKeyType="done"
              accessibilityLabel={c.helpPlanTitle}
              style={[
                styles.input,
                { fontSize: Math.round(18 * textScale) },
                typeface(language, 'body'),
              ]}
            />
            {error ? (
              <Text style={[styles.error, typeface(language, 'bodyBold')]}>{c.helpPlanInvalid}</Text>
            ) : null}
          </>
        ) : (
          <>
            <Text style={[styles.number, typeface(language, 'display')]}>{planPhone}</Text>
            <Text style={[styles.source, typeface(language, 'body')]}>
              {c.helpPlanSaved}
            </Text>
          </>
        )}
      </WhiteCard>
      {editing ? (
        <WhitePill display label={c.helpPlanSave} onPress={save} />
      ) : (
        <>
          <WhitePill display label={c.helpPlanCall} onPress={() => openUrl(telUrl(planPhone))} />
          <View style={styles.row}>
            <WhitePill grow label={c.helpPlanEdit} onPress={() => setEditing(true)} />
            <WhitePill grow label={c.helpPlanRemove} onPress={() => setPlanPhone('')} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  honest: {
    fontSize: 13,
    lineHeight: 18,
    color: '#2C4A9A',
    textAlign: 'center',
    marginTop: 10,
  },
  title: { fontSize: 18, lineHeight: 24, color: ink, textAlign: 'center' },
  number: { fontSize: 24, lineHeight: 30, color: ink, textAlign: 'center', marginTop: 4 },
  meta: { fontSize: 13, lineHeight: 18, color: '#444', textAlign: 'center', marginTop: 4 },
  hours: { fontSize: 13, lineHeight: 18, color: '#2C4A9A', textAlign: 'center', marginTop: 6 },
  source: { fontSize: 12, lineHeight: 16, color: '#5B7AD4', textAlign: 'center', marginTop: 8 },
  district: { fontSize: 12, color: '#5B7AD4', textAlign: 'center', marginTop: 2 },
  input: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: ink,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: ink,
    textAlign: 'center',
  },
  error: { fontSize: 13, lineHeight: 18, color: '#B42318', textAlign: 'center', marginTop: 8 },
  row: { flexDirection: 'row', gap: 10, marginTop: 10 },
});
