// src/components/Catalog/Catalog.tsx

import React, { useEffect, useRef } from 'react'
import style from './catalog.module.scss'
import CatalogList from './Catalog List/CatalogList'
import { closeMenu } from '../../store/slices/menuSlice'
import useAppSelector from '../../store/hooks/useSelector'
import useAppDispatch from '../../store/hooks/useDispach'

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch()
  const categoryOpen = useAppSelector((state) => state.menu.categoryOpen)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!categoryOpen) {
      return
    }

    // ① Al pulsar cualquier parte del documento: si el clic NO ocurrió dentro del contenedor,
    //    cerramos el menú.
    const handleClickOutside = (evt: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(evt.target as Node)) {
        dispatch(closeMenu())
      }
    }

    // ② Al hacer scroll dentro del contenedor (por ejemplo, si la lista es muy larga):
    //    cerramos el menú.
    const handleScrollInside = () => {
      dispatch(closeMenu())
    }

    // ③ Al hacer scroll en la ventana (window scroll), cerramos el menú.
    const handleScrollWindow = () => {
      dispatch(closeMenu())
    }

    // ④ Al redimensionar la ventana, cerramos el menú.
    const handleResize = () => {
      dispatch(closeMenu())
    }

    // Para evitar que el mismo clic que abre el menú sea capturado inmediatamente
    // por handleClickOutside, envolvemos la suscripción en setTimeout(..., 0).
    const timerId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)

      // Scroll/Touch dentro del propio contenedor
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', handleScrollInside)
        containerRef.current.addEventListener('touchmove', handleScrollInside)
      }

      // Scroll en la ventana (para que cualquier desplazamiento en la página cierre el menú)
      window.addEventListener('scroll', handleScrollWindow)

      // Resize de la ventana
      window.addEventListener('resize', handleResize)
    }, 0)

    return () => {
      // Limpieza: quitamos el setTimeout y todos los event listeners.
      clearTimeout(timerId)

      document.removeEventListener('click', handleClickOutside)

      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScrollInside)
        containerRef.current.removeEventListener('touchmove', handleScrollInside)
      }

      window.removeEventListener('scroll', handleScrollWindow)
      window.removeEventListener('resize', handleResize)
    }
  }, [categoryOpen, dispatch])

  return (
    <div className={style.wrapperCategory}>
      <div className="container" ref={containerRef}>
        <div className="row">
          <CatalogList />
        </div>
      </div>
    </div>
  )
}

export default Catalog
