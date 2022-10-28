import { ServiceMetadata } from '../../libs/types'
import { resolvers } from './resolvers'
import { schema } from './resolvers/schema'

const metadata: ServiceMetadata = {
  typeDefs: schema,
  resolvers,
  port: Number(process.env.TASK_SERVICE_PORT),
  serviceName: 'Task',
}

export default metadata
