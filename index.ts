import { startGateway } from './gateway'
import { startServiceServer } from './libs/server'
import userService from './services/user'
import taskService from './services/task'
import tasklistService from './services/tasklist'

async function bootstrap() {
  await Promise.all(
    [userService, taskService, tasklistService].map(startServiceServer)
  )

  await startGateway()
}

bootstrap()
