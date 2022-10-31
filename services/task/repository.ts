import { Task } from '@prisma/client'
import {
  CreateTaskInput,
  TaskStatus,
  UpdateTaskInput,
} from '../../generated/types'
import { prismaClient } from '../../prisma'
import { gqlStatusToPrismaStatus } from './utils'

export async function createTask(task: CreateTaskInput) {
  if (!task.title.trim()) {
    throw new Error('Invalid task title')
  }

  const status = task.status ?? TaskStatus.Active

  const [, createdTask] = await prismaClient.$transaction([
    prismaClient.task.updateMany({
      where: {
        list_id: task.list_id,
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

export async function updateTask(
  id: string,
  task: UpdateTaskInput
): Promise<Task | null> {
  return prismaClient.task.update({
    where: {
      id,
    },
    data: {
      ...(task.title && { title: task.title }),
      ...(task.status && { status: gqlStatusToPrismaStatus(task.status) }),
    },
  })
}

export async function moveTask(
  id: string,
  newListId: string,
  newPosition: number
) {
  const task = await prismaClient.task.findUniqueOrThrow({
    where: {
      id,
    },
  })
  const [, updatedTask] = await prismaClient.$transaction([
    prismaClient.task.updateMany({
      where: {
        list_id: newListId,
        position: {
          gte: newPosition,
        },
      },
      data: {
        position: {
          increment: 1,
        },
      },
    }),
    prismaClient.task.update({
      where: {
        id,
      },
      data: {
        list_id: newListId,
        position: newPosition,
      },
    }),
    // Remove task from old position
    prismaClient.task.updateMany({
      where: {
        list_id: task.list_id,
        position: {
          gt: task.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    }),
  ])
  return updatedTask
}

export async function getTasks() {
  return prismaClient.task.findMany()
}

export async function getTaskById(id: string) {
  return prismaClient.task.findUniqueOrThrow({
    where: {
      id,
    },
  })
}
