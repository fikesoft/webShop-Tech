import { router } from '../trpc/trpc'
import { googleRouter } from './google'
import { userRouter } from './users'

export const trpcRouter = router({
  users: userRouter,
  google: googleRouter,
})
export type TrpcRouter = typeof trpcRouter
