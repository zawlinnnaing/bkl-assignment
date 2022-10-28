import { createGqlServer } from '../../libs/server'
import { ServiceMetadata } from '../../libs/types'
import { resolvers } from './resolvers'
import { typeDefs } from './resolvers/schema'

const metadata: ServiceMetadata = {
  typeDefs,
  resolvers,
  port: Number(process.env.USER_SERVICE_PORT),
  serviceName: 'User',
}

export default metadata
