import { StyleSheet, Text } from 'react-native';
import {
  AppChrome,
  DisplayTitle,
  WhiteCard,
  WhitePill,
} from '../components/AppChrome';
import { useApp } from '../context';
import { t } from '../i18n';
import { fonts, ink } from '../theme';

export function InsuredNoticeScreen() {
  const { language, go } = useApp();
  const c = t(language);

  return (
    <AppChrome>
      <WhiteCard>
        <DisplayTitle>{c.insuredTitle}</DisplayTitle>
      </WhiteCard>
      <WhiteCard>
        <Text style={styles.leftBody}>{c.insuredLead}</Text>
        <Text style={styles.before}>{c.insuredBefore}</Text>
        <Text style={styles.bullet}>{`•  ${c.insuredStep1}`}</Text>
        <Text style={styles.bullet}>{`•  ${c.insuredStep2}`}</Text>
        <Text style={styles.bullet}>{`•  ${c.insuredStep3}`}</Text>
      </WhiteCard>
      <WhitePill display label={c.continueCompare} onPress={() => go('search')} />
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  leftBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: ink,
    textAlign: 'left',
    marginBottom: 8,
  },
  before: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: ink,
    marginTop: 14,
    marginBottom: 8,
    textAlign: 'left',
  },
  bullet: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: ink,
    textAlign: 'left',
    marginBottom: 4,
  },
});
