import type { ClubCategory } from '@/common/enums'

export interface GolfBag {
  id: number
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
  id: number
  type: string
  sort_index: number
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
    obj.type !== undefined &&
    obj.sort_index !== undefined &&
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
  id: number
  type: string
  user_id: number
  make: string
  model: string
  created_at: string
  updated_at: string
}

export function isGolfBall(obj: any): obj is GolfBag {
  return obj.id !== undefined && obj.make !== undefined && obj.model !== undefined
}

export interface PracticeSession {
  id: number
  date: string
  note: string
  start_time: string
  end_time: string
  temperature: number
  wind_speed: number
  is_complete: boolean
}

export function isPracticeSession(obj: any): obj is GolfBag {
  return obj.id !== undefined &&
    obj.date !== undefined &&
    obj.note !== undefined &&
    obj.start_time !== undefined &&
    obj.end_time !== undefined &&
    obj.temperature !== undefined &&
    obj.wind_speed !== undefined &&
    obj.is_complete !== undefined
}

export type GTResource = GolfBag | GolfClub | GolfBall | PracticeSession
