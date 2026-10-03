import { ChoiceButton, Lead, Screen, Title } from '../components/ui';
import { useApp } from '../context';
import { incomeOptions } from '../data/income';
import { t } from '../i18n';
import type { IncomeBracket } from '../types';

export function IncomeScreen() {
  const { language, household, go, setIncome } = useApp();
  const c = t(language);
  const size = household ?? 1;
  const ranges = incomeOptions[size];

  const pick = (bracket: IncomeBracket) => {
    setIncome(bracket);
    go('eligibility');
  };

  return (
    <Screen>
      <Title>{c.incomeQ}</Title>
      <Lead>{c.incomeHint}</Lead>
      <ChoiceButton
        label={`${c.optionA}`}
        sub={ranges.A}
        onPress={() => pick('A')}
      />
      <ChoiceButton
        label={c.optionB}
        sub={ranges.B}
        variant="light"
        onPress={() => pick('B')}
      />
      <ChoiceButton
        label={c.optionC}
        sub={ranges.C}
        variant="gold"
        onPress={() => pick('C')}
      />
    </Screen>
  );
}
