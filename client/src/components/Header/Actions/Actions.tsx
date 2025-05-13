import IconCompare from '../../../assets/img/Icon-Compare.svg?react'
import IconHeart from '../../../assets/img/Icon-Heart.svg?react'
import IconCart from '../../../assets/img/Icon-Cart.svg?react'
import style from './actions.module.scss'
import classNames from 'classnames'
import CatalogItem from './Items/CatalogItem'
import ContItem from './Items/ContItem'
const Actions = () => {
  return (
    <ul className={classNames(style.menuActions, 'text-center caption fw-medium b-r-15x')}>
      {/* Mobile-only item (hidden on desktop) */}
      <CatalogItem />
      {/* Regular menu items */}
      <ContItem />

      <li className={classNames(style.menuItem)}>
        <IconCompare />
        <p>Compară</p>
      </li>
      <li className={classNames(style.menuItem)}>
        <IconHeart />
        <p>Favorite</p>
      </li>
      <li className={classNames(style.menuItem)}>
        <IconCart />
        <p>Coș</p>
      </li>
    </ul>
  )
}

export default Actions
