import React from 'react'
import style from './menuUser.module.scss'
import classNames from 'classnames'
import IconExit from '../../assets/img/Icon-Exit.svg?react'
import IconOrder from '../../assets/img/Icon-Orders.svg?react'
import IconSeller from '../../assets/img/Icon-NewsSeller.svg?react'
import IconScurity from '../../assets/img/Icon-Security.svg?react'
import IconUser from '../../assets/img/Icon-User.svg?react'
import useAppSelector from '../../store/hooks/useSelector'
import useAppDispatch from '../../store/hooks/useDispach'
import { openMenu } from '../../store/slices/menuSlice'
import { useLogOutUser } from '../../lib/hooks/useLogOutUser'
const MenuUserActions = () => {
  const dispatch = useAppDispatch()
  const { userId } = useAppSelector((state) => state.user)
  const { logoutUser } = useLogOutUser()
  return (
    <div className={classNames(style.menuUser, 'paragraph-small')}>
      <div className={classNames(style.menuUserInner, 'd-flex')}>
        <p className="fw-bold">Salut user {userId}</p>
        <ul className={classNames(style.list)}>
          <li>
            <IconOrder />
            Comenzile tale
          </li>
          <li>
            <IconUser />
            Date personale
          </li>
          <li>
            <IconScurity />
            Securitate
          </li>
          <li>
            <IconSeller />
            Newsletter
          </li>
        </ul>
      </div>
      <button
        className="d-flex a-i-center gap-10x"
        onClick={() => {
          dispatch(
            openMenu({
              modalType: 'exit',
              title: 'Deconectare',
              headerDisplay: true,
              fullWindow: false,
              cancelText: 'Nu, rămân conectat',
              confirmText: 'Da, deconectează-mă',
              onConfirm: () => {
                logoutUser()
              },
            })
          )
        }}
      >
        <IconExit /> Ieși din cont
      </button>
    </div>
  )
}

export default MenuUserActions
