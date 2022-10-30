import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createUser: async (_parent, { input }, ctx) => {
    const user = await ctx.prisma.user.create({ data: input })
    return user
  },
  updateUser: async (_parent, { id, input }, ctx) =>
    ctx.prisma.user.update({
      where: { id },
      data: {
        username: input.username ?? undefined,
      },
    }),
}
