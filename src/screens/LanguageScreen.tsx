import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppChrome, shadow } from '../components/AppChrome';
import { useApp } from '../context';
import { ink, periwinkle, typeface } from '../theme';
import type { Language } from '../types';

const OPTIONS: { lang: Language; label: string; caption: string; tone: 'white' | 'blue' }[] = [
  { lang: 'en', label: 'GET STARTED?', caption: 'English', tone: 'white' },
  { lang: 'es', label: '¿EMPEZAMOS?', caption: 'Español', tone: 'blue' },
  { lang: 'zh', label: '开始使用？', caption: '简体中文', tone: 'white' },
  { lang: 'hi', label: 'शुरू करें?', caption: 'हिन्दी', tone: 'blue' },
];

export function LanguageScreen() {
  const { setLanguage, go } = useApp();

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
});
