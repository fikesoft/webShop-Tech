import React, { useEffect } from 'react'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppDispatch from '../../store/hooks/useDispach'
import useAppSelector from '../../store/hooks/useSelector'
import { openMenu } from '../../store/slices/menuSlice'
import { CircularProgress } from '../CircularProgress/CircularProgress'

interface ProtectedRouteProps {
  /** If `true`, user must simply be authenticated */
  requireAuth?: boolean

  /** If set, only users whose `role` matches one of these may proceed */
  allowedRoles?: Array<string>

  /** The component (or layout) to render if allowed */
  children: ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth = false, allowedRoles, children }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuth, userRole, isLoadingData } = useAppSelector((s) => s.user)

  const notLoggedIn = requireAuth && !isAuth
  const wrongRole = allowedRoles !== undefined && (userRole == null || !allowedRoles.includes(userRole))

  // 1) Fire auth-modal+redirect when needed
  useEffect(() => {
    if (notLoggedIn && !isLoadingData) {
      navigate('/', { replace: true })
      dispatch(
        openMenu({
          modalType: 'auth',
          title: 'Autorizare',
          headerDisplay: true,
        })
      )
    }
  }, [notLoggedIn, navigate, dispatch, isLoadingData])
  //React Hook useEffect has a missing dependency: 'isLoadingData'

  // 2) Fire wrong-role modal+redirect when needed
  useEffect(() => {
    if (!notLoggedIn && wrongRole) {
      navigate('/', { replace: true })
      console.info('Fire wrong-role modal+redirect when needed')

      dispatch(
        openMenu({
          modalType: 'wrongRole',
          title: 'Acces refuzat',
          headerDisplay: true,
        })
      )
    }
  }, [wrongRole, notLoggedIn, navigate, dispatch])

  // 3) Loading state: show spinner while we’re fetching “who am I?”
  if (isLoadingData) {
    return <CircularProgress size={40} thickness={4} />
  }

  // 4) Block render while either guard is active
  if (notLoggedIn || wrongRole) {
    return null
  }

  // 5) All good → render the protected content
  return children
}

export default ProtectedRoute
