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
      const { id, role, email, phone, name, dateBirth } = data.user

      dispatch(
        fetchUserSuccess({
          userId: id.toString(),
          userRole: role,
          userName: name ?? null,
          userEmail: email ?? null,
          userPhone: phone ?? null,
          userBirthDate: dateBirth ?? null,
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
