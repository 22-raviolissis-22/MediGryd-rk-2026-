import { ReactNode } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius } from '../theme';
import { useApp } from '../context';
import { t } from '../i18n';

export function PhoneShell({ children }: { children: ReactNode }) {
  if (Platform.OS !== 'web') {
    return <View style={styles.fill}>{children}</View>;
  }
  return (
    <View style={styles.webPage}>
      <View style={styles.phone}>{children}</View>
    </View>
  );
}

export function Screen({
  children,
  showBack = true,
  footer,
}: {
  children: ReactNode;
  showBack?: boolean;
  footer?: ReactNode;
}) {
  const { back, language, setLanguage, screen } = useApp();
  const c = t(language);
  const showLang = screen !== 'language';

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        {showBack ? (
          <Pressable onPress={back} hitSlop={10} style={styles.backHit}>
            <Text style={styles.backText}>‹ {c.back}</Text>
          </Pressable>
        ) : (
          <Text style={styles.brand}>{c.appName}</Text>
        )}
        {showLang ? (
          <View style={styles.langSwitch}>
            <Pressable onPress={() => setLanguage('en')} style={styles.langHit}>
              <Text style={[styles.langTxt, language === 'en' && styles.langOn]}>EN</Text>
            </Pressable>
            <Text style={styles.langSep}>|</Text>
            <Pressable onPress={() => setLanguage('es')} style={styles.langHit}>
              <Text style={[styles.langTxt, language === 'es' && styles.langOn]}>ES</Text>
            </Pressable>
          </View>
        ) : (
          <View />
        )}
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <Text style={styles.lead}>{children}</Text>;
}

export function ChoiceButton({
  label,
  sub,
  onPress,
  variant = 'dark',
}: {
  label: string;
  sub?: string;
  onPress: () => void;
  variant?: 'dark' | 'light' | 'gold';
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.choice,
        variant === 'dark' && styles.choiceDark,
        variant === 'light' && styles.choiceLight,
        variant === 'gold' && styles.choiceGold,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.choiceLabel,
          variant === 'light' ? styles.choiceLabelDark : styles.choiceLabelLight,
        ]}
      >
        {label}
      </Text>
      {sub ? (
        <Text
          style={[
            styles.choiceSub,
            variant === 'light' ? styles.choiceSubDark : styles.choiceSubLight,
          ]}
        >
          {sub}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
    >
      <Text style={styles.primaryTxt}>{label}</Text>
    </Pressable>
  );
}

export async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported || Platform.OS === 'web') {
    await Linking.openURL(url);
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.cream },
  webPage: {
    flex: 1,
    backgroundColor: '#2A3230',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  phone: {
    width: 390,
    maxWidth: '100%',
    height: 844,
    maxHeight: '100%',
    backgroundColor: colors.cream,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: '#111',
  },
  screen: { flex: 1, backgroundColor: colors.cream },
  topBar: {
    paddingTop: Platform.OS === 'web' ? 18 : 52,
    paddingHorizontal: 18,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: colors.forest,
    fontWeight: '800',
    letterSpacing: 0.6,
    fontSize: 14,
  },
  backHit: { paddingVertical: 6, paddingRight: 12 },
  backText: { color: colors.forest, fontSize: 16, fontWeight: '600' },
  langSwitch: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  langHit: { padding: 4 },
  langTxt: { color: colors.muted, fontWeight: '700', fontSize: 13 },
  langOn: { color: colors.forest },
  langSep: { color: colors.line },
  scroll: { paddingHorizontal: 22, paddingBottom: 28, gap: 12 },
  footer: { padding: 16, paddingBottom: Platform.OS === 'web' ? 18 : 28 },
  title: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginTop: 8,
  },
  lead: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  choice: {
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 6,
  },
  choiceDark: { backgroundColor: colors.forest },
  choiceLight: {
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.forest,
  },
  choiceGold: { backgroundColor: colors.coral },
  choiceLabel: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  choiceLabelLight: { color: colors.white },
  choiceLabelDark: { color: colors.forest },
  choiceSub: { marginTop: 4, textAlign: 'center', fontSize: 14, fontWeight: '600' },
  choiceSubLight: { color: '#E7F3EE' },
  choiceSubDark: { color: colors.muted },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  primary: {
    backgroundColor: colors.forest,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryTxt: { color: colors.white, fontWeight: '800', fontSize: 15, textAlign: 'center' },
});
