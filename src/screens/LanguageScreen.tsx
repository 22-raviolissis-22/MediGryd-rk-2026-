import { Text, View, StyleSheet } from 'react-native';
import { ChoiceButton, Lead, Screen, Title } from '../components/ui';
import { useApp } from '../context';
import { t } from '../i18n';
import { colors } from '../theme';

export function LanguageScreen() {
  const { setLanguage, go } = useApp();
  const c = t('en');

  return (
    <Screen showBack={false}>
      <View style={styles.badge}>
        <Text style={styles.badgeTxt}>CalRx Assist</Text>
      </View>
      <Title>{c.getStarted}</Title>
      <Text style={styles.es}>{c.getStartedEs}</Text>
      <Lead>{c.chooseLanguage}</Lead>
      <View style={{ height: 12 }} />
      <ChoiceButton
        label="ENGLISH"
        onPress={() => {
          setLanguage('en');
          go('insurance');
        }}
      />
      <ChoiceButton
        label="ESPAÑOL"
        variant="light"
        onPress={() => {
          setLanguage('es');
          go('insurance');
        }}
      />
      <Text style={styles.foot}>
        Compare local pharmacy prices and find PAPs and nonprofits that offer medicine for free.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.moss,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
  },
  badgeTxt: { color: colors.forest, fontWeight: '800', fontSize: 12, letterSpacing: 0.8 },
  es: {
    color: colors.leaf,
    fontSize: 26,
    fontWeight: '800',
    marginTop: -4,
  },
  foot: { color: colors.muted, marginTop: 18, lineHeight: 20, fontSize: 13 },
});
