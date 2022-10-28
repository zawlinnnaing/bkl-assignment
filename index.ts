import { startGateway } from './gateway'
import { startServiceServer } from './libs/server'
import UserServiceMetadata from './services/user'

async function bootstrap() {
  await Promise.all([startServiceServer(UserServiceMetadata)])

  await startGateway()
}

bootstrap()
