import { trpc } from '../trpc'

export const useChangeUserPassword = () => {
  const mutation = trpc.users.changePassword.useMutation()

  const changePassword = async (data: { password: string; newPassword: string; repeatNewPassword: string }) => {
    mutation.mutateAsync(data)
  }
  return {
    changePassword,
    isLoading: mutation.status === 'pending',
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}
