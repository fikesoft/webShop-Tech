import { jwtVerify, createRemoteJWKSet } from 'jose'

export interface GoogleIdTokenPayload {
  email: string
  email_verified: boolean
  name: string
  picture: string
}

const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleIdTokenPayload> {
  const { payload } = await jwtVerify<GoogleIdTokenPayload>(idToken, JWKS, {
    issuer: 'https://accounts.google.com',
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  return payload
}
