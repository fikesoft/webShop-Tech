import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './routes'
import cors from 'cors'
import { createContext } from './trpc/context'
import cookieParser from 'cookie-parser'
const expressApp = express()

expressApp.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
expressApp.use(cookieParser())
expressApp.use(express.json())
expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
)

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
