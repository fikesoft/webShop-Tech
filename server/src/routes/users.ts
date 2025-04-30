import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

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
      const { email, password } = input
      return { success: true, user: { email } }
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input
    }),
})
export type TrpcRouter = typeof userRouter
