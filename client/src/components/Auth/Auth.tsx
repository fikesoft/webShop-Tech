import React, { useState } from 'react'
import IconClose from '../../assets/img/Icon-Close.svg?react'
import style from './auth.module.scss'
import classNames from 'classnames'
import IconFacebook from '../../assets/img/Facebook.svg?react'
import IconGoogle from '../../assets/img/Google.svg?react'
import useAppSelector from '../../store/hooks/useSelector'
import useAppDispatch from '../../store/hooks/useDispach'
import { toggleMenuLogin } from '../../store/slices/menuSlice'
const Auth = () => {
  const [selected, setSelected] = useState<'login' | 'register'>('login')
  const { menuOpenLogin } = useAppSelector((state) => state.menu)
  const disptach = useAppDispatch()
  const toggleAuthMenu = () => {
    disptach(toggleMenuLogin())
  }
  return (
    <div className={classNames(style.wrapperAuth, menuOpenLogin ? 'd-flex' : 'd-none')}>
      <div className={style.wrapperContainer}>
        <div className="row j-c-between a-i-center gap-16x p-20x">
          <h4 className={style.title}>Autorizare</h4>
          <button
            type="button"
            className={style.closeMenu}
            onClick={() => {
              toggleAuthMenu()
            }}
          >
            <IconClose />
          </button>
        </div>

        <div className={classNames(style.containerAuth)}>
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

          <div className={style.authInput}>
            <label htmlFor="email">
              Email <span className="text-red-normal">*</span>
            </label>
            <input id="email" type="email" placeholder="Introdu adresa ta de email" />
          </div>
          <div className={style.authInput}>
            <label htmlFor="email">
              Parola <span className="text-red-normal">*</span>
            </label>
            <input id="email" type="email" placeholder="Introdu adresa ta de email" />
          </div>

          {selected === 'register' && (
            <div className={style.authInput}>
              <label htmlFor="confirmPassword">
                Repetă parola <span className="text-red-normal">*</span>
              </label>
              <input id="confirmPassword" type="password" placeholder="Repetă parola" />
            </div>
          )}

          {selected === 'login' && (
            <label>
              <input type="checkbox"></input>
              Ține minte
            </label>
          )}

          <button className={classNames(style.buttonAuth, 'bg-blue-normal')}>
            {selected === 'login' ? 'Intră în cont' : 'Creează un cont nou'}
          </button>
          <div className={classNames(style.gapLine)}>
            <p>Autentificare prin alte metode</p>
          </div>
          <button
            className="d-flex a-i-center j-c-center gap-16x b-1x-solid-primary b-r-50x"
            style={{ padding: '14px 0px ' }}
          >
            <IconFacebook />
            Autorizare cu Facebook
          </button>
          <button
            className="d-flex a-i-center j-c-center gap-16x b-1x-solid-primary b-r-50x"
            style={{ padding: '14px 0px ' }}
          >
            <IconGoogle />
            Autorizare cu Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
