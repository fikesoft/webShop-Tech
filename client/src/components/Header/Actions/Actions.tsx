import IconUser from '../../../assets/img/Icon-User.svg?react'
import IconCompare from '../../../assets/img/Icon-Compare.svg?react'
import IconHeart from '../../../assets/img/Icon-Heart.svg?react'
import IconCart from '../../../assets/img/Icon-Cart.svg?react'
import IconCategory from '../../../assets/img/Icon-Category.svg?react'
import style from './actions.module.scss'
import classNames from 'classnames'
const Actions = () => {
  return (
    <ul className={classNames(style.menuActions, 'text-center caption fw-medium b-r-15x')}>
      {/* Mobile-only item (hidden on desktop) */}
      <li className={classNames('d-lg-none', style.menuItem)}>
        <IconCategory />
        <p>Catalog</p>
      </li>

      {/* Regular menu items */}
      <li className={classNames(style.menuItem)}>
        <IconUser />
        <p>Cont</p>
      </li>
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
