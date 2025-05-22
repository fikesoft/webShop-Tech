import { trpc } from '../trpc'
import useAppDispatch from '../../store/hooks/useDispach'
import { logout } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

export const useLogOutUser = () => {
  const distpach = useAppDispatch()
  const navigate = useNavigate()
  const mutation = trpc.users.logoutUser.useMutation({
    onSuccess: () => {
      navigate('/')
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
