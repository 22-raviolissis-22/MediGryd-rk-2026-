import { StyleSheet, View } from 'react-native';
import { Question, WhiteCard, WhitePill } from '../components/AppChrome';
import { useApp } from '../context';
import { t } from '../i18n';
import type { HouseholdSize } from '../types';

export function HouseholdScreen() {
  const { language, go, setHousehold } = useApp();
  const c = t(language);

  const pick = (size: HouseholdSize) => {
    setHousehold(size);
    go('income');
  };

  return (
    <>
      <WhiteCard>
        <Question>{c.householdQ}</Question>
      </WhiteCard>
      <View style={styles.row}>
        <WhitePill grow label={c.person1} onPress={() => pick(1)} />
        <WhitePill grow label={c.person2} onPress={() => pick(2)} />
      </View>
      <View style={styles.row}>
        <WhitePill grow label={c.person3} onPress={() => pick(3)} />
        <WhitePill grow label={c.person4} onPress={() => pick(4)} />
      </View>
      <WhitePill center label={c.person5} onPress={() => pick(5)} />
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
});
