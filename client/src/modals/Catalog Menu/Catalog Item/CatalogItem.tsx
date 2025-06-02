import classNames from 'classnames'
import React from 'react'
import style from './catalogItem.module.scss'

interface CategoryItemI {
  categoryName: string
  categoryIconFile: string
}

const CatalogItem: React.FC<CategoryItemI> = ({ categoryName, categoryIconFile }) => {
  console.log(`url(../../../assets/img/${categoryIconFile})`)
  return (
    <li
      className={classNames(style.catalogItem, 'paragraph-small')}
      style={
        {
          '--icon-url': `url(/icons/${categoryIconFile})`,
        } as React.CSSProperties
      }
    >
      {categoryName}
    </li>
  )
}

export default CatalogItem
