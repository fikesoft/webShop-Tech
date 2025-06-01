import { trpc } from '../trpc'

export const useSaveUser = () => {
  const mutation = trpc.users.saveProfile.useMutation()

  // expose the promise-based version
  const saveUserAsync = (data: {
    userName?: string
    userPhone?: string
    userEmail?: string
    userBirthDate?: string
  }) => {
    // returns a promise that resolves with the mutation’s data,
    // or rejects with a TRPCClientError
    return mutation.mutateAsync(data)
  }

  return {
    saveUserAsync,
    isLoading: mutation.status === 'pending',
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}
