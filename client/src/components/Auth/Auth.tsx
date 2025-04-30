import React, { useState, useEffect, useCallback } from 'react'
import IconClose from '../../assets/img/Icon-Close.svg?react'
import style from './auth.module.scss'
import classNames from 'classnames'
import IconFacebook from '../../assets/img/Facebook.svg?react'
import IconGoogle from '../../assets/img/Google.svg?react'
import useAppSelector from '../../store/hooks/useSelector'
import useAppDispatch from '../../store/hooks/useDispach'
import { toggleMenuLogin } from '../../store/slices/menuSlice'
import { useRegisterUser } from '../../lib/hooks/useRegisterUser'
import { CircularProgress } from '../CircularProgress/CircularProgress'
import IconTick from '../../assets/img/Icon-Tick.svg?react'
//MAIN ERROR WHEN THE LOGIN SUCCESED THEN THE GREEN DOES NOT RESET
//Do better the reset
const Auth: React.FC = () => {
  const dispatch = useAppDispatch()
  const { menuOpenLogin } = useAppSelector((s) => s.menu)

  // form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [selected, setSelected] = useState<'login' | 'register'>('login')

  const { register, isError, isLoading, isSuccess, errorMessages } = useRegisterUser()

  // reset all form fields and selection
  const resetForm = useCallback(() => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRemember(false)
    setSelected('login')
  }, [])

  // on success: wait 1s, then close menu & reset form
  useEffect(() => {
    if (isSuccess) {
      const t = setTimeout(() => {
        dispatch(toggleMenuLogin())
        resetForm()
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [isSuccess, dispatch, resetForm])

  const handleSubmit = () => {
    if (selected === 'register') {
      register(email, password, confirmPassword)
    }
    else {
      // TODO: add login logic here
    }
    // form will be reset by the effects, not here
  }

  return (
    <div className={classNames(style.wrapperAuth, menuOpenLogin ? 'd-flex' : 'd-none')}>
      <div className={style.wrapperContainer}>
        <div className="row j-c-between a-i-center gap-16x p-20x">
          <h4 className={style.title}>Autorizare</h4>
          <button type="button" className={style.closeMenu} onClick={() => dispatch(toggleMenuLogin())}>
            <IconClose />
          </button>
        </div>

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

          {/* Email */}
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
            {errorMessages?.email?.map((msg, i) => (
              <p key={i} className="text-red-normal paragraph-small">
                {msg}
              </p>
            ))}
          </div>

          {/* Password */}
          <div className={style.authInput}>
            <label htmlFor="password">
              Parola <span className="text-red-normal">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Introdu parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessages?.password?.map((msg, i) => (
              <p key={i} className="text-red-normal paragraph-small">
                {msg}
              </p>
            ))}
          </div>

          {/* Confirm password (only on register) */}
          {selected === 'register' && (
            <div className={style.authInput}>
              <label htmlFor="confirmPassword">
                Repetă parola <span className="text-red-normal">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repetă parola"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessages?.confirmPassword?.map((msg, i) => (
                <p key={i} className="text-red-normal paragraph-small">
                  {msg}
                </p>
              ))}
            </div>
          )}

          {/* Remember checkbox (only on login) */}
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

          <button
            className="d-flex a-i-center j-c-center gap-16x b-1x-solid-primary b-r-50x"
            style={{ padding: '14px 0' }}
          >
            <IconFacebook /> Autorizare cu Facebook
          </button>
          <button
            className="d-flex a-i-center j-c-center gap-16x b-1x-solid-primary b-r-50x"
            style={{ padding: '14px 0' }}
          >
            <IconGoogle /> Autorizare cu Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
