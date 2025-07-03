import { router } from '../trpc/trpc'
import { googleRouter } from './google'
import { userRouter } from './users'
import { categoryRouter } from './category'
import { productsRouter } from './products'
export const trpcRouter = router({
  users: userRouter,
  google: googleRouter,
  category: categoryRouter,
  products: productsRouter,
})
export type TrpcRouter = typeof trpcRouter
