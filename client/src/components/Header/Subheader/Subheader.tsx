import LogoPhoto from '../../Logo/Logo'
import IconCategory from '../../../assets/img/Icon-Category.svg?react'
import Actions from '../Actions/Actions'
import Search from '../Search/Search'
import style from './subheader.module.scss'
import classNames from 'classnames'
import IconSearch from '../../../assets/img/Icon-Search.svg?react'
import IconBurgher from '../../../assets/img/Icon-Burgher.svg?react'
import Menu from '../Menu/Menu'
import { useState } from 'react'
import useAppSelector from '../../../store/hooks/useSelector'
import useAppDispatch from '../../../store/hooks/useDispach'
import { toggleMenu } from '../../../store/slices/menuSlice'
const Subheader = () => {
  const [inputSearchTrigger, setInputSearchTrigger] = useState(false)
  const dispatch = useAppDispatch()
  const { menuOpen } = useAppSelector((state) => state.menu)
  const toggleInputSearch = () => {
    setInputSearchTrigger((prev) => !prev)
  }

  return (
    <header className="p-20x">
      <div className="container">
        <div className="row j-c-between  a-i-center a-i-lg-end gap-30x gap-xl-50x paragraph-small fw-regular">
          <IconSearch className="d-lg-none d-block " width={24} height={24} onClick={toggleInputSearch} />

          <div className="col-2 col-lg-1 p-0x w-100">
            <LogoPhoto />
          </div>

          <IconBurgher
            className="d-lg-none d-block "
            style={{ cursor: 'pointer' }}
            width={24}
            height={24}
            onClick={() => {
              dispatch(toggleMenu())
            }}
          />

          <button className="col-2 d-none d-lg-flex a-i-center j-c-center b-r-50x p-10x mh-50x  gap-6x bg-blue-normal">
            <IconCategory />
            <p>Toate Categoriile</p>
          </button>

          <div
            className={classNames(
              style.inputSearch,
              ` col-xxl-4 col-xl-3 d-lg-block ${inputSearchTrigger ? 'd-block' : 'd-none'}`
            )}
          >
            <Search />
          </div>

          <div className={classNames(style.actionList)}>
            <Actions />
          </div>
        </div>
        {menuOpen ? <Menu /> : null}
      </div>
    </header>
  )
}

export default Subheader
