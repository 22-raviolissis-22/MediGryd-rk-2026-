import { ChoiceButton, Screen, Title } from '../components/ui';
import { useApp } from '../context';
import { t } from '../i18n';

export function InsuranceScreen() {
  const { language, go, setInsurance } = useApp();
  const c = t(language);

  return (
    <Screen>
      <Title>{c.insuranceQ}</Title>
      <ChoiceButton
        label={c.yes}
        onPress={() => {
          setInsurance('yes');
          go('insuredNotice');
        }}
      />
      <ChoiceButton
        label={c.no}
        variant="light"
        onPress={() => {
          setInsurance('no');
          go('household');
        }}
      />
    </Screen>
  );
}
