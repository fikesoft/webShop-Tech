// GoogleBtn.tsx
import { useState } from 'react'
import IconGoogle from '../../../assets/img/Google.svg?react'
import { useGoogleAuthUser } from '../../../lib/hooks/useGoogleAuthUser'

export default function GoogleBtn() {
  const [tried, setTried] = useState(false)
  const { isLoading, isError, refetch } = useGoogleAuthUser()

  const handleClick = async () => {
    setTried(true)
    const res = await refetch()
    if (res.data) {
      window.location.href = res.data
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="d-flex a-i-center j-c-center gap-16x b-1x-solid-primary b-r-50x"
      style={{ padding: '14px 0', cursor: 'pointer' }}
    >
      <IconGoogle />
      {isLoading ? <p>Vă redirecționăm…</p> : <p>Autorizare cu Google</p>}
      {isError && tried && <p>Vă rugăm încercați din nou</p>}
    </button>
  )
}
