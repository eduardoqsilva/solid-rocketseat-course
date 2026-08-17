import type { Gym, GymCreateInput } from '@/lib/prisma'

export interface FindManyNearby {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  create(data: GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearby): Promise<Gym[]>
}
