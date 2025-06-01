import { trpc } from '../trpc'
import useAppDispatch from '../../store/hooks/useDispach'
import { logout } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { openMenu } from '../../store/slices/menuSlice'

export const useLogOutUser = () => {
  const distpach = useAppDispatch()
  const navigate = useNavigate()
  const mutation = trpc.users.logoutUser.useMutation({
    onSuccess: () => {
      navigate('/')
      distpach(logout())
    },
    onError: (err) => {
      // 1) Navigate back to home
      navigate('/', { replace: true })

      // 2) Show your error modal
      distpach(
        openMenu({
          modalType: 'exit',
          title: 'Deconectare',
          headerDisplay: true,
          fullWindow: false,
          cancelText: 'Nu, rămân conectat',
          confirmText: 'Da, deconectează-mă',
          data: {
            errorMessage: err.message || 'A apărut o eroare necunoscută.',
          },
        })
      )

      // 3) After 3 seconds, reload the page one time
      setTimeout(() => {
        window.location.reload()
      }, 2000)
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
