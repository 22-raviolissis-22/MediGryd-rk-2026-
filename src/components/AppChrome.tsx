import { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { GridBackground } from './GridBackground';
import { useApp } from '../context';
import { t } from '../i18n';
import { fonts, ink, periwinkle, typeface } from '../theme';

const shadow = Platform.select({
  web: { boxShadow: '0 5px 12px rgba(90, 160, 200, 0.2)' },
  ios: {
    shadowColor: '#4A9BB8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  default: { elevation: 3 },
});

export { shadow };

export function PlusMark() {
  return (
    <View style={styles.plusBtn}>
      <View style={styles.plusTop} />
      <View style={styles.plusBottom} />
      <Text style={styles.plus}>+</Text>
    </View>
  );
}

export function AppChrome({
  children,
  showSearch = true,
  autoFocusSearch = false,
}: {
  children: ReactNode;
  showSearch?: boolean;
  autoFocusSearch?: boolean;
}) {
  const { language, screen, searchQuery, setSearchQuery, go, back, reset } = useApp();
  const c = t(language);
  const showBack = screen !== 'language';

  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
    if (screen !== 'search') go('search');
  };

  return (
    <View style={styles.root}>
      <GridBackground />
      <View style={styles.pad}>
        <View style={styles.header}>
          {showBack ? (
            <Pressable
              onPress={back}
              hitSlop={6}
              style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
              accessibilityLabel={c.back}
              accessibilityRole="button"
            >
              <Text style={[styles.backLabel, typeface(language, 'display')]} numberOfLines={1}>
                {c.back}
              </Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={() => (screen === 'language' ? null : back())}
            hitSlop={6}
            style={showSearch ? undefined : { flex: 1 }}
          >
            <Text
              style={[styles.appName, !showSearch && styles.appNameLarge]}
              numberOfLines={1}
            >
              APP NAME
            </Text>
          </Pressable>
          {showSearch ? (
            <View style={styles.search}>
              <View style={styles.mag}>
                <View style={styles.magCircle} />
                <View style={styles.magHandle} />
              </View>
              <View style={styles.searchRule} />
              <TextInput
                value={searchQuery}
                onChangeText={onChangeSearch}
                onFocus={() => {
                  if (screen !== 'search') go('search');
                }}
                autoFocus={autoFocusSearch}
                placeholder=""
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                style={[styles.searchInput, typeface(language, 'body')]}
                accessibilityLabel={c.searchA11y}
              />
            </View>
          ) : null}
          <Pressable onPress={reset} accessibilityLabel={c.startOver}>
            <PlusMark />
          </Pressable>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

export function WhiteCard({ children }: { children: ReactNode }) {
  return <View style={styles.whiteCard}>{children}</View>;
}

export function Question({ children }: { children: ReactNode }) {
  const { language } = useApp();
  return <Text style={[styles.question, typeface(language, 'body')]}>{children}</Text>;
}

export function DisplayTitle({ children }: { children: ReactNode }) {
  const { language } = useApp();
  return <Text style={[styles.displayTitle, typeface(language, 'display')]}>{children}</Text>;
}

export function BodyText({ children }: { children: ReactNode }) {
  const { language } = useApp();
  return <Text style={[styles.bodyText, typeface(language, 'body')]}>{children}</Text>;
}

export function WhitePill({
  label,
  onPress,
  grow = false,
  center = false,
  display = false,
}: {
  label: string;
  onPress: () => void;
  grow?: boolean;
  center?: boolean;
  display?: boolean;
}) {
  const { language } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        grow && styles.pillGrow,
        center && styles.pillCenter,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.pillLabel,
          typeface(language, display ? 'display' : 'body'),
          display && styles.pillDisplay,
          grow && styles.pillLabelTight,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function BlueBox({ label, onPress }: { label: string; onPress: () => void }) {
  const { language } = useApp();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.blueBox, pressed && styles.pressed]}
    >
      <Text style={[styles.blueBoxLabel, typeface(language, 'display')]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#A9E4F8' },
  pad: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 18 : 52,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    gap: 8,
    minHeight: 58,
    ...shadow,
  },
  backBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: ink,
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLabel: {
    fontSize: 13,
    color: ink,
    letterSpacing: 0.2,
  },
  appName: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: ink,
    paddingRight: 4,
  },
  appNameLarge: { fontSize: 26 },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: ink,
    borderRadius: 999,
    height: 36,
    paddingHorizontal: 10,
    gap: 8,
  },
  mag: { width: 16, height: 16, justifyContent: 'center' },
  magCircle: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: ink,
  },
  magHandle: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: ink,
    right: -1,
    bottom: 1,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },
  searchRule: { width: 2, height: 18, backgroundColor: ink, borderRadius: 1 },
  searchInput: { flex: 1, fontSize: 14, color: ink, paddingVertical: 0 },
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#C9EEF8',
  },
  plusBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#9BB6F5',
  },
  plus: { fontSize: 26, fontWeight: '800', color: ink, marginTop: -2, lineHeight: 30 },
  body: { paddingTop: 14, paddingBottom: 24, gap: 12 },
  whiteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 14,
    ...shadow,
  },
  question: {
    fontSize: 20,
    lineHeight: 28,
    color: ink,
    textAlign: 'center',
  },
  displayTitle: {
    fontSize: 22,
    lineHeight: 28,
    color: ink,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: ink,
    textAlign: 'center',
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 52,
    justifyContent: 'center',
    ...shadow,
  },
  pillGrow: { flex: 1 },
  pillCenter: { alignSelf: 'center', paddingHorizontal: 28 },
  pillLabel: {
    fontSize: 16,
    lineHeight: 20,
    color: ink,
    textAlign: 'center',
  },
  pillLabelTight: { fontSize: 13, lineHeight: 17 },
  pillDisplay: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  blueBox: {
    flex: 1,
    backgroundColor: periwinkle,
    borderRadius: 24,
    minHeight: 168,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  blueBoxLabel: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
});
