import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/index-browser'
import type { Gym, GymCreateInput } from '@/lib/prisma'
import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    const gyms = this.items.find((i) => i.id === gymId)

    if (!gyms) {
      return null
    }

    return gyms
  }

  async create(data: GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }
}
