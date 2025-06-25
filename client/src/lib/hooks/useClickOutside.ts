import { useEffect } from 'react'

import { closeMenu } from '../../store/slices/menuSlice'
import useAppDispatch from '../../store/hooks/useDispach'
import useAppSelector from '../../store/hooks/useSelector'

/**
 * Attach a click-outside and resize listener when `menu.categoryOpen` is true,
 * and dispatch `closeMenu()` whenever the user clicks outside the given container
 * or resizes the window.
 */
export function useClickOutside(containerRef: React.RefObject<HTMLDivElement | null>): void {
  const dispatch = useAppDispatch()
  const categoryOpen = useAppSelector((s) => s.menu.categoryOpen)

  useEffect(() => {
    if (!categoryOpen) {
      return
    }

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        dispatch(closeMenu())
      }
    }

    const handleResize = () => {
      dispatch(closeMenu())
    }

    // It’s usually better to listen on mousedown or pointerdown
    document.addEventListener('mousedown', handleClick)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [categoryOpen, dispatch, containerRef])
}
