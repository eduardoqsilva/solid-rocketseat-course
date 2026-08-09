import type { Gym, GymCreateInput } from '@/lib/prisma'

export interface FindManyNearby {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  findById(userId: string): Promise<Gym | null>
  create(data: GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  searchManyNearby(params: FindManyNearby): Promise<Gym[]>
}
