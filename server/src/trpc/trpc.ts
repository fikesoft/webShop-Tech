import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from './context'
import { ZodError } from 'zod'

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

const enforceLogged = t.middleware(({ ctx, next }) => {
  const userId = ctx._user?.userId

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not logged in' })
  }
  return next({
    ctx: {
      ...ctx,
      userId,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = publicProcedure.use(enforceLogged)
export const publicHashMiddleware = t.middleware
