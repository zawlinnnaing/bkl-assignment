import { Resolvers } from '../../../generated/types'
import { Context } from '../../../libs/context'

import * as repository from '../repository'

export const query: Resolvers<Context>['Query'] = {
  tasks: async () => {
    return repository.getTasks()
  },
  task: async (parent, args) => {
    return repository.getTaskById(args.id)
  },
}
