import React, { JSX } from 'react'
import useAppDispatch from '../store/hooks/useDispach'
import useAppSelector from '../store/hooks/useSelector'
import { closeMenu, openMenu } from '../store/slices/menuSlice'
import style from './modalHost.module.scss'
import IconClose from '../assets/img/Icon-Close.svg?react'

// Import modal components
import { Auth, CatalogAside } from '../components'
import Menu from './Menu Modal/Menu'
import SignOut from './SignOut Modal/SignOut'
import classNames from 'classnames'
import { useLogOutUser } from '../lib/hooks/useLogOutUser'
import WrongRole from './Permission Modal/WrongRole'
import GoogleError from './Google Error Modal/GoogleError'
import CatalogListMobile from './Catalog Menu/CatalogList/Catalog List Mobile/CatalogListMobile'
import { useNavigate } from 'react-router-dom'
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
  catalogMobile: ({ slug, onClose, onSelectMobile }) => (
    <CatalogListMobile slug={slug} onClose={onClose} onSelectMobile={onSelectMobile} />
  ),
  filterMobile: () => <CatalogAside />,
}

export function ModalHost() {
  const dispatch = useAppDispatch()
  const { isOpen, payload } = useAppSelector((state) => state.menu)
  const { logoutUser } = useLogOutUser()
  const navigate = useNavigate()
  if (!isOpen || !payload) {
    return null
  }
  const { modalType, title, data = {}, confirmText, cancelText, headerDisplay, fullWindow } = payload

  // Close handler
  const handleClose = () => dispatch(closeMenu())
  // Confirm handler for generic modals
  const handleConfirm = () => {
    switch (payload.modalType) {
      case 'exit':
        logoutUser()
        break
    }
    dispatch(closeMenu())
  }

  const catalogProps = {
    slug: data.slug as string | undefined,
    onClose: handleClose,
    onSelectMobile: (newSlug: string) => {
      if (!data.slug) {
        navigate(`/catalog/${newSlug}`)
        dispatch(
          openMenu({
            modalType: 'catalogMobile',
            title: 'Subcategories',
            headerDisplay: true,
            fullWindow: true,
            data: { slug: newSlug },
          })
        )
      } else {
        navigate(`/catalog/${data.slug}/${newSlug}`)
        dispatch(closeMenu())
      }
    },
  }

  // pick the component factory from the registry
  const Component = modalRegistry[modalType]
  if (!Component) {
    console.warn(`No modal registered for type “${modalType}”`)
    return null
  }

  // render via JSX
  const body =
    modalType === 'catalogMobile' ? <Component {...catalogProps} /> : <Component onClose={handleClose} {...data} />
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
