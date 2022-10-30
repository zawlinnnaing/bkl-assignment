import { TaskStatus } from '../../generated/types'
import { TaskStatus as PrismaTaskStatus } from '@prisma/client'

export function gqlStatusToPrismaStatus(status: TaskStatus): PrismaTaskStatus {
  return status as PrismaTaskStatus
}
