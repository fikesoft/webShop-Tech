import React, { JSX } from 'react'
import useAppDispatch from '../store/hooks/useDispach'
import useAppSelector from '../store/hooks/useSelector'
import { closeMenu } from '../store/slices/menuSlice'
import style from './modalHost.module.scss'
import IconClose from '../assets/img/Icon-Close.svg?react'

// Import modal components
import { Auth } from '../components'
import Menu from './Menu Modal/Menu'
import SignOut from './SignOut Modal/SignOut'
import classNames from 'classnames'
import { useLogOutUser } from '../lib/hooks/useLogOutUser'
import WrongRole from './Permission Modal/WrongRole'
import GoogleError from './Google Error Modal/GoogleError'
import CatalogList from './Catalog Menu/Catalog List/CatalogList'
// Registry mapping
const modalRegistry: Record<
  string,
  (
    props: Record<string, any> /* eslint-disable-line @typescript-eslint/no-explicit-any*/ & { onClose: () => void }
  ) => JSX.Element
> = {
  auth: ({ onClose }) => <Auth onClose={onClose} />,
  menu: () => <Menu />,
  exit: ({ errorMessage }) => <SignOut erorMessage={errorMessage} />,
  wrongRole: () => <WrongRole />,
  googleError: ({ errorMessage }) => <GoogleError errorMessage={errorMessage} />,
  catalog: () => <CatalogList />,
}

export function ModalHost() {
  const dispatch = useAppDispatch()
  const { isOpen, payload } = useAppSelector((state) => state.menu)
  const { logoutUser } = useLogOutUser()
  if (!isOpen || !payload) {
    return null
  }
  const { modalType, title, data = {}, confirmText, cancelText, headerDisplay, fullWindow } = payload

  // Close handler
  const handleClose = () => dispatch(closeMenu())
  // Confirm handler for generic modals
  const handleConfirm = () => {
    // if (onConfirm) {
    //   onConfirm()
    // }
    switch (payload.modalType) {
      case 'exit':
        logoutUser()
        break
      // other modalTypes…
    }
    dispatch(closeMenu())
  }

  // Lookup component
  const Component = modalRegistry[modalType]
  const body = Component ? Component({ onClose: handleClose, ...data }) : null

  return (
    <div className={style.modalBackdrop}>
      <div className={fullWindow ? style.fullWindow : style.modalWindow}>
        {headerDisplay ? (
          <header className="row j-c-between a-i-center gap-16x p-20x">
            <h4 className="h4 fw-medium">{title}</h4>
            <button type="button" className={style.closeMenu} onClick={handleClose}>
              <IconClose style={{ color: 'white' }} />
            </button>
          </header>
        ) : null}
        <div className={style.modalBody}>{body}</div>
        <footer className={classNames(style.modalFooter, 'paragraph-small')}>
          {cancelText && (
            <button onClick={handleClose} className={style.cancelButton}>
              {cancelText}
            </button>
          )}
          {confirmText && (
            <button onClick={handleConfirm} className={style.confirmButton}>
              {confirmText}
            </button>
          )}
        </footer>
      </div>
    </div>
  )
}

export default ModalHost
