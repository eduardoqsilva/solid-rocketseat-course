import type { User, UserCreateInput } from '@/lib/prisma'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find((i) => i.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((i) => i.email === email)

    if (!user) {
      return null
    }

    return user
  }
  async create(data: UserCreateInput) {
    const user = {
      id: 'user-01',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)
    return user
  }
}
