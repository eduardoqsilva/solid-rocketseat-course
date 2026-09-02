import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'ADMIN' | 'MEMBER'
) {
  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password_hash: await hash('123456', 6),
      role,
    },
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhondoe@mail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
