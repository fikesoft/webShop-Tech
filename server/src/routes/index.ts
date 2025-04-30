import { router } from '../trpc'
import { userRouter } from './users'

export const trpcRouter = router({
  users: userRouter,
})
export type TrpcRouter = typeof trpcRouter
