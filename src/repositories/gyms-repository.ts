import type { Gym, GymCreateInput } from '@/lib/prisma'

export interface GymsRepository {
  findById(userId: string): Promise<Gym | null>
  create(data: GymCreateInput): Promise<Gym>
}
