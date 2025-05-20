import { useNavigate } from 'react-router-dom'
import { trpc } from '../trpc'
import { login } from '../../store/slices/userSlice'
import useAppDispatch from '../../store/hooks/useDispach'

export function useGoogleAuthCallback() {
  const navigate = useNavigate()
  const dipatch = useAppDispatch()
  const mutation = trpc.google.googleAuthCallback.useMutation({
    onSuccess: (data) => {
      navigate('/')
      dipatch(
        login({
          userId: data.user.id.toString(),
          userRole: data.user.role,
          userName: data.user.name || null,
        })
      )
    },
  })
  function googleCallback(code: string) {
    mutation.mutate({ code })
  }
  return {
    googleCallback,
  }
}
