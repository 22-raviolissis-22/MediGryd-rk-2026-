import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppChrome, shadow } from '../components/AppChrome';
import { useApp } from '../context';
import { fonts, ink, periwinkle } from '../theme';

export function LanguageScreen() {
  const { setLanguage, go } = useApp();

  return (
    <AppChrome showSearch={false}>
      <View style={styles.headerSpacer} />
      <Pressable
        onPress={() => {
          setLanguage('en');
          go('insurance');
        }}
        style={({ pressed }) => [styles.pill, styles.white, pressed && styles.pressed]}
      >
        <Text style={styles.dark}>GET STARTED?</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setLanguage('es');
          go('insurance');
        }}
        style={({ pressed }) => [styles.pill, styles.blue, pressed && styles.pressed]}
      >
        <Text style={styles.light}>¿EMPEZAMOS?</Text>
      </Pressable>
    </AppChrome>
  );
}

const styles = StyleSheet.create({
  headerSpacer: { height: 2 },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 22,
    ...shadow,
  },
  white: { backgroundColor: '#FFFFFF' },
  blue: { backgroundColor: periwinkle },
  dark: { fontFamily: fonts.display, fontSize: 26, color: ink },
  light: { fontFamily: fonts.display, fontSize: 26, color: '#FFFFFF' },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
});
