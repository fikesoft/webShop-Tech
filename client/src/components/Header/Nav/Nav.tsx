import Promotion from '../Promotion/Promotion'
import style from './nav.module.scss'
import classNames from 'classnames'
const Nav = () => {
  return (
    <nav>
      <ul className={classNames(style.navMenu, 'd-flex gap-24x  small-paragraph')}>
        <li className="d-lg-none d-flex">
          <a>Catalog</a>
        </li>
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
