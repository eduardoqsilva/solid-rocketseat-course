import { type PrismaTypes, prisma } from '@/lib/prisma'

export class PrismaUsersRepository {
  async create(data: PrismaTypes.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
