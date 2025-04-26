import React from 'react'
import IconCategory from '../../../assets/img/Icon-Category.svg?react'
import classNames from 'classnames'
import style from './actions.module.scss'
const CatalogItem = () => {
  return (
    <li className={classNames('d-lg-none', style.menuItem)}>
      <IconCategory />
      <p>Catalog</p>
    </li>
  )
}

export default CatalogItem
