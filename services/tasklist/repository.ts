import { Tasklist } from '@prisma/client'
import { prismaClient } from '../../prisma'

export async function createTasklist(title: string) {
  if (!title.trim()) {
    throw new Error('Invalid title')
  }

  return prismaClient.tasklist.create({
    data: {
      title,
    },
    include: {
      tasks: true,
    },
  })
}

export async function getTasklistById(id: string) {
  return prismaClient.tasklist.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  })
}

export async function getTasklists() {
  return prismaClient.tasklist.findMany({
    include: {
      tasks: true,
    },
  })
}
