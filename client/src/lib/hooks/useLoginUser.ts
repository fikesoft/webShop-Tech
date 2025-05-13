import { useState } from 'react'
import { trpc } from '../trpc'
import { ResponseError } from '../types'
import useAppDispatch from '../../store/hooks/useDispach'
import { login as loginUser } from '../../store/slices/userSlice'
export const useLoginUser = () => {
  const [errorMessages, setErrorMessages] = useState<ResponseError | null>(null)
  const [logicError, setLogicError] = useState('')
  const dispatch = useAppDispatch()
  const mutation = trpc.users.loginUser.useMutation({
    onSuccess: (data) => {
      dispatch(
        loginUser({
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

  const login = (email: string, password: string) => {
    mutation.mutate({ email, password })
    return mutation.data?.user
  }

  return {
    login,
    isLoading: mutation.status === 'pending',
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    errorMessages,
    logicError,
    reset: mutation.reset,
  }
}
