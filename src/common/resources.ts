import type { ClubCategory } from '@/common/enums'

export interface GolfBag {
  id: string
  make: string
  model: string
  nickname: string
}

export function isGolfBag(obj: any): obj is GolfBag {
  return (
    obj.id !== undefined &&
    obj.make !== undefined &&
    obj.model !== undefined &&
    obj.nickname !== undefined
  )
}

export interface GolfClub {
  id: string
  make: string
  model: string
  loft: number
  club_category: ClubCategory
  carry_distance: number
  total_distance: number
}

export function isGolfClub(obj: any): obj is GolfBag {
  return (
    obj.id !== undefined &&
    obj.make !== undefined &&
    obj.model !== undefined &&
    obj.loft !== undefined &&
    obj.carry_distance !== undefined &&
    obj.total_distance !== undefined
  )
}

export type GTResource = GolfBag | GolfClub
