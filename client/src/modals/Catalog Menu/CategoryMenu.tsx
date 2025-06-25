import React, { useRef, useState } from 'react'
import { useClickOutside } from '../../lib/hooks/useClickOutside'
import style from './catalog.module.scss'
import classNames from 'classnames'
import CatalogListDesktop from './CatalogList/Catalog List Desktop/CatalogListDesktop'
import CatalogSubCategory from './Catalog SubCategory/CatalogSubCategory'
import { useNavigate } from 'react-router-dom'
export const CategoryMenu = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [subCategoryOpen, setSubCategoryOpen] = useState(false)
  const [selectedSlug, setSelectedSlug] = useState('')
  const navigate = useNavigate()
  //Click outside handler
  useClickOutside(containerRef)

  const onSelectDesktop = (slug: string) => {
    setSubCategoryOpen((prev) => !prev)
    setSelectedSlug(slug)
    navigate(`/catalog/${slug}`)
  }

  return (
    <div className={style.wrapperCategory}>
      <div className="container" ref={containerRef}>
        <div className="row">
          {/* Left pane: always show top-level list */}
          <div className="col-12 col-lg-4">
            <CatalogListDesktop onSelectDesktop={onSelectDesktop} />
          </div>

          {/* Right pane: desktop only */}
          <div className={classNames('col-12 col-lg-8 p-10x', style.desktopSubcat)}>
            {subCategoryOpen && <CatalogSubCategory slug={selectedSlug} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu
