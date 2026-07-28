import type { CheckIn } from '@/lib/prisma'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate({
      date: new Date(),
      userId,
    })

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
