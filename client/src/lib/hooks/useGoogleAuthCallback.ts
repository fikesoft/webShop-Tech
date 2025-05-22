import { useNavigate } from 'react-router-dom'
import { trpc } from '../trpc'
import { fetchUserSuccess } from '../../store/slices/userSlice'
import useAppDispatch from '../../store/hooks/useDispach'
import { openMenu } from '../../store/slices/menuSlice'

export function useGoogleAuthCallback() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const mutation = trpc.google.googleAuthCallback.useMutation({
    onSuccess: (data) => {
      navigate('/')
      dispatch(
        fetchUserSuccess({
          userId: data.user.id.toString(),
          userRole: data.user.role,
          userName: data.user.name || null,
        })
      )
    },
    onError: (err) => {
      dispatch(
        openMenu({
          modalType: 'googleError',
          title: 'Eroare la autentificare',
          headerDisplay: true,
          //cancelText: 'Confirm',
          data: {
            errorMessage: err.message || 'A apărut o eroare necunoscută.',
          },
        })
      )
      navigate('/')
    },
  })
  function googleCallback(code: string) {
    mutation.mutate({ code })
  }
  return {
    googleCallback,
  }
}
