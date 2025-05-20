// lib/hooks/useGoogleAuthUser.ts
import { trpc } from '../trpc'

export function useGoogleAuthUser() {
  return trpc.google.googleAuthUrl.useQuery(undefined, {
    enabled: false,
  })
}
