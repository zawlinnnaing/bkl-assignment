import { startGateway } from './gateway'
import { startServiceServer } from './libs/server'
import userService from './services/user'
import taskService from './services/task'

async function bootstrap() {
  await Promise.all([userService, taskService].map(startServiceServer))

  await startGateway()
}

bootstrap()
