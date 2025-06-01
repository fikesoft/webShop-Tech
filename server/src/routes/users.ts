import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { privateProcedure, publicProcedure, router } from '../trpc/trpc'
import { hashNewPassword, hashPassword } from '../trpc/middlewares/hashPasswords'
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
          name: true,
          phone: true,
          dateBirth: true,
        },
      })

      const userIdValue = user.id
      const tokens = await signTokens({ userIdValue, ctx })
      setTokenCookie(ctx.res, tokens)

      // Build user object conditionally
      const returnedUser = {
        id: userIdValue,
        role: user.role,
        ...(user.name !== null && { name: user.name }),
        ...(user.email !== null && { email: user.email }),
        ...(user.phone !== null && { phone: user.phone }),
        ...(user.dateBirth !== null && { dateBirth: user.dateBirth }),
      }

      return {
        returnedUser,
        tokens,
      }
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
        select: {
          id: true,
          role: true,
          email: true,
          password: true,
          provider: true,
          name: true,
          phone: true,
          dateBirth: true,
        },
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

      // 4️⃣ Conditionally build user object
      const userResponse = {
        id: user.id,
        role: user.role,
        email: user.email,
        ...(user.name !== null && { name: user.name }),
        ...(user.phone !== null && { phone: user.phone }),
        ...(user.dateBirth !== null && { dateBirth: user.dateBirth }),
      }

      return {
        user: userResponse,
        tokens,
      }
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
          email: true,
          phone: true,
          dateBirth: true,
        },
      })
      if (!dbUser) {
        // shouldn’t happen unless the user was deleted
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      // Re-issue tokens
      const tokens = await signTokens({ userIdValue, ctx })
      setTokenCookie(ctx.res, tokens)

      // Construct user object conditionally
      const user = {
        id: userIdValue,
        role: dbUser.role,
        ...(dbUser.name !== null && { name: dbUser.name }),
        ...(dbUser.email !== null && { email: dbUser.email }),
        ...(dbUser.phone !== null && { phone: dbUser.phone }),
        ...(dbUser.dateBirth !== null && { dateBirth: dbUser.dateBirth }),
      }

      return {
        user,
        tokens,
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
  logoutUser: privateProcedure.mutation(async ({ ctx }) => {
    if (ctx._user) {
      await ctx.prisma.user.update({
        where: { id: ctx._user.userId },
        data: { refreshToken: '' },
      })
    }
    clearCookies(ctx)
    return { success: true }
  }),
  saveProfile: privateProcedure
    .input(
      z.object({
        userName: z.string().min(2).optional(),
        userPhone: z.string().min(6).optional(),
        userEmail: z.string().email().optional(),
        userBirthDate: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId
      const updatedUser = await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          name: input.userName,
          phone: input.userPhone,
          email: input.userEmail,
          dateBirth: input.userBirthDate,
        },
      })

      return { user: updatedUser }
    }),
  changePassword: privateProcedure
    .input(
      z
        .object({
          password: z.string(),
          newPassword: z.string().min(6, 'Parola nouă trebuie să aibă cel puțin 6 caractere'),
          repeatNewPassword: z.string(),
        })
        .refine((d) => d.newPassword === d.repeatNewPassword, {
          message: 'Parolele noi trebuie să coincidă',
          path: ['repeatNewPassword'],
        })
    )
    .use(hashNewPassword)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({ where: { id: ctx.userId } })
      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      if (user.provider === 'google') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You dont have an password because you made your account with Google',
        })
      }

      const ok = await bcrypt.compare(input.password, user.password)
      if (!ok) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Parola veche e incorectă' })
      }

      await ctx.prisma.user.update({
        where: { id: ctx.userId },
        data: { password: input.newPassword },
      })

      return { success: true }
    }),
})
export type TrpcRouter = typeof userRouter
