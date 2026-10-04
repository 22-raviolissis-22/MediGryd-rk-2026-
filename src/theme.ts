import type { Language } from './types';

export const sky = '#A9E4F8';
export const periwinkle = '#8BA4F7';
export const ink = '#111111';
export const card = '#FFFFFF';

export const fonts = {
  display: 'Fredoka_700Bold',
  body: 'Nunito_400Regular',
  bodySemi: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
} as const;

export type TypeRole = 'display' | 'body' | 'bodySemi' | 'bodyBold';

/** Fredoka/Nunito lack CJK and Devanagari glyphs — use the system UI for zh/hi. */
export function usesLatinDisplay(lang: Language) {
  return lang === 'en' || lang === 'es';
}

export function typeface(lang: Language, role: TypeRole) {
  if (usesLatinDisplay(lang)) {
    return { fontFamily: fonts[role] as string };
  }
  const fontWeight =
    role === 'display' || role === 'bodyBold' ? ('700' as const) : role === 'bodySemi' ? ('600' as const) : ('400' as const);
  return { fontFamily: undefined, fontWeight };
}
