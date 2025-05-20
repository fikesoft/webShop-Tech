import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleAuthCallback } from '../../lib/hooks/useGoogleAuthCallback'
const Google = () => {
  const navigate = useNavigate()
  const { googleCallback } = useGoogleAuthCallback()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const error = params.get('error')
    const errorDesc = params.get('error_description')

    if (code) {
      console.log('Auth code:', code)
      googleCallback(code)
    } else if (error) {
      //Better the typeing of the error could be imporved
      console.error('OAuth error:', error, errorDesc)
      // you might show a user-friendly message here,
      // or navigate back home with an alert, etc.
    }
  }, [navigate])

  return <div>Signing you in with Google…</div>
}

export default Google
