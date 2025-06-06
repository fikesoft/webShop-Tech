import React from 'react'
import IconCategory from '../../../../assets/img/Icon-Category.svg?react'
import classNames from 'classnames'
import style from '../actions.module.scss'
import useAppDispatch from '../../../../store/hooks/useDispach'
//import useAppSelector from '../../../../store/hooks/useSelector'
import { openMenu } from '../../../../store/slices/menuSlice'
const CatalogItem = () => {
  const disptach = useAppDispatch()
  //const { isOpen } = useAppSelector((state) => state.menu)
  return (
    <li
      className={classNames('d-lg-none', style.menuItem)}
      onClick={() => {
        disptach(
          openMenu({
            modalType: 'catalog',
            title: 'Catalog',
            headerDisplay: true,
            fullWindow: true,
          })
        )
      }}
    >
      <IconCategory />
      <p>Catalog</p>
    </li>
  )
}

export default CatalogItem
