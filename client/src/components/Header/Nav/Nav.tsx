import { Link } from 'react-router-dom'
import Promotion from '../Promotion/Promotion'
import style from './nav.module.scss'
import classNames from 'classnames'
import useAppSelector from '../../../store/hooks/useSelector'
import useAppDispatch from '../../../store/hooks/useDispach'
import { closeMenu, openMenu } from '../../../store/slices/menuSlice'
const Nav = () => {
  const disptach = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.menu)
  return (
    <nav>
      <ul className={classNames(style.navMenu, 'd-flex gap-24x small-paragraph overflow-hidden')}>
        <li className="d-lg-none d-flex">
          <Link
            to="/catalog"
            onClick={() => {
              disptach(
                openMenu({
                  modalType: 'catalogMobile',
                  title: 'Categories',
                  headerDisplay: true,
                  fullWindow: true,
                  data: { slug: undefined },
                })
              )
            }}
          >
            Catalog
          </Link>
        </li>
        <li>
          <Link
            to="/contacte"
            onClick={() => {
              if (isOpen) {
                disptach(closeMenu())
              }
            }}
          >
            Contacte
          </Link>
        </li>
        <li>
          <Link
            to="/livrare"
            onClick={() => {
              if (isOpen) {
                disptach(closeMenu())
              }
            }}
          >
            Livrare
          </Link>
        </li>
        <li>
          {/* Direct Link, no extra <a> */}
          <Link
            to="/despre-noi"
            onClick={() => {
              if (isOpen) {
                disptach(closeMenu())
              }
            }}
          >
            Despre Noi
          </Link>
        </li>
        <li className="d-lg-none d-flex">
          <Promotion />
        </li>
      </ul>
    </nav>
  )
}

export default Nav
