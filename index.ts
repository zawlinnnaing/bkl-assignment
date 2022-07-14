import { ApolloServer } from 'apollo-server'
import { createServer as createUserServer } from './services/user'

async function startServer(
  serviceName: string,
  server: ApolloServer,
  port: number
): Promise<void> {
  const { url } = await server.listen(port)

  console.log(`${serviceName} service running at ${url}`)
}

async function bootstrap() {
  await Promise.all([
    createUserServer().then(server =>
      startServer(
        'User',
        server,
        Number(process.env.USER_SERVICE_PORT as string)
      )
    ),
  ])
}

bootstrap()
