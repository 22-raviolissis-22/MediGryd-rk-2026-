import { StyleSheet, Text, View } from 'react-native';
import { ChoiceButton, PrimaryButton, Screen, Title, openUrl } from '../components/ui';
import { useApp } from '../context';
import { LINKS } from '../data/income';
import { t } from '../i18n';
import { colors, radius } from '../theme';

export function EligibilityScreen() {
  const { language, income, go } = useApp();
  const c = t(language);
  const bracket = income ?? 'A';

  const title =
    bracket === 'A' ? c.mediCalTitle : bracket === 'B' ? c.coverCaliTitle : c.overTitle;
  const body =
    bracket === 'A' ? c.mediCalBody : bracket === 'B' ? c.coverCaliBody : c.overBody;

  return (
    <Screen
      footer={
        <PrimaryButton label={c.continueCompare} onPress={() => go('search')} />
      }
    >
      <View style={[styles.tag, bracket === 'C' && styles.tagGold]}>
        <Text style={styles.tagTxt}>
          {bracket === 'A' ? 'Medi-Cal' : bracket === 'B' ? 'Covered California' : 'Marketplace'}
        </Text>
      </View>
      <Title>{title}</Title>
      <Text style={styles.body}>{body}</Text>
      {bracket === 'A' ? (
        <>
          <ChoiceButton label={c.enrollCovered} onPress={() => openUrl(LINKS.coveredCA)} />
          <ChoiceButton
            label={c.enrollBenefits}
            variant="light"
            onPress={() => openUrl(LINKS.benefitsCal)}
          />
        </>
      ) : (
        <ChoiceButton
          label={bracket === 'B' ? c.enrollCovered : c.enrollMarket}
          onPress={() => openUrl(LINKS.marketplace)}
        />
      )}
      <Text style={styles.disc}>{c.disclaimer}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.moss,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginTop: 6,
  },
  tagGold: { backgroundColor: '#F3E2C5' },
  tagTxt: { color: colors.forestDark, fontWeight: '800', fontSize: 12 },
  body: { color: colors.ink, fontSize: 15, lineHeight: 22 },
  disc: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8 },
});
