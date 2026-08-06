import { Decimal } from '@prisma/client/runtime/index-browser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckinUseCase } from './check-in'

let CheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsepository()
    sut = new CheckinUseCase(CheckInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      description: '',
      title: 'Test Gym',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      description: '',
      title: 'Test Gym',
      phone: '',
      latitude: new Decimal(-17.0756597),
      longitude: new Decimal(-50.05912874),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -17.7672136,
        userLongitude: -50.5561114,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
