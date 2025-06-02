import { router } from '../trpc/trpc'
import { googleRouter } from './google'
import { userRouter } from './users'
import { categoryRouter } from './category'
export const trpcRouter = router({
  users: userRouter,
  google: googleRouter,
  category: categoryRouter,
})
export type TrpcRouter = typeof trpcRouter
