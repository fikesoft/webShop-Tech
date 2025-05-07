import { router } from '../trpc/trpc'
import { userRouter } from './users'

export const trpcRouter = router({
  users: userRouter,
})
export type TrpcRouter = typeof trpcRouter
