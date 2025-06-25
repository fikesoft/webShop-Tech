import LogoPhoto from '../../Logo/Logo'
import IconCategory from '../../../assets/img/Icon-Category.svg?react'
import Actions from '../Actions/Actions'
import Search from '../Search/Search'
import style from './subheader.module.scss'
import classNames from 'classnames'
import IconSearch from '../../../assets/img/Icon-Search.svg?react'
import IconBurgher from '../../../assets/img/Icon-Burgher.svg?react'
import { useState } from 'react'
import useAppDispatch from '../../../store/hooks/useDispach'
import { openMenu, openCategory, closeMenu } from '../../../store/slices/menuSlice'
import useAppSelector from '../../../store/hooks/useSelector'
import IconClose from '../../../assets/img/Icon-Close.svg?react'
const Subheader = () => {
  const [inputSearchTrigger, setInputSearchTrigger] = useState(false)
  const { categoryOpen } = useAppSelector((state) => state.menu)
  const dispatch = useAppDispatch()

  const toggleInputSearch = () => {
    setInputSearchTrigger((prev) => !prev)
  }

  return (
    <header className="p-20x" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className="row j-c-between a-i-center gap-30x gap-xl-50x paragraph-small fw-regular">
          <IconSearch className="d-lg-none d-block " width={24} height={24} onClick={toggleInputSearch} />

          <LogoPhoto />

          <IconBurgher
            className="d-lg-none d-block "
            style={{ cursor: 'pointer' }}
            width={24}
            height={24}
            onClick={() => {
              dispatch(
                openMenu({
                  modalType: 'menu',
                  title: 'Menu',
                  headerDisplay: true,
                  fullWindow: true,
                })
              )
            }}
          />
          <button
            className="col-lg-2 d-none d-lg-flex a-i-center j-c-center b-r-50x p-10x mh-50x  gap-6x bg-blue-normal"
            onClick={() => (categoryOpen ? dispatch(closeMenu()) : dispatch(openCategory()))}
          >
            {categoryOpen ? <IconClose style={{ color: '#202020' }} /> : <IconCategory />}
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
        {}
      </div>
    </header>
  )
}

export default Subheader
