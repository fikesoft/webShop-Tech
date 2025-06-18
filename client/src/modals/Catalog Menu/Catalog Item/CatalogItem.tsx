import React from 'react'
import classNames from 'classnames'
import style from './catalogItem.module.scss'
import useAppDispatch from '../../../store/hooks/useDispach'
import { openMenu } from '../../../store/slices/menuSlice'

const CatalogItem: React.FC<{
  slug: string
  categoryName: string
  categoryIconFile: string
  onSelect?: (slug: string, name: string) => void
  handleClose?: () => void
}> = ({ slug, categoryName, categoryIconFile, onSelect, handleClose }) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    if (onSelect) {
      onSelect(slug, categoryName)
    } else if (handleClose) {
      // modal flow
      handleClose()
      dispatch(
        openMenu({
          modalType: 'catalog',
          title: categoryName,
          headerDisplay: true,
          fullWindow: true,
          data: { slug },
        })
      )
    }
  }
  return (
    <li
      className={classNames(style.catalogItem, 'paragraph-small')}
      onClick={handleClick}
      style={
        {
          '--icon-url': `url(/icons/${categoryIconFile})`,
        } as React.CSSProperties
      }
    >
      {categoryName}
      <span className={style.arrow} />
    </li>
  )
}

export default CatalogItem
