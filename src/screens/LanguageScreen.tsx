import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { GridBackground } from '../components/GridBackground';
import { useApp } from '../context';

const display = 'Fredoka_700Bold';

export function LanguageScreen() {
  const { setLanguage, go } = useApp();

  return (
    <View style={styles.root}>
      <GridBackground />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>APP NAME</Text>
          <View style={styles.plusBtn} accessibilityLabel="App logo">
            <View style={styles.plusTop} />
            <View style={styles.plusBottom} />
            <Text style={styles.plus}>+</Text>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setLanguage('en');
            go('insurance');
          }}
          style={({ pressed }) => [styles.pill, styles.pillWhite, pressed && styles.pressed]}
        >
          <Text style={styles.pillDark}>GET STARTED?</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setLanguage('es');
            go('insurance');
          }}
          style={({ pressed }) => [styles.pill, styles.pillBlue, pressed && styles.pressed]}
        >
          <Text style={styles.pillLight}>¿EMPEZAMOS?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const shadow = Platform.select({
  web: { boxShadow: '0 6px 14px rgba(90, 160, 200, 0.22)' },
  ios: {
    shadowColor: '#4A9BB8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  default: { elevation: 4 },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#A9E4F8' },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 22 : 56,
    paddingHorizontal: 16,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingLeft: 22,
    paddingRight: 10,
    paddingVertical: 10,
    minHeight: 64,
    ...shadow,
  },
  appName: {
    flex: 1,
    fontFamily: display,
    fontSize: 28,
    color: '#111',
    letterSpacing: 0.4,
  },
  plusBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  plus: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginTop: -2,
    lineHeight: 32,
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 22,
    ...shadow,
  },
  pillWhite: { backgroundColor: '#FFFFFF' },
  pillBlue: { backgroundColor: '#8BA4F7' },
  pillDark: {
    fontFamily: display,
    fontSize: 26,
    color: '#111',
  },
  pillLight: {
    fontFamily: display,
    fontSize: 26,
    color: '#FFFFFF',
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
});
