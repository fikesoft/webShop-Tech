// lib/hooks/useRegisterUser.ts
import { useState } from 'react'
import { trpc } from '../trpc'
import { ResponseError } from '../types'

export const useRegisterUser = () => {
  // Now an object keyed by field name, or null if no errors
  const [errorMessages, setErrorMessages] = useState<ResponseError | null>(null)

  const mutation = trpc.users.registerUser.useMutation({
    onSuccess: () => {
      setErrorMessages(null)
    },
    onError: (err) => {
      const fieldErrors = (err.data?.zodError?.fieldErrors ?? {}) as ResponseError
      setErrorMessages(fieldErrors)
    },
  })

  const register = (email: string, password: string, confirmPassword: string) => {
    mutation.mutate({ email, password, confirmPassword })
  }

  return {
    register,
    isLoading: mutation.status === 'pending',
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    error: mutation.error,
    errorMessages,
  }
}
