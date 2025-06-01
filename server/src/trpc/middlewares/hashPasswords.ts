import { publicHashMiddleware } from '../trpc'
import bcrypt from 'bcrypt'
export const hashPassword = publicHashMiddleware(async ({ ctx, next, input }) => {
  if (input && typeof (input as any).password === 'string') {
    const data = input as Record<string, any>
    const hashed = await bcrypt.hash(data.password, 10)
    return next({ ctx, input: { ...data, password: hashed } })
  }
  return next({ ctx, input })
})

export const hashNewPassword = publicHashMiddleware(async ({ ctx, next, input }) => {
  if (input && typeof (input as any).newPassword === 'string') {
    const data = input as Record<string, any>
    const hashed = await bcrypt.hash(data.newPassword, 10)
    return next({ ctx, input: { ...data, newPassword: hashed } })
  }
  return next({ ctx, input })
})
