import { Resolvers } from '../../../generated/types'
import { Context } from '../../../libs/context'
import { mutation } from './mutation'
import { query } from './query'

export const resolvers: Resolvers<Context> = {
  Query: query,
  Mutation: mutation,
  Tasklist: {
    tasks: parent => parent.tasks.sort((a, b) => a.position - b.position),
  },
}

export * from './schema'
