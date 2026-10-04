import { StyleSheet, Text } from 'react-native';
import {
  AppChrome,
  DisplayTitle,
  WhiteCard,
  WhitePill,
} from '../components/AppChrome';
import { useApp } from '../context';
import { t } from '../i18n';
import { ink, typeface } from '../theme';

export function InsuredNoticeScreen() {
  const { language, go } = useApp();
  const c = t(language);

  return (
    <AppChrome>
      <WhiteCard>
        <DisplayTitle>{c.insuredTitle}</DisplayTitle>
      </WhiteCard>
      <WhiteCard>
        <Text style={[styles.leftBody, typeface(language, 'body')]}>{c.insuredLead}</Text>
        <Text style={[styles.before, typeface(language, 'bodyBold')]}>{c.insuredBefore}</Text>
        <Text style={[styles.bullet, typeface(language, 'body')]}>{`•  ${c.insuredStep1}`}</Text>
        <Text style={[styles.bullet, typeface(language, 'body')]}>{`•  ${c.insuredStep2}`}</Text>
        <Text style={[styles.bullet, typeface(language, 'body')]}>{`•  ${c.insuredStep3}`}</Text>
      </WhiteCard>
      <WhitePill display label={c.continueCompare} onPress={() => go('search')} />
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  leftBody: {
    fontSize: 14,
    lineHeight: 20,
    color: ink,
    textAlign: 'left',
    marginBottom: 8,
  },
  before: {
    fontSize: 14,
    color: ink,
    marginTop: 14,
    marginBottom: 8,
    textAlign: 'left',
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    color: ink,
    textAlign: 'left',
    marginBottom: 4,
  },
});
