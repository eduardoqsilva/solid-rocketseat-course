import type { CheckIn, Prisma } from '@/lib/prisma'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate({
    userId,
    date,
  }: {
    userId: string
    date: Date
  }): Promise<CheckIn | null>
}
