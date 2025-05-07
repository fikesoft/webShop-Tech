import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './routes'
import cors from 'cors'
import { createContext } from './trpc/context'
import dotenv from 'dotenv'
const expressApp = express()

expressApp.use(
  cors({
    credentials: true,
  })
)
expressApp.use(express.json())
expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
)
dotenv.config()

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
