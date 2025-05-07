import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc/trpc'
import { hashPassword } from '../trpc/middlewares/hashPasswords'
import bcrypt from 'bcrypt'
import { signTokens, setTokenCookie, verifyAccessToken, verifyRefreshToken, clearCookies } from '../trpc/utils/auth'
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
    .use(hashPassword)
    .mutation(async ({ ctx, input }) => {
      //Check if the user exists
      const existing = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })
      //If user exists then throw an error
      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This email already was registered to ivi-shop',
        })
      }
      //If the user does not exists then lets create the user
      //If the user is created succesfully returns the id of the user
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: input.password,
        },
        select: {
          id: true,
        },
      })
      const userIdValue = user.id
      const tokens = await signTokens({ userIdValue, ctx })
      setTokenCookie(ctx.res, tokens)
      //Lets send to cookies the  tokens
      return { user }
    }),
  //Login procedure does not need  the  hash middleware
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })
      //Check if the user does not exist and compare the passwords
      if (!user || !(await bcrypt.compare(input.password, user.password))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        })
      }
      //If the user login then for sure he does not have an access and refresh token
      const userIdValue = user.id
      const tokens = await signTokens({ userIdValue, ctx })
      setTokenCookie(ctx.res, tokens)
      return { user }
    }),
  user: publicProcedure.mutation(async ({ ctx }) => {
    if (ctx._user !== null) {
      const user = verifyAccessToken(ctx.req.cookies['access-token'])
      let _tokens
      if (user !== null && user.userId !== null) {
        const userIdValue = user.userId
        _tokens = await signTokens({ userIdValue, ctx })
      }
      return user
    } else {
      //In the context we check if  the acces token exists
      //If no then the user is null
      //Then user refreshed could exist
      const userRefreshed = await verifyRefreshToken(ctx.req.cookies['refresh-token'])
      if (userRefreshed !== null && userRefreshed.userId !== null) {
        const userIdValue = userRefreshed.userId
        const _tokens = await signTokens({ userIdValue, ctx })
        setTokenCookie(ctx.res, _tokens)
        return userRefreshed
      } else {
        if (userRefreshed !== null && userRefreshed.userId !== null) {
          await ctx.prisma.user.update({
            where: { id: userRefreshed.userId },
            data: { refreshToken: '' },
          })
        }
        clearCookies(ctx)
        return null
      }
    }
  }),
  logoutUser: publicProcedure.mutation(async ({ ctx }) => {
    if (ctx._user) {
      await ctx.prisma.user.update({
        where: { id: ctx._user.userId },
        data: { refreshToken: '' },
      })
    }
    clearCookies(ctx)
    return { success: true }
  }),
})
export type TrpcRouter = typeof userRouter
