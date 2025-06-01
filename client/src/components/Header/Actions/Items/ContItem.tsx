import React, { useEffect /*useState*/ } from 'react'
import style from '../actions.module.scss'
import useAppDispatch from '../../../../store/hooks/useDispach'
import useAppSelector from '../../../../store/hooks/useSelector'
import classNames from 'classnames'
import IconUser from '../../../../assets/img/Icon-User.svg?react'
import { openMenu } from '../../../../store/slices/menuSlice'
//import MenuUserActions from '../../../../modals/Menu User Modal/MenuUserActions'
import { useUser } from '../../../../lib/hooks/useUser'
import { fetchUserFail, fetchUserStart, fetchUserSuccess } from '../../../../store/slices/userSlice'
import { CircularProgress } from '../../../CircularProgress/CircularProgress'
import { useNavigate } from 'react-router-dom'
const ContItem: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isAuth, userId, userName } = useAppSelector((state) => state.user)
  const { data, isSuccess, isLoading, isError } = useUser()
  //When th component mounts start the loading of data
  useEffect(() => {
    dispatch(fetchUserStart())
  }, [dispatch])

  useEffect(() => {
    if (isSuccess && data?.user) {
      const { id, role, email, phone, name, dateBirth } = data.user

      dispatch(
        fetchUserSuccess({
          userId: id.toString(),
          userRole: role,
          userName: name ?? null,
          userEmail: email ?? null,
          userPhone: phone ?? null,
          userBirthDate: dateBirth ?? null,
        })
      )
    } else if (isError) {
      dispatch(fetchUserFail())
    }
  }, [isSuccess, isError, data, dispatch])

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
      navigate('cont-personal')
    }
  }

  return (
    <li className={classNames(style.menuItem)} onClick={toggleAuthMenu} style={{ position: 'relative' }}>
      {isLoading ? (
        <CircularProgress size={20} thickness={2} />
      ) : (
        <>
          <IconUser />
          <p>{isAuth ? `Hi ${userName ?? userId}` : 'Cont'}</p>
        </>
      )}
    </li>
  )
}

export default ContItem
