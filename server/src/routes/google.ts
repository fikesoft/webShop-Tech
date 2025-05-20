import { z } from 'zod'
import { publicProcedure, router } from '../trpc/trpc'
import { verifyGoogleIdToken } from '../trpc/utils/googleUtils'
import { setTokenCookie, signTokens } from '../trpc/utils/auth'
import { TRPCError } from '@trpc/server'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN!
const REDIRECT_URI = process.env.REDIRECT_URI!
const REDIRECT_URL = `${FRONTEND_ORIGIN}${'/'}${REDIRECT_URI}`

interface GoogleTokenResponse {
  access_token: string // the OAuth2 bearer token
  expires_in: number // expiry in seconds
  refresh_token?: string // only on the very first exchange
  scope: string // the granted scopes
  token_type: 'Bearer' // always “Bearer”
  id_token?: string // a JWT you can decode for the user’s profile
}

export const googleRouter = router({
  googleAuthUrl: publicProcedure.query(() => {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      response_type: 'code',
      scope: 'profile email',
      access_type: 'offline',
      prompt: 'consent',
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }),
  googleAuthCallback: publicProcedure.input(z.object({ code: z.string() })).mutation(async ({ input, ctx }) => {
    // 1) Exchange code for tokens
    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URL,
        grant_type: 'authorization_code',
        code: input.code,
      }),
    })
    if (!resp.ok) {
      const text = await resp.text()
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Google token exchange failed: ${resp.status} ${text}`,
      })
    }
    const tokenResp = (await resp.json()) as GoogleTokenResponse

    // 2) Verify the ID token
    if (!tokenResp.id_token) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No ID token returned by Google',
      })
    }
    const payload = await verifyGoogleIdToken(tokenResp.id_token)

    // 3) Find or create the user
    let user = await ctx.prisma.user.findUnique({
      where: { email: payload.email },
    })

    // 3a) Prevent credential‐only accounts from being overridden
    if (user && user.provider === 'credentials') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'This email is already registered with a password. Please log in with credentials.',
      })
    }

    // 3b) Create new Google user if needed
    if (!user) {
      user = await ctx.prisma.user.create({
        data: {
          email: payload.email,
          password: '',
          provider: 'google',
          name: payload.name,
          picture: payload.picture,
        },
      })
    }

    // 4) Issue your own JWTs & set cookies
    const tokens = await signTokens({ userIdValue: user.id, ctx })
    setTokenCookie(ctx.res, tokens)

    // 5) Return user (or a DTO)
    return { user }
  }),
})

export type TrpcRouter = typeof googleRouter
