export type AvailabilityNote = {
  medicationId: string;
  badgeKey: 'availBadgeNoGeneric' | 'availBadgeNoBiosimilar';
  noteKey:
    | 'availNoteTrintellix'
    | 'availNoteEliquis'
    | 'availNoteJardiance'
    | 'availNoteKeytruda'
    | 'availNoteTrulicity';
};

const notes: AvailabilityNote[] = [
  { medicationId: 'trintellix', badgeKey: 'availBadgeNoGeneric', noteKey: 'availNoteTrintellix' },
  { medicationId: 'eliquis', badgeKey: 'availBadgeNoGeneric', noteKey: 'availNoteEliquis' },
  { medicationId: 'jardiance', badgeKey: 'availBadgeNoGeneric', noteKey: 'availNoteJardiance' },
  { medicationId: 'keytruda', badgeKey: 'availBadgeNoBiosimilar', noteKey: 'availNoteKeytruda' },
  { medicationId: 'trulicity', badgeKey: 'availBadgeNoBiosimilar', noteKey: 'availNoteTrulicity' },
];

export function availabilityNoteFor(medicationId: string): AvailabilityNote | null {
  return notes.find((n) => n.medicationId === medicationId) ?? null;
}
