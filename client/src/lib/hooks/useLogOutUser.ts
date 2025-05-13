import { trpc } from '../trpc'
import useAppDispatch from '../../store/hooks/useDispach'
import { logout } from '../../store/slices/userSlice'

export const useLogOutUser = () => {
  const distpach = useAppDispatch()
  const mutation = trpc.users.logoutUser.useMutation({
    onSuccess: () => {
      distpach(logout())
    },
    onError: (err) => {
      console.error(err)
    },
  })
  const logoutUser = () => {
    mutation.mutate()
  }
  return {
    logoutUser,
    isLoading: mutation.status === 'pending',
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}
