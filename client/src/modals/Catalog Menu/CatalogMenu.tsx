import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import style from './catalog.module.scss'
import CatalogList from './Catalog List/CatalogList'
import CatalogSubCategory from './Catalog SubCategory/CatalogSubCategory'
import { closeMenu } from '../../store/slices/menuSlice'
import useAppSelector from '../../store/hooks/useSelector'
import useAppDispatch from '../../store/hooks/useDispach'

export const CatalogMenu: React.FC = () => {
  const dispatch = useAppDispatch()
  const categoryOpen = useAppSelector((s) => s.menu.categoryOpen)
  const containerRef = useRef<HTMLDivElement>(null)

  // ① Which slug/name is selected (desktop only)
  const [selectedSlug, setSelectedSlug] = useState<string>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedName, setSelectedName] = useState<string>('')

  const handleSelect = (slug: string, name: string) => {
    setSelectedSlug(slug)
    setSelectedName(name)
  }

  // click-outside & resize to close dropdown
  useEffect(() => {
    if (!categoryOpen) {
      return
    }
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        dispatch(closeMenu())
      }
    }
    const onResize = () => dispatch(closeMenu())

    const timerId = setTimeout(() => {
      document.addEventListener('click', onClickOutside)
      window.addEventListener('resize', onResize)
    }, 0)
    return () => {
      clearTimeout(timerId)
      document.removeEventListener('click', onClickOutside)
      window.removeEventListener('resize', onResize)
    }
  }, [categoryOpen, dispatch])

  return (
    <div className={style.wrapperCategory}>
      <div className="container" ref={containerRef}>
        <div className="row">
          {/* Left pane: always show top-level list */}
          <div className="col-12 col-lg-4">
            <CatalogList onSelect={handleSelect} />
          </div>

          {/* Right pane: desktop only */}
          <div className={classNames('col-12 col-lg-8 p-10x', style.desktopSubcat)}>
            {selectedSlug && <CatalogSubCategory slug={selectedSlug} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogMenu
