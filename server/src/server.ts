import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const expressApp = express()
if (true) {
  console.log('Fasfk')
}
expressApp.use(cors())
expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  }),
)

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
