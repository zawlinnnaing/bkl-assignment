import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

import { prismaClient } from '../prisma'

jest.mock('../prisma/client.ts', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
  prismaMock.$transaction.mockImplementation(async writes => {
    const results = []
    for (const write of writes) {
      const result = await write
      results.push(result)
    }
    return results
  })
})

export const prismaMock = prismaClient as DeepMockProxy<PrismaClient>
