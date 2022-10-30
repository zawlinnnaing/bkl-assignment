import { ServiceMetadata } from '../../libs/types'
import { resolvers, schema } from './resolvers'

const serviceMetadata: ServiceMetadata = {
  port: Number(process.env.TASKLIST_SERVICE_PORT),
  serviceName: 'Tasklist',
  resolvers: resolvers,
  typeDefs: schema,
}

export default serviceMetadata
