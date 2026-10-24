import { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Text } from './AppText';
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
  const {
    language,
    screen,
    searchQuery,
    setSearchQuery,
    go,
    back,
    reset,
    canGoBack,
    textSize,
    textScale,
    setTextSize,
    setLanguage,
  } = useApp();
  const c = t(language);
  const largeOn = textSize === 'large';

  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
    if (screen !== 'results' && screen !== 'search') go('results');
  };

  return (
    <View style={styles.root}>
      <GridBackground />
      <View style={styles.pad}>
        <View style={styles.header}>
          <View style={showSearch ? undefined : { flex: 1 }}>
            <Text
              style={[styles.appName, !showSearch && styles.appNameLarge]}
              numberOfLines={1}
            >
              {c.appName}
            </Text>
          </View>
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
                  if (screen !== 'results' && screen !== 'search') go('results');
                }}
                autoFocus={autoFocusSearch}
                placeholder=""
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                style={[
                  styles.searchInput,
                  { fontSize: Math.round(14 * textScale) },
                  typeface(language, 'body'),
                ]}
                accessibilityLabel={c.searchA11y}
              />
            </View>
          ) : null}
          <Pressable onPress={reset} accessibilityLabel={c.startOver}>
            <PlusMark />
          </Pressable>
        </View>
        {screen !== 'language' ? (
          <View style={styles.langRow}>
            {(
              [
                ['en', 'EN'],
                ['es', 'ES'],
                ['zh', '中文'],
                ['hi', 'हिन्दी'],
              ] as const
            ).map(([id, label]) => (
              <Pressable
                key={id}
                onPress={() => setLanguage(id)}
                accessibilityRole="button"
                accessibilityState={{ selected: language === id }}
                accessibilityLabel={label}
                style={({ pressed }) => [
                  styles.langChip,
                  language === id && styles.chipOn,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    typeface(id, 'bodyBold'),
                    language === id && styles.chipLabelOn,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        <View style={styles.tools}>
          <ChipButton
            label={c.getHelp}
            selected={screen === 'help'}
            onPress={() => {
              if (screen !== 'help') go('help');
            }}
          />
          <ChipButton
            label={c.myMedicines}
            selected={screen === 'saved'}
            onPress={() => {
              if (screen !== 'saved') go('saved');
            }}
          />
          <ChipButton
            label={`A+  ${c.largeText}`}
            selected={largeOn}
            onPress={() => setTextSize(largeOn ? 'normal' : 'large')}
            accessibilityLabel={c.largeTextA11y}
            accessibilityRole="switch"
          />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        {canGoBack ? (
          <Pressable
            onPress={back}
            hitSlop={12}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
            accessibilityLabel={c.back}
            accessibilityRole="button"
          >
            <View style={styles.chevron}>
              <View style={styles.chevronArmTop} />
              <View style={styles.chevronArmBottom} />
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export function WhiteCard({ children }: { children: ReactNode }) {
  return <View style={styles.whiteCard}>{children}</View>;
}

/** Keeps action pills visually separate from the card above them. */
export function ActionStack({ children }: { children: ReactNode }) {
  return <View style={styles.actionStack}>{children}</View>;
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

export function SearchBox({
  value,
  onChangeText,
  placeholder,
  autoFocus = false,
  accessibilityLabel,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  accessibilityLabel?: string;
}) {
  const { language, textScale } = useApp();
  const c = t(language);
  return (
    <View style={styles.searchBox}>
      <View style={styles.mag}>
        <View style={styles.magCircle} />
        <View style={styles.magHandle} />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7A8AA0"
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel={accessibilityLabel ?? c.searchA11y}
        style={[
          styles.searchBoxInput,
          { fontSize: Math.round(16 * textScale) },
          typeface(language, 'body'),
        ]}
      />
    </View>
  );
}

export function ChipButton({
  label,
  onPress,
  selected = false,
  accessibilityLabel,
  accessibilityRole = 'button',
}: {
  label: string;
  onPress: () => void;
  selected?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'switch';
}) {
  const { language } = useApp();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={accessibilityRole === 'switch' ? { checked: selected } : { selected }}
      style={({ pressed }) => [styles.chip, selected && styles.chipOn, pressed && styles.pressed]}
    >
      <Text style={[styles.chipLabel, typeface(language, 'bodyBold'), selected && styles.chipLabelOn]}>
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
    alignSelf: 'flex-start',
    width: 56,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  chevron: {
    width: 22,
    height: 22,
  },
  chevronArmTop: {
    position: 'absolute',
    width: 16,
    height: 3.5,
    backgroundColor: ink,
    borderRadius: 2,
    top: 4,
    left: 2,
    transform: [{ rotate: '-42deg' }],
  },
  chevronArmBottom: {
    position: 'absolute',
    width: 16,
    height: 3.5,
    backgroundColor: ink,
    borderRadius: 2,
    bottom: 4,
    left: 2,
    transform: [{ rotate: '42deg' }],
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: ink,
  },
  plus: { fontSize: 28, fontWeight: '800', color: ink, marginTop: -2, lineHeight: 30 },
  body: { paddingTop: 14, paddingBottom: 8, gap: 12, alignItems: 'stretch' },
  whiteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignSelf: 'stretch',
    ...shadow,
  },
  actionStack: {
    alignSelf: 'stretch',
    gap: 16,
    marginTop: 4,
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
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  langChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 40,
    justifyContent: 'center',
    ...shadow,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: ink,
    borderRadius: 999,
    minHeight: 48,
    paddingHorizontal: 14,
    gap: 8,
    alignSelf: 'stretch',
    ...shadow,
  },
  searchBoxInput: {
    flex: 1,
    color: ink,
    paddingVertical: 8,
  },
  tools: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 44,
    justifyContent: 'center',
    ...shadow,
  },
  chipOn: { backgroundColor: periwinkle },
  chipLabel: { fontSize: 13, lineHeight: 17, color: ink, textAlign: 'center' },
  chipLabelOn: { color: '#FFFFFF' },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
});
