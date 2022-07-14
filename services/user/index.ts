import { ApolloServer } from 'apollo-server'
import { createGqlServer } from '../../libs/server'
import { resolvers } from './resolvers'
import { typeDefs } from './resolvers/schema'

export function createServer(): Promise<ApolloServer> {
  return createGqlServer({
    typeDefs,
    resolvers,
  })
}
