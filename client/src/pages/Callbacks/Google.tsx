import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleAuthCallback } from '../../lib/hooks/useGoogleAuthCallback'
import { CircularProgress } from '../../components/CircularProgress/CircularProgress'
import useAppDispatch from '../../store/hooks/useDispach'
import { openMenu } from '../../store/slices/menuSlice'
const Google = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { googleCallback } = useGoogleAuthCallback()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const error = params.get('error')
    const errorDesc = params.get('error_description')

    if (code) {
      googleCallback(code)
    } else if (error) {
      //Better the typeing of the error could be imporved
      console.error('OAuth error:', error, errorDesc)
      dispatch(
        openMenu({
          modalType: 'googleError',
          title: error,
          headerDisplay: true,
          //cancelText: 'Confirm',
          data: {
            errorMessage: error || 'A apărut o eroare necunoscută.',
          },
        })
      )
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="d-flex j-c-center a-i-center" style={{ flexDirection: 'column' }}>
      <CircularProgress size={64} thickness={4} />
      <h1 className="h1">Signing you in with Google…</h1>
    </div>
  )
}

export default Google
