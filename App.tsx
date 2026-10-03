import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { AppProvider, useApp } from './src/context';
import { PhoneShell } from './src/components/ui';
import { LanguageScreen } from './src/screens/LanguageScreen';
import { InsuranceScreen } from './src/screens/InsuranceScreen';
import { InsuredNoticeScreen } from './src/screens/InsuredNoticeScreen';
import { HouseholdScreen } from './src/screens/HouseholdScreen';
import { IncomeScreen } from './src/screens/IncomeScreen';
import { EligibilityScreen } from './src/screens/EligibilityScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';

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
    default:
      return <LanguageScreen />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <PhoneShell>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Router />
        </KeyboardAvoidingView>
        <StatusBar style="dark" />
      </PhoneShell>
    </AppProvider>
  );
}
