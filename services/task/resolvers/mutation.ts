import { Task } from '@prisma/client'
import { Resolvers, TaskStatus } from '../../../generated/types'
import { Context } from '../../../libs/context'
import * as repository from '../repository'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTask: async (parent, args) => {
    return repository.createTask(args.input)
  },
}
