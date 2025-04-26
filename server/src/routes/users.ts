import { trpc } from '../trpc'
const arraty = [{ test1: 'test' }, { test2: 'test2' }]

export const userRouter = trpc.router({
  getUser: trpc.procedure.query(() => {
    //This is the function that is in the controller
    return { arraty }
  }),
})
export type TrpcRouter = typeof userRouter
