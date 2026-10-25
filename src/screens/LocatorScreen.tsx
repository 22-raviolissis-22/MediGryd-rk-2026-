import { useMemo, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
  ActionStack,
  BodyText,
  DisplayTitle,
  WhiteCard,
  WhitePill,
} from '../components/AppChrome';
import { Text } from '../components/AppText';
import { useApp } from '../context';
import { areaPharmacies } from '../data/pharmacies';
import { requestDeviceLocation } from '../data/deviceLocation';
import {
  digitsZip,
  formatMiles,
  pharmaciesByDistance,
  pointForZip,
  type GeoPoint,
  type RankedPharmacy,
} from '../data/geo';
import { fill, t } from '../i18n';
import { ink, typeface } from '../theme';

type Origin =
  | { kind: 'device'; point: GeoPoint }
  | { kind: 'zip'; zip: string; point: GeoPoint };

export function LocatorScreen() {
  const { language, textScale, setLocatorOrigin } = useApp();
  const c = t(language);
  const [busy, setBusy] = useState(false);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [zipDraft, setZipDraft] = useState('');
  const [status, setStatus] = useState<'idle' | 'denied' | 'unavailable' | 'zipUnknown' | 'zipInvalid'>(
    'idle'
  );

  const ranked: RankedPharmacy[] = useMemo(() => {
    if (!origin) return areaPharmacies.map((pharmacy) => ({ pharmacy, miles: null }));
    return pharmaciesByDistance(origin.point, areaPharmacies);
  }, [origin]);

  const askLocation = async () => {
    setBusy(true);
    const result = await requestDeviceLocation();
    setBusy(false);
    if (result.ok) {
      setOrigin({ kind: 'device', point: result.point });
      setLocatorOrigin(result.point);
      setStatus('idle');
      return;
    }
    setOrigin(null);
    setLocatorOrigin(null);
    setStatus(result.reason);
  };

  const sortFromZip = () => {
    const zip = digitsZip(zipDraft);
    if (zip.length !== 5) {
      setStatus('zipInvalid');
      return;
    }
    const point = pointForZip(zip);
    if (!point) {
      setStatus('zipUnknown');
      return;
    }
    setOrigin({ kind: 'zip', zip, point });
    setLocatorOrigin(point);
    setStatus('idle');
  };

  const statusCopy =
    status === 'denied'
      ? c.locatorDenied
      : status === 'unavailable'
        ? c.locatorUnavailable
        : status === 'zipUnknown'
          ? c.locatorZipUnknown
          : status === 'zipInvalid'
            ? c.locatorZipInvalid
            : origin?.kind === 'device'
              ? c.locatorUsingLocation
              : origin?.kind === 'zip'
                ? fill(c.locatorUsingZip, { zip: origin.zip })
                : c.locatorNeedOrigin;

  return (
    <>
      <WhiteCard>
        <DisplayTitle>{c.locatorTitle}</DisplayTitle>
        <BodyText>{c.locatorIntro}</BodyText>
      </WhiteCard>

      <WhitePill
        display
        label={busy ? c.locatorAsking : c.locatorUseLocation}
        onPress={() => {
          if (!busy) void askLocation();
        }}
      />

      <ActionStack>
        <WhiteCard>
          <Text style={[styles.label, typeface(language, 'bodyBold')]}>{c.locatorZipLabel}</Text>
          <TextInput
            value={zipDraft}
            onChangeText={setZipDraft}
            onSubmitEditing={sortFromZip}
            placeholder={c.locatorZipPlaceholder}
            placeholderTextColor="#777"
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType="done"
            accessibilityLabel={c.locatorZipLabel}
            style={[
              styles.input,
              { fontSize: Math.round(18 * textScale) },
              typeface(language, 'body'),
            ]}
          />
        </WhiteCard>
        <WhitePill display label={c.locatorZipSubmit} onPress={sortFromZip} />
      </ActionStack>

      <Text
        style={[
          styles.status,
          typeface(language, 'body'),
          (status === 'denied' ||
            status === 'unavailable' ||
            status === 'zipUnknown' ||
            status === 'zipInvalid') &&
            styles.statusWarn,
        ]}
      >
        {statusCopy}
      </Text>

      {ranked.map(({ pharmacy: p, miles }) => (
        <WhiteCard key={p.id}>
          <Text style={[styles.name, typeface(language, 'display')]}>{p.name}</Text>
          <Text style={[styles.meta, typeface(language, 'body')]}>{p.address}</Text>
          {p.phone ? <Text style={[styles.meta, typeface(language, 'body')]}>{p.phone}</Text> : null}
          <Text style={[styles.distance, typeface(language, 'bodyBold')]}>
            {miles == null
              ? origin
                ? c.locatorDistanceUnknown
                : c.locatorWaitingDistance
              : fill(c.locatorDistance, { miles: formatMiles(miles) })}
          </Text>
        </WhiteCard>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, lineHeight: 22, color: ink, textAlign: 'center' },
  input: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: ink,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: ink,
    textAlign: 'center',
  },
  status: {
    fontSize: 13,
    lineHeight: 18,
    color: '#444',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  statusWarn: { color: '#B42318' },
  name: { fontSize: 18, lineHeight: 24, color: ink, textAlign: 'center' },
  meta: { fontSize: 13, lineHeight: 18, color: '#444', textAlign: 'center', marginTop: 4 },
  distance: { fontSize: 15, lineHeight: 20, color: '#2C4A9A', textAlign: 'center', marginTop: 8 },
});
