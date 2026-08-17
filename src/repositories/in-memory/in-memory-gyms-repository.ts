import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/index-browser'
import type { Gym, GymCreateInput } from '@/lib/prisma'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import type { FindManyNearby, GymsRepository } from '../gyms-repository'

export class InMemoryGymsepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    const gyms = this.items.find((i) => i.id === gymId)

    if (!gyms) {
      return null
    }

    return gyms
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearby): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.userLatitude,
          longitude: params.userLongitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      )
      return distance < 10
    })
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
