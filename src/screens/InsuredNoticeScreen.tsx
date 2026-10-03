import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton, Screen, Title } from '../components/ui';
import { useApp } from '../context';
import { t } from '../i18n';
import { colors, radius } from '../theme';

export function InsuredNoticeScreen() {
  const { language, go } = useApp();
  const c = t(language);
  const steps = [c.insuredStep1, c.insuredStep2, c.insuredStep3];

  return (
    <Screen
      footer={
        <PrimaryButton label={c.continueCompare} onPress={() => go('search')} />
      }
    >
      <Title>{c.insuredTitle}</Title>
      <Text style={styles.lead}>{c.insuredLead}</Text>
      {steps.map((step, i) => (
        <View key={step} style={styles.row}>
          <View style={styles.num}>
            <Text style={styles.numTxt}>{i + 1}</Text>
          </View>
          <Text style={styles.step}>{step}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginTop: 10 },
  num: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numTxt: { color: colors.white, fontWeight: '800' },
  step: { flex: 1, color: colors.ink, fontSize: 15, lineHeight: 21 },
});
