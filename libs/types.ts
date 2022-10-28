import { DocumentNode } from 'graphql'
import { Resolvers } from '../generated/types'
import { Context } from './context'

export type ServiceMetadata = {
  typeDefs: DocumentNode
  resolvers: Resolvers<Context>
  serviceName: string
  port: number
}
