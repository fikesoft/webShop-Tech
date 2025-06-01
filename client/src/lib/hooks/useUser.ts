import { useEffect } from 'react'
import { trpc } from '../trpc'

export const useUser = () => {
  const mutation = trpc.users.user.useMutation({
    onSuccess: () => {
      console.info('User founded')
    },
    onError: (error) => {
      console.info(error)
    },
  })

  useEffect(() => {
    mutation.mutate()
  }, [])

  return {
    data: mutation.data,
    isLoading: mutation.status === 'pending',
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}
