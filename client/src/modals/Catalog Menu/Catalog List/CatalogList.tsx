import React, { useEffect, useMemo } from 'react'
import style from './catalogList.module.scss'
import CatalogItem from '../Catalog Item/CatalogItem'
import useAppDispatch from '../../../store/hooks/useDispach'
import { closeMenu } from '../../../store/slices/menuSlice'
import { useGetSubCategories } from '../../../lib/hooks/useGetSubCategories'
import { useGetAllCategories } from '../../../lib/hooks/useGetAllCategories'

interface CatalogListProps {
  onSelect?: (slug: string, name: string) => void
  handleClose?: () => void
  slug?: string
}

const CatalogList: React.FC<CatalogListProps> = ({ onSelect, handleClose, slug }) => {
  const dispatch = useAppDispatch()

  // pick correct query
  const topLevelQ = useGetAllCategories()
  const subLevelQ = useGetSubCategories(slug ?? '')

  const isLoading = slug ? subLevelQ.isLoading : topLevelQ.isLoading
  const isError = slug ? subLevelQ.isError : topLevelQ.isError

  // normalize data to an array
  const items = useMemo(
    () => (slug ? (subLevelQ.data?.subcategories ?? []) : (topLevelQ.data ?? [])),
    [slug, subLevelQ.data, topLevelQ.data]
  )
  // fetch on mount or slug change
  useEffect(() => {
    if (slug) {
      subLevelQ.refetch()
    } else {
      topLevelQ.refetch()
    }
  }, [slug, topLevelQ, subLevelQ])

  // close on window resize
  useEffect(() => {
    const onResize = () => dispatch(closeMenu())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [dispatch])

  // after render: if we're in sub-list mode and there's no items, close
  useEffect(() => {
    if (slug && !isLoading && !isError && items.length === 0) {
      handleClose?.()
    }
  }, [slug, isLoading, isError, items, handleClose])

  if (isLoading) {
    return (
      <ul>
        <li>Loading…</li>
      </ul>
    )
  }
  if (isError) {
    return (
      <ul>
        <li>Error</li>
      </ul>
    )
  }

  return (
    <ul className={style.catalogList}>
      {items.map((cat) => (
        <CatalogItem
          key={cat.id}
          slug={cat.slug}
          categoryName={cat.name}
          categoryIconFile={cat.iconFile ?? 'Icon-Home.svg'}
          onSelect={onSelect}
          handleClose={handleClose}
        />
      ))}
    </ul>
  )
}

export default CatalogList
