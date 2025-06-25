import { useEffect } from 'react'
import useAppDispatch from '../../store/hooks/useDispach'
import { closeMenu } from '../../store/slices/menuSlice'

export function useCloseWindowResize() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const onResize = () => dispatch(closeMenu())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [dispatch])
}
