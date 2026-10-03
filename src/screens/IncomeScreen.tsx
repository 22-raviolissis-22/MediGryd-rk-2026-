import { StyleSheet, View } from 'react-native';
import { AppChrome, Question, WhiteCard, WhitePill } from '../components/AppChrome';
import { useApp } from '../context';
import { incomeOptions } from '../data/income';
import { t } from '../i18n';
import type { IncomeBracket } from '../types';

export function IncomeScreen() {
  const { language, household, go, setIncome } = useApp();
  const c = t(language);
  const ranges = incomeOptions[household ?? 1];

  const pick = (bracket: IncomeBracket) => {
    setIncome(bracket);
    go('eligibility');
  };

  return (
    <AppChrome>
      <WhiteCard>
        <Question>{c.incomeQ}</Question>
      </WhiteCard>
      <View style={styles.row}>
        <WhitePill grow label={ranges.A} onPress={() => pick('A')} />
        <WhitePill grow label={ranges.B} onPress={() => pick('B')} />
      </View>
      <WhitePill center label={ranges.C} onPress={() => pick('C')} />
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
});
