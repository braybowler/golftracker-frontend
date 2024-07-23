export interface GolfBag {
  id: string
  make: string
  model: string
  nickname: string
}

export interface GolfClub {
  id: string
  make: string
  model: string
  loft: number
  carry_distance: number
  total_distance: number
}

export type GTResource = GolfBag | GolfClub
