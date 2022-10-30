import { prismaClient } from '../prisma'
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

export const prismaMock = prismaClient as DeepMockProxy<PrismaClient>

jest.mock('../prisma/client.ts', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})
