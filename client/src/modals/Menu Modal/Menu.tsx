import style from './menu.module.scss'
import classNames from 'classnames'
//import IconClose from '../../../assets/img/Icon-Close.svg?react'
import Nav from '../../components/Header/Nav/Nav'
//import useAppDispatch from '../../../store/hooks/useDispach'
//import { toggleMenu } from '../../../store/slices/menuSlice'

const Menu = () => {
  return (
    <div className={classNames(style.menuContainer, style.menuContainerOpen)}>
      <div className={style.menuContent}>
        <Nav />
      </div>
    </div>
  )
}

export default Menu
