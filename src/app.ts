import { PrismaPg } from '@prisma/adapter-pg'
import fastify from 'fastify'
import { PrismaClient } from '../prisma/generated/prisma/client'
import { env } from './env'

export const app = fastify()

export const schema =
  new URL(env.DATABASE_URL).searchParams.get('schema') || 'public'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL }, { schema })

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
