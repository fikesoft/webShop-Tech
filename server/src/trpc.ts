import { initTRPC } from '@trpc/server'
const trpc = initTRPC.create()
const arraty = [{ test1: 'test' }, { test2: 'test2' }]
export const trpcRouter = trpc.router({
  getTest: trpc.procedure.query(() => {
    //This is the function that is in the controller
    return { arraty }
  }),
})
export type TrpcRouter = typeof trpcRouter
