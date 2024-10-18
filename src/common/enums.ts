export enum ClubCategory {
  PUTTER = 'Putter',
  WEDGE = 'Wedge',
  IRON = 'Iron',
  HYBRID = 'Hybrid',
  WOOD = 'Wood'
}

export enum SwingType {
  TWENTY_FIVE_PERCENT = '25%',
  THIRTY_THREE_PERCENT = '33%',
  FIFTY_PERCENT = '50%',
  SIXTY_SIX_PERCENT = '66%',
  SEVENTY_FIVE_PERCENT = '75%',
  ONE_HUNDRED_PERCENT = '100%',
}

export const PUTTER_TYPES = ['Blade', 'Mallet']

export const WEDGE_TYPES = ['LW', 'SW', 'GW', 'PW']

export const IRON_TYPES = ['9i', '8i', '7i', '6i', '5i', '4i', '3i', '2i', '1i']

export const HYBRID_TYPES = ['7h', '6h', '5h', '4h', '3h', '2h', '1h']

export const WOOD_TYPES = ['9w', '7w', '5w', '4w', '3w', '2w', '1w']

export const CLUB_TYPES: Record<ClubCategory, string[]> = {
  [ClubCategory.PUTTER]: PUTTER_TYPES,
  [ClubCategory.WEDGE]: WEDGE_TYPES,
  [ClubCategory.IRON]: IRON_TYPES,
  [ClubCategory.HYBRID]: HYBRID_TYPES,
  [ClubCategory.WOOD]: WOOD_TYPES
}
