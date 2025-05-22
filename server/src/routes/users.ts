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
          role: true,
          email: true,
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
        select: { id: true, role: true, email: true, password: true, provider: true },
      })

      // 1️⃣ Reject non-credentials accounts up front
      if (user && user.provider !== 'credentials') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Please log in via Google instead of email/password.',
        })
      }

      // 2️⃣ Now handle “user not found” or bad password
      if (!user || !(await bcrypt.compare(input.password, user.password!))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password.',
        })
      }

      // 3️⃣ Issue your tokens
      const tokens = await signTokens({ userIdValue: user.id, ctx })
      setTokenCookie(ctx.res, tokens)

      return { user: { id: user.id, email: user.email, role: user.role } }
    }),
  user: publicProcedure.mutation(async ({ ctx }) => {
    // Try verifying the access token first
    const accessPayload = verifyAccessToken(ctx.req.cookies['access-token'])
    if (accessPayload?.userId != null) {
      const userIdValue = accessPayload.userId

      // Fetch the role from the database
      const dbUser = await ctx.prisma.user.findUnique({
        where: { id: userIdValue },
        select: {
          name: true,
          role: true,
        },
      })
      if (!dbUser) {
        // shouldn’t happen unless the user was deleted
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      // Re-issue tokens
      const tokens = await signTokens({ userIdValue, ctx })
      setTokenCookie(ctx.res, tokens)

      if (dbUser.name !== null) {
        return {
          user: {
            id: userIdValue,
            role: dbUser.role,
            name: dbUser.name,
          },
          tokens,
        }
      } else {
        return {
          user: {
            id: userIdValue,
            role: dbUser.role,
          },
          tokens,
        }
      }
    }

    // If access token expired or missing, try refresh token
    const refreshPayload = await verifyRefreshToken({
      token: ctx.req.cookies['refresh-token'],
      ctx,
    })
    if (refreshPayload?.userId != null) {
      const userIdValue = refreshPayload.userId

      // Fetch the role again
      const dbUser = await ctx.prisma.user.findUnique({
        where: { id: userIdValue },
        select: { role: true },
      })
      if (!dbUser) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      // Re-issue tokens
      const tokens = await signTokens({ userIdValue, ctx })
      setTokenCookie(ctx.res, tokens)

      return {
        user: {
          id: userIdValue,
          role: dbUser.role,
        },
        tokens,
      }
    }

    // Both tokens invalid → clear cookies and return null
    clearCookies(ctx)
    return null
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
