import type { ClubCategory } from '@/common/enums'

export interface GolfBag {
  id: string | number
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
  id: string | number
  make: string
  model: string
  loft: number
  club_category: ClubCategory
  club_type: string
  carry_distance: number
  total_distance: number
}

export function isGolfClub(obj: any): obj is GolfBag {
  return (
    obj.id !== undefined &&
    obj.make !== undefined &&
    obj.model !== undefined &&
    obj.loft !== undefined &&
    obj.club_category !== undefined &&
    obj.club_type !== undefined &&
    obj.carry_distance !== undefined &&
    obj.total_distance !== undefined
  )
}

export interface GolfBall {
  id: string | number
  make: string
  model: string
}

export function isGolfBall(obj: any): obj is GolfBag {
  return obj.id !== undefined && obj.make !== undefined && obj.model !== undefined
}

export type GTResource = GolfBag | GolfClub | GolfBall
