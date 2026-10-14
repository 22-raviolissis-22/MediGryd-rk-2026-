import { StatusBar } from 'expo-status-bar';
import { useFonts, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
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
import { HelpScreen } from './src/screens/HelpScreen';
import { SavedScreen } from './src/screens/SavedScreen';

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
    case 'saved':
      return <SavedScreen />;
    default:
      return <LanguageScreen />;
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredoka_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  return (
    <AppProvider>
      <PhoneShell>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {fontsLoaded ? (
            <Router />
          ) : (
            <View style={{ flex: 1, backgroundColor: '#A9E4F8' }} />
          )}
        </KeyboardAvoidingView>
        <StatusBar style="dark" />
      </PhoneShell>
    </AppProvider>
  );
}
