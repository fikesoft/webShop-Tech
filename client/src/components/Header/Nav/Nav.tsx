import Promotion from '../Promotion/Promotion'
import style from './nav.module.scss'
import classNames from 'classnames'
const Nav = () => {
  return (
    <nav className="d-lg-block d-none w-50">
      <ul className={classNames(style.navMenu, 'd-flex gap-24x')}>
        <li>
          <a>Contacte</a>
        </li>
        <li>
          <a>Livrare</a>
        </li>
        <li>
          <a>Despre Noi</a>
        </li>
        <li className="d-lg-none d-flex">
          <a>
            <Promotion />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
