import type { User, UserCreateInput } from '@/lib/prisma'

export interface UsersRepository {
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
