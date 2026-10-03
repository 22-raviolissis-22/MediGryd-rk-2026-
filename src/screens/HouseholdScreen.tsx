import { ChoiceButton, Lead, Screen, Title } from '../components/ui';
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
    <Screen>
      <Title>{c.householdQ}</Title>
      <Lead>
        {language === 'en'
          ? 'Include everyone you claim on taxes or who shares income in your home.'
          : 'Incluye a todas las personas que declaras en impuestos o que comparten ingresos en tu hogar.'}
      </Lead>
      <ChoiceButton label={c.person1} onPress={() => pick(1)} />
      <ChoiceButton label={c.person2} variant="light" onPress={() => pick(2)} />
      <ChoiceButton label={c.person3} onPress={() => pick(3)} />
      <ChoiceButton label={c.person4} variant="light" onPress={() => pick(4)} />
      <ChoiceButton label={c.person5} onPress={() => pick(5)} />
    </Screen>
  );
}
