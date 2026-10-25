import { StatusBar } from 'expo-status-bar';
import { AppChrome } from './components/AppChrome';
import { AppProvider, useApp } from './context';
import { PhoneShell } from './components/ui';
import { LanguageScreen } from './screens/LanguageScreen';
import { InsuranceScreen } from './screens/InsuranceScreen';
import { InsuredNoticeScreen } from './screens/InsuredNoticeScreen';
import { HouseholdScreen } from './screens/HouseholdScreen';
import { IncomeScreen } from './screens/IncomeScreen';
import { EligibilityScreen } from './screens/EligibilityScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { HelpScreen } from './screens/HelpScreen';
import { SavedScreen } from './screens/SavedScreen';
import { LocatorScreen } from './screens/LocatorScreen';

function Router() {
  const { screen } = useApp();
  switch (screen) {
    case 'language':
      return <LanguageScreen />;
    case 'insurance':
      return <InsuranceScreen />;
    case 'insuredNotice':
      return <InsuredNoticeScreen />;
    case 'household':
      return <HouseholdScreen />;
    case 'income':
      return <IncomeScreen />;
    case 'eligibility':
      return <EligibilityScreen />;
    case 'search':
      return <SearchScreen />;
    case 'results':
      return <ResultsScreen />;
    case 'help':
      return <HelpScreen />;
    case 'locator':
      return <LocatorScreen />;
    case 'saved':
      return <SavedScreen />;
    default:
      return <LanguageScreen />;
  }
}

export function AppShell() {
  return (
    <AppProvider>
      <PhoneShell>
        <AppChrome>
          <Router />
        </AppChrome>
        <StatusBar style="dark" />
      </PhoneShell>
    </AppProvider>
  );
}
