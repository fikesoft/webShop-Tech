import LogoPhoto from '../../Logo/Logo'
import IconCategory from '../../../assets/img/Icon-Category.svg?react'
import Actions from '../Actions/Actions'
import Search from '../Search/Search'
import style from './subheader.module.scss'
import classNames from 'classnames'
import IconSearch from '../../../assets/img/Icon-Search.svg?react'
import IconBurgher from '../../../assets/img/Icon-Burgher.svg?react'
import { useState } from 'react'
const Subheader = () => {
  const [inputSearchTrigger, setInputSearchTrigger] = useState(false)
  const toggleInputSearch = () => {
    setInputSearchTrigger((prev) => !prev)
  }
  return (
    <header className="p-20x">
      <div className="container">
        <div className="paragraph-small fw-regular row j-c-between a-i-lg-end  a-i-center  gap-xl-50x gap-30x">
          <IconSearch className="d-lg-none d-block " width={24} height={24} onClick={toggleInputSearch} />

          <div className="col-lg-1 col-2 p-0x w-100">
            <LogoPhoto />
          </div>

          <IconBurgher className="d-lg-none d-block " width={24} height={24} />

          <button className="d-lg-flex d-none a-i-center j-c-center gap-6x bg-blue-normal b-r-50x p-10x mh-50x col-2">
            <IconCategory />
            <p>Toate Categoriile</p>
          </button>

          <div
            className={classNames(
              style.inputSearch,
              `col-xl-3 col-xxl-4 d-lg-block ${inputSearchTrigger ? 'd-block' : 'd-none'}`,
            )}
          >
            <Search />
          </div>

          <div className={classNames(style.actionList)}>
            <Actions />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Subheader
