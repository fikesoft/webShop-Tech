import { useState } from 'react'
import { trpc } from '../trpc'
import { ResponseError } from '../types'

export const useRegisterUser = () => {
  // Now an object keyed by field name, or null if no errors
  const [errorMessages, setErrorMessages] = useState<ResponseError | null>(null)
  const [logicError, setLogicError] = useState('')

  const mutation = trpc.users.registerUser.useMutation({
    onMutate: () => {
      setErrorMessages(null)
      setLogicError('')
    },
    onError: (err) => {
      const z = err.data?.zodError?.fieldErrors
      if (z != null && Object.keys(z).length > 0) {
        setErrorMessages(z as ResponseError)
      } else {
        setLogicError(err.message)
      }
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
    logicError,
    reset: mutation.reset,
  }
}
