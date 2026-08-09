import { prisma, type UserCreateInput } from '@/lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
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
