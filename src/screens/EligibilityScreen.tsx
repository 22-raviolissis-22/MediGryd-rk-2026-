import {
  AppChrome,
  BodyText,
  DisplayTitle,
  WhiteCard,
  WhitePill,
} from '../components/AppChrome';
import { openUrl } from '../components/ui';
import { useApp } from '../context';
import { LINKS } from '../data/income';
import { t } from '../i18n';

export function EligibilityScreen() {
  const { language, income, go } = useApp();
  const c = t(language);
  const bracket = income ?? 'A';

  const title =
    bracket === 'A' ? c.mediCalTitle : bracket === 'B' ? c.coverCaliTitle : c.overTitle;
  const body =
    bracket === 'A' ? c.mediCalBody : bracket === 'B' ? c.coverCaliBody : c.overBody;

  return (
    <AppChrome>
      <WhiteCard>
        <DisplayTitle>{title}</DisplayTitle>
      </WhiteCard>
      <WhiteCard>
        <BodyText>{body}</BodyText>
      </WhiteCard>
      {bracket === 'A' ? (
        <>
          <WhitePill label={c.enrollCovered} onPress={() => openUrl(LINKS.coveredCA)} />
          <WhitePill label={c.enrollBenefits} onPress={() => openUrl(LINKS.benefitsCal)} />
        </>
      ) : (
        <WhitePill
          label={bracket === 'B' ? c.enrollCoveredShort : c.enrollMarket}
          onPress={() => openUrl(LINKS.marketplace)}
        />
      )}
      <WhitePill display label={c.continueCompare} onPress={() => go('results')} />
    </AppChrome>
  );
}
