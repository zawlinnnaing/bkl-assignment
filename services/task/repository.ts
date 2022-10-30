import { CreateTaskInput, TaskStatus } from '../../generated/types'
import { prismaClient } from '../../prisma'

export async function createTask(task: CreateTaskInput) {
  if (!task.title.trim()) {
    throw new Error('Invalid task title')
  }

  const status = task.status ?? TaskStatus.Active

  const [, createdTask] = await prismaClient.$transaction([
    prismaClient.task.updateMany({
      where: {
        position: {
          gte: 0,
        },
      },
      data: {
        position: {
          increment: 1,
        },
      },
    }),
    prismaClient.task.create({
      data: {
        ...task,
        position: 0,
        status,
      },
    }),
  ])
  return createdTask
}
