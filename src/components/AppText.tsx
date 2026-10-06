import { StyleSheet, Text as RNText, type TextProps } from 'react-native';
import { useApp } from '../context';

/** Drop-in Text that applies the user's large-text setting to fontSize and lineHeight. */
export function Text({ style, ...rest }: TextProps) {
  const { textScale } = useApp();
  if (textScale === 1) return <RNText style={style} {...rest} />;
  const flat = StyleSheet.flatten(style) ?? {};
  const scaled = {
    ...flat,
    ...(typeof flat.fontSize === 'number' ? { fontSize: Math.round(flat.fontSize * textScale) } : null),
    ...(typeof flat.lineHeight === 'number'
      ? { lineHeight: Math.round(flat.lineHeight * textScale) }
      : null),
  };
  return <RNText style={scaled} {...rest} />;
}
