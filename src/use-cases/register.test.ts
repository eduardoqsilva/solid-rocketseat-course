import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const userData = {
      name: 'John Doe',
      email: 'Johndoe@exemple.com',
      password: '12345678',
    }

    const { user } = await sut.execute(userData)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const userData = {
      name: 'John Doe',
      email: 'Johndoe@exemple.com',
      password: '12345678',
    }

    const { user } = await sut.execute(userData)
    const { password_hash } = user
    const isPasswordCorrectlyHashed = await compare(
      userData.password,
      password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const userData = {
      name: 'John Doe',
      email: 'Johndoe@exemple.com',
      password: '12345678',
    }

    await sut.execute(userData)

    await expect(() => sut.execute(userData)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    )
  })
})
