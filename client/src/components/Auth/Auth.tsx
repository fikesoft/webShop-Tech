import React, { useState, useEffect, useCallback } from 'react'
import style from './auth.module.scss'
import classNames from 'classnames'
import IconFacebook from '../../assets/img/Facebook.svg?react'
import { useRegisterUser } from '../../lib/hooks/useRegisterUser'
import { useLoginUser } from '../../lib/hooks/useLoginUser'
import { CircularProgress } from '../CircularProgress/CircularProgress'
import IconTick from '../../assets/img/Icon-Tick.svg?react'
import GoogleBtn from './Google Button/GoogleBtn'
interface AuthProps {
  /** Called when auth flow completes or modal should close */
  onClose: () => void
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
  // form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [selected, setSelected] = useState<'login' | 'register'>('login')

  // register hook
  const {
    register,
    isLoading: regLoading,
    isError: regError,
    isSuccess: regSuccess,
    errorMessages: regFieldErrors,
    logicError: regLogicError,
    reset: resetRegister,
  } = useRegisterUser()

  // login hook
  const {
    login,
    isLoading: loginLoading,
    isError: loginError,
    isSuccess: loginSuccess,
    errorMessages: loginFieldErrors,
    logicError: logLogicError,
    reset: resetLogin,
  } = useLoginUser()

  // reset form fields + selection
  const resetForm = useCallback(() => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRemember(false)
    setSelected('login')
  }, [])

  // when either succeeds, notify parent to close and reset
  useEffect(() => {
    if (loginSuccess || regSuccess) {
      const t = setTimeout(() => {
        onClose()
        resetForm()
        resetLogin()
        resetRegister()
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [loginSuccess, regSuccess, onClose, resetForm, resetLogin, resetRegister])

  const handleSubmit = () => {
    if (selected === 'login') {
      login(email, password)
    } else {
      register(email, password, confirmPassword)
    }
  }

  const isLoading = selected === 'login' ? loginLoading : regLoading
  const isError = selected === 'login' ? loginError : regError
  const isSuccess = selected === 'login' ? loginSuccess : regSuccess
  const fieldErrors = selected === 'login' ? loginFieldErrors : regFieldErrors
  const topError = selected === 'login' ? logLogicError : regLogicError

  return (
    <div className={style.containerAuth}>
      {/* Tab switch */}
      <div className="row gap-16x j-c-start a-i-center paragraph-small fw-medium">
        {(['login', 'register'] as const).map((mode) => (
          <label
            key={mode}
            className={classNames(style.wrapperInput, { [style.active]: selected === mode }, 'col-3')}
            onClick={() => setSelected(mode)}
          >
            {mode === 'login' ? 'Login' : 'Register'}
            <input type="checkbox" checked={selected === mode} readOnly />
          </label>
        ))}
      </div>

      {/* top-level logic error */}
      {topError && <p className="text-red-normal paragraph-small">{topError}</p>}

      {/* Email input */}
      <div className={style.authInput}>
        <label htmlFor="email">
          Email <span className="text-red-normal">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Introdu adresa ta de email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {fieldErrors?.email?.map((msg, i) => (
          <p key={i} className="text-red-normal paragraph-small">
            {msg}
          </p>
        ))}
      </div>

      {/* Password input */}
      <div className={style.authInput}>
        <label htmlFor="password">
          Parola <span className="text-red-normal">*</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Introdu parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {fieldErrors?.password?.map((msg, i) => (
          <p key={i} className="text-red-normal paragraph-small">
            {msg}
          </p>
        ))}
      </div>

      {/* Confirm password (register only) */}
      {selected === 'register' && (
        <div className={style.authInput}>
          <label htmlFor="confirmPassword">
            Repetă parola <span className="text-red-normal">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repetă parola"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {fieldErrors?.confirmPassword?.map((msg, i) => (
            <p key={i} className="text-red-normal paragraph-small">
              {msg}
            </p>
          ))}
        </div>
      )}

      {/* Remember checkbox (login only) */}
      {selected === 'login' && (
        <label>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Ține minte
        </label>
      )}

      {/* Submit button */}
      <button
        className={classNames(
          style.buttonAuth,
          'd-flex a-i-center j-c-center',
          isError ? 'bg-red-normal text-white' : isSuccess ? 'bg-green-normal text-white' : 'bg-blue-normal'
        )}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={20} thickness={2} />
        ) : isSuccess ? (
          <IconTick width={20} height={20} color="white" />
        ) : selected === 'login' ? (
          'Intră în cont'
        ) : (
          'Creează un cont nou'
        )}
      </button>

      <div className={style.gapLine}>
        <p>Autentificare prin alte metode</p>
      </div>

      <button className="d-flex a-i-center j-c-center gap-16x b-1x-solid-primary b-r-50x" style={{ padding: '14px 0' }}>
        <IconFacebook /> Autorizare cu Facebook
      </button>
      <GoogleBtn />
    </div>
  )
}

export default Auth
