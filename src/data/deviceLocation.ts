import * as Location from 'expo-location';
import type { GeoPoint } from './geo';

export type LocationResult =
  | { ok: true; point: GeoPoint }
  | { ok: false; reason: 'denied' | 'unavailable' };

export async function requestDeviceLocation(): Promise<LocationResult> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return { ok: false, reason: 'denied' };
    const pos = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      ok: true,
      point: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
    };
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}
