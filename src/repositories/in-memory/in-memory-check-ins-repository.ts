import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import type { CheckIn, CheckInUncheckedCreateInput } from '@/lib/prisma'
import type { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate({ date, userId }: { userId: string; date: Date }) {
    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isSame(date, 'day')

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(checkIn)
    return checkIn
  }
}
