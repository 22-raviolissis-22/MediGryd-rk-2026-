import type { ReactNode } from 'react';
import { useFonts, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { AppProvider } from './src/context';
import { AppShell } from './src/AppShell';

/**
 * Keep AppProvider outside the font-load re-render so each webfont finishing
 * does not remount session state (that looks like the whole app reloading).
 */
export default function App() {
  return (
    <AppProvider>
      <FontHost>
        <AppShell />
      </FontHost>
    </AppProvider>
  );
}

function FontHost({ children }: { children: ReactNode }) {
  useFonts({
    Fredoka_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  return <>{children}</>;
}
