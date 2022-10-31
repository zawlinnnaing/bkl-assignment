import { Resolvers } from '../../../generated/types'
import { Context } from '../../../libs/context'

import * as repository from '../repository'

export const query: Resolvers<Context>['Query'] = {
  tasklist(parent, args) {
    return repository.getTasklistById(args.id)
  },

  tasklists: () => {
    return repository.getTasklists()
  },
}
