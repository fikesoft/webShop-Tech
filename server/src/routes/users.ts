import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'
const VALID_PASSWORD = '123'

export const userRouter = router({
  registerUser: publicProcedure
    .input(
      z
        .object({
          email: z.string().email(),
          password: z.string().min(2),
          confirmPassword: z.string().min(2),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: 'Passwords must match',
          path: ['confirmPassword'],
        })
    )
    .mutation(async ({ input }) => {
      const { email /*password*/ } = input
      return { success: true, user: { email } }
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input

      if (password !== VALID_PASSWORD) {
        // business-logic failure → throw a TRPCError
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email or password is incorrect',
        })
      }

      return {
        success: true,
        user: { email },
      }
    }),
})
export type TrpcRouter = typeof userRouter
