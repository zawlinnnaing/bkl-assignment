import { Resolvers } from '../../../generated/types'
import { Context } from '../../../libs/context'
import * as repository from '../repository'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTasklist: async (parent, args) => {
    return repository.createTasklist(args.title)
  },
}
