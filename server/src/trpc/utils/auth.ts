import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { Context } from '../context'
import bcrypt from 'bcrypt'
const ACCESS_SECRET = process.env.ACCESS_SECRET!
const REFRESH_SECRET = process.env.REFRESH_SECRET!

export const signTokens = async ({ userIdValue, ctx }: { userIdValue: number | undefined; ctx: Context }) => {
  const accessToken = jwt.sign({ userId: userIdValue }, ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ userId: userIdValue }, REFRESH_SECRET, { expiresIn: '7d' })
  const hashedToken = await bcrypt.hash(refreshToken, 10)
  await ctx.prisma.user.update({
    where: { id: userIdValue },
    data: { refreshToken: hashedToken },
  })
  return { accessToken, refreshToken }
}

export const setTokenCookie = (res: Response, tokens: { accessToken: string; refreshToken: string }) => {
  res.cookie('access-token', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
    path: '/',
  })

  res.cookie('refresh-token', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}
export function verifyAccessToken(token: string): { userId: number } | null {
  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as any
    return typeof payload.userId === 'number' ? { userId: payload.userId } : null
  } catch {
    return null
  }
}

export async function verifyRefreshToken({ token, ctx }: { token: string; ctx: Context }) {
  try {
    const payload = jwt.verify(token, REFRESH_SECRET) as { userId: number }

    const user = await ctx.prisma.user.findUnique({
      where: { id: payload.userId },
    })

    if (!user || !user.refreshToken) {
      return null
    }

    const isValid = await bcrypt.compare(token, user.refreshToken)
    return isValid ? { userId: payload.userId } : null
  } catch {
    return null
  }
}

export function clearCookies(ctx: Context) {
  // Clear both cookies by name
  ctx.res.cookie('access-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  ctx.res.cookie('refresh-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}
