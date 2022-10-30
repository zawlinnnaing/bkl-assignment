import { Task } from '@prisma/client'
import { Resolvers, TaskStatus } from '../../../generated/types'
import { Context } from '../../../libs/context'
import * as repository from '../repository'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTask: async (parent, args) => {
    return repository.createTask(args.input)
  },
  updateTask: async (parent, args) => {
    const updatedTask = await repository.updateTask(args.id, args.input)
    if (!updatedTask) {
      throw new Error(`Task not found for id: ${args.id}`)
    }
    return updatedTask
  },
  moveTask: async (parent, args) => {
    return repository.moveTask(args.id, args.list_id, args.position)
  },
}
