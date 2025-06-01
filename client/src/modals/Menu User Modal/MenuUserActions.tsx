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
import { NavLink } from 'react-router-dom'
//import { useLogOutUser } from '../../lib/hooks/useLogOutUser'
const MenuUserActions = () => {
  const dispatch = useAppDispatch()
  const { userId, userName } = useAppSelector((state) => state.user)
  //const { logoutUser } = useLogOutUser()
  return (
    <div className={classNames(style.menuUser, 'paragraph-small')}>
      <div className={classNames(style.menuUserInner, 'd-flex')}>
        <h6 className="h6 fw-medium">
          Salut {userName !== null ? null : 'user'} {userName !== null ? userName : userId}
        </h6>
        <ul className={classNames(style.list)}>
          <li>
            <NavLink
              to="/cont-personal"
              end
              className={({ isActive }) => classNames(style.listItem, isActive && style.active)}
            >
              <IconOrder />
              Comenzile tale
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cont-personal/date-personale"
              end
              className={({ isActive }) => classNames(style.listItem, isActive && style.active)}
            >
              <IconUser />
              Date personale
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cont-personal/securitate"
              end
              className={({ isActive }) => classNames(style.listItem, isActive && style.active)}
            >
              <IconScurity />
              Securitate
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cont-personal/news-seller"
              end
              className={({ isActive }) => classNames(style.listItem, isActive && style.active)}
            >
              <IconSeller />
              Newsletter
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="p-10x-40x">
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
              })
            )
          }}
        >
          <IconExit /> Ieși din cont
        </button>
      </div>
    </div>
  )
}

export default MenuUserActions
