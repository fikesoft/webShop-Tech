import React, { useRef } from 'react'
import classNames from 'classnames'
import style from './catalogItem.module.scss'
import useAppDispatch from '../../../store/hooks/useDispach'
import { openMenu, closeMenu } from '../../../store/slices/menuSlice'
import { useNavigate } from 'react-router-dom'

const CatalogItem: React.FC<{
  slug: string
  categoryName: string
  categoryIconFile: string
  onSelect?: (slug: string, name: string) => void
  handleClose?: () => void
}> = ({ slug, categoryName, categoryIconFile, onSelect, handleClose }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const clickTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSingleClick = () => {
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

  const handleDoubleClick = () => {
    if (handleClose) {
      handleClose()
      dispatch(closeMenu())
    }
    navigate(`/catalog/${slug}`)
  }

  const handleClick = () => {
    if (clickTimeout.current) {
      return
    }
    clickTimeout.current = setTimeout(() => {
      handleSingleClick()
      clickTimeout.current = null
    }, 200)
  }
  return (
      <li
        className={classNames(style.catalogItem, 'paragraph-small')}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
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
