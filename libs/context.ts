import { PrismaClient } from '@prisma/client'
import type { ExpressContext } from 'apollo-server-express'
import { prismaClient } from '../prisma'

export interface Context {
  prisma: PrismaClient
}

export function createContext(ctx: ExpressContext): Context {
  return {
    ...ctx,
    prisma: prismaClient,
  }
}
