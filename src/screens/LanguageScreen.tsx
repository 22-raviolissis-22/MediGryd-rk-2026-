import { Pressable, StyleSheet, View } from 'react-native';
import { AppChrome, shadow } from '../components/AppChrome';
import { Text } from '../components/AppText';
import { useApp } from '../context';
import { copy } from '../i18n';
import { ink, periwinkle, typeface } from '../theme';
import type { Language } from '../types';

const OPTIONS: { lang: Language; label: string; caption: string; tone: 'white' | 'blue' }[] = [
  { lang: 'en', label: 'GET STARTED?', caption: 'English', tone: 'white' },
  { lang: 'es', label: '¿EMPEZAMOS?', caption: 'Español', tone: 'blue' },
  { lang: 'zh', label: '开始使用？', caption: '简体中文', tone: 'white' },
  { lang: 'hi', label: 'शुरू करें?', caption: 'हिन्दी', tone: 'blue' },
];

const LANGS: Language[] = ['en', 'es', 'zh', 'hi'];

export function LanguageScreen() {
  const { setLanguage, go, textSize, setTextSize } = useApp();
  const largeOn = textSize === 'large';

  return (
    <AppChrome showSearch={false}>
      <View style={styles.headerSpacer} />
      {OPTIONS.map((opt) => {
        const onBlue = opt.tone === 'blue';
        return (
          <Pressable
            key={opt.lang}
            onPress={() => {
              setLanguage(opt.lang);
              go('insurance');
            }}
            style={({ pressed }) => [
              styles.pill,
              onBlue ? styles.blue : styles.white,
              pressed && styles.pressed,
            ]}
            accessibilityLabel={opt.caption}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.label,
                typeface(opt.lang, 'display'),
                onBlue ? styles.light : styles.dark,
              ]}
            >
              {opt.label}
            </Text>
            <Text
              style={[
                styles.caption,
                typeface(opt.lang, 'bodySemi'),
                onBlue ? styles.lightCaption : styles.darkCaption,
              ]}
            >
              {opt.caption}
            </Text>
          </Pressable>
        );
      })}

      <Pressable
        onPress={() => setTextSize(largeOn ? 'normal' : 'large')}
        accessibilityRole="switch"
        accessibilityState={{ checked: largeOn }}
        accessibilityLabel={LANGS.map((l) => copy[l].largeText).join(', ')}
        style={({ pressed }) => [styles.toggle, largeOn && styles.toggleOn, pressed && styles.pressed]}
      >
        <Text style={[styles.toggleMark, largeOn ? styles.light : styles.dark]}>A+</Text>
        <View style={styles.toggleLabels}>
          {LANGS.map((l) => (
            <Text
              key={l}
              style={[styles.toggleLabel, typeface(l, 'bodyBold'), largeOn ? styles.light : styles.dark]}
            >
              {copy[l].largeText}
            </Text>
          ))}
        </View>
        <View style={[styles.track, largeOn && styles.trackOn]}>
          <View style={[styles.knob, largeOn && styles.knobOn]} />
        </View>
      </Pressable>
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  headerSpacer: { height: 2 },
  pill: {
    alignSelf: 'center',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 22,
    ...shadow,
  },
  white: { backgroundColor: '#FFFFFF' },
  blue: { backgroundColor: periwinkle },
  label: { fontSize: 24, lineHeight: 30 },
  caption: { fontSize: 13, marginTop: 2 },
  dark: { color: ink },
  light: { color: '#FFFFFF' },
  darkCaption: { color: '#5B7AD4' },
  lightCaption: { color: '#EEF3FF' },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...shadow,
  },
  toggleOn: { backgroundColor: periwinkle },
  toggleMark: { fontSize: 24, fontWeight: '800' },
  toggleLabels: { flex: 1 },
  toggleLabel: { fontSize: 14, lineHeight: 19 },
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#C9D6F8',
    padding: 3,
  },
  trackOn: { backgroundColor: '#FFFFFF' },
  knob: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF' },
  knobOn: { backgroundColor: periwinkle, marginLeft: 20 },
});
