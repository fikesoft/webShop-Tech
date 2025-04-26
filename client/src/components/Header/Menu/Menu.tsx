import style from './menu.module.scss'
import classNames from 'classnames'
import IconClose from '../../../assets/img/Icon-Close.svg?react'
import Nav from '../Nav/Nav'
import useAppDispatch from '../../../store/hooks/useDispach'
import { toggleMenu } from '../../../store/slices/menuSlice'

const Menu = () => {
  const dispatch = useAppDispatch()

  const handleToggleMenu = () => {
    dispatch(toggleMenu())
    document.body.classList.toggle('overflow-hidden')
  }

  return (
    <div className={classNames(style.menuContainer, style.menuContainerOpen)}>
      <div className={classNames(style.headerMenu, 'd-flex j-c-between a-i-center')}>
        <h4>Menu</h4>
        <button className={style.closeMenu}>
          <IconClose
            className={style.icon}
            onClick={handleToggleMenu} // Close the menu
          />
        </button>
      </div>

      <div className={style.menuContent}>
        <Nav />
      </div>
    </div>
  )
}

export default Menu
