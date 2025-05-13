import { useState } from 'react'
import { trpc } from '../trpc'
import { ResponseError } from '../types'
import { login } from '../../store/slices/userSlice'
import useAppDispatch from '../../store/hooks/useDispach'
export const useRegisterUser = () => {
  const [errorMessages, setErrorMessages] = useState<ResponseError | null>(null)
  const [logicError, setLogicError] = useState('')
  const dispatch = useAppDispatch()
  const mutation = trpc.users.registerUser.useMutation({
    onSuccess: (data) => {
      dispatch(
        login({
          userId: data.user.id.toString(),
          userRole: data.user.role,
        })
      )
    },
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
    return mutation.data?.user
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
