import React, { useEffect, useState } from 'react'
import style from '../actions.module.scss'
import useAppDispatch from '../../../../store/hooks/useDispach'
import useAppSelector from '../../../../store/hooks/useSelector'
import classNames from 'classnames'
import IconUser from '../../../../assets/img/Icon-User.svg?react'
import { openMenu } from '../../../../store/slices/menuSlice'
import MenuUserActions from '../../../../modals/Menu User Modal/MenuUserActions'
import { useUser } from '../../../../lib/hooks/useUser'
import { login } from '../../../../store/slices/userSlice'
import { CircularProgress } from '../../../CircularProgress/CircularProgress'
const ContItem: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth, userId, userName } = useAppSelector((state) => state.user)
  const [menuUserActions, setMenuUserActions] = useState(false)
  const { data, isSuccess, isLoading } = useUser()
  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(
        login({
          userId: data.user.id.toString(),
          userRole: data.user.role,
        })
      )
    }
  }, [isSuccess, data, dispatch])

  const toggleAuthMenu = () => {
    if (!isAuth) {
      dispatch(
        openMenu({
          modalType: 'auth',
          title: 'Autorizare',
          headerDisplay: true,
        })
      )
    } else {
      setMenuUserActions((prev) => !prev)
    }
  }

  return (
    <li className={classNames(style.menuItem)} onClick={toggleAuthMenu} style={{ position: 'relative' }}>
      {isLoading ? (
        <CircularProgress size={20} thickness={2} />
      ) : (
        <>
          <IconUser />
          {isAuth ? (
            <p>
              Hi {userName !== null ? null : 'user'} {userName !== null ? userName : userId}
            </p>
          ) : (
            <p>Cont</p>
          )}
          {menuUserActions && <MenuUserActions />}
        </>
      )}
    </li>
  )
}

export default ContItem
