import { trpc } from '../trpc'
import { userRouter } from './users'

export const trpcRouter = trpc.router({
  users: userRouter,
})
export type TrpcRouter = typeof trpcRouter
