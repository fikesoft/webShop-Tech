import IconUser from '../../../assets/img/Icon-User.svg?react'
import IconCompare from '../../../assets/img/Icon-Compare.svg?react'
import IconHeart from '../../../assets/img/Icon-Heart.svg?react'
import IconCart from '../../../assets/img/Icon-Cart.svg?react'
import style from './actions.module.scss'
import classNames from 'classnames'
import CatalogItem from './CatalogItem'
import useAppDispatch from '../../../store/hooks/useDispach'
import { toggleMenuLogin } from '../../../store/slices/menuSlice'
const Actions = () => {
  const dispatch = useAppDispatch()
  const toggleAuthMenu = () => {
    dispatch(toggleMenuLogin())
  }
  return (
    <ul className={classNames(style.menuActions, 'text-center caption fw-medium b-r-15x')}>
      {/* Mobile-only item (hidden on desktop) */}
      <CatalogItem />
      {/* Regular menu items */}
      <li className={classNames(style.menuItem)} onClick={toggleAuthMenu}>
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
