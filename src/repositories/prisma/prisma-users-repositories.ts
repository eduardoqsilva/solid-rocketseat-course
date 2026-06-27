import { prisma, type User, type UserCreateInput } from '@/lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  findById(userId: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
