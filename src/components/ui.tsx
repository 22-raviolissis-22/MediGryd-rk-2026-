import { ReactNode } from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';

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

export async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported || Platform.OS === 'web') {
    await Linking.openURL(url);
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#A9E4F8' },
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
    backgroundColor: '#A9E4F8',
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: '#111',
  },
});
