import { StyleSheet, View } from 'react-native';
import { AppChrome, BlueBox, Question, WhiteCard } from '../components/AppChrome';
import { useApp } from '../context';
import { t } from '../i18n';

export function InsuranceScreen() {
  const { language, go, setInsurance } = useApp();
  const c = t(language);

  return (
    <AppChrome>
      <WhiteCard>
        <Question>{c.insuranceQ}</Question>
      </WhiteCard>
      <View style={styles.row}>
        <BlueBox
          label={c.yes}
          onPress={() => {
            setInsurance('yes');
            go('insuredNotice');
          }}
        />
        <BlueBox
          label={c.no}
          onPress={() => {
            setInsurance('no');
            go('household');
          }}
        />
      </View>
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, alignSelf: 'stretch' },
});
