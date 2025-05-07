import { prisma } from '../lib/prisma'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import jwt from 'jsonwebtoken'
export async function createContext(opts: CreateExpressContextOptions) {
  const { req, res } = opts

  const token = req.cookies['access-token']
  let _user: { userId: number } | null = null

  if (typeof token === 'string') {
    try {
      _user = jwt.verify(token, process.env.ACCESS_SECRET!) as { userId: number }
    } catch {
      _user = null
    }
  }
  return {
    req,
    res,
    _user,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
