import React from 'react'
import style from './catalogItem.module.scss'
import classNames from 'classnames'

interface CatalogItemProps {
  slug: string
  categoryName: string
  categoryIconFile: string
  onSelectDesktop?: (slug: string) => void
  onSelectMobile?: (slug: string) => void
  onClose?: () => void
}
const CatalogItem: React.FC<CatalogItemProps> = ({
  slug,
  categoryIconFile,
  categoryName,
  onSelectDesktop,
  onSelectMobile,
  onClose,
}) => {
  const handleOnClick = () => {
    if (onSelectDesktop) {
      onSelectDesktop(slug)
    } else if (onSelectMobile && onClose) {
      onClose()
      onSelectMobile(slug)
    }
  }

  return (
    <li
      className={classNames(style.catalogItem, 'paragraph-small')}
      onClick={handleOnClick}
      style={
        {
          '--icon-url': `url(/icons/${categoryIconFile})`,
        } as React.CSSProperties
      }
    >
      {categoryName}
      <span className={style.arrow} />
    </li>
  )
}

export default CatalogItem
