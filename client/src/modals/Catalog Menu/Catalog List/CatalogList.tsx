// src/components/Catalog/CatalogList.tsx

import React, { useEffect } from 'react'
import classNames from 'classnames'
import style from './catalogList.module.scss'
import CatalogItem from '../Catalog Item/CatalogItem'
import { useGetAllCategories } from '../../../lib/hooks/useGetAllCategories'
import useAppDispatch from '../../../store/hooks/useDispach'
import { closeMenu } from '../../../store/slices/menuSlice'

const CatalogList: React.FC = () => {
  const { data, isSuccess, isLoading, isError, refetch } = useGetAllCategories()

  useEffect(() => {
    refetch()
  }, [refetch])
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleResize = () => {
      dispatch(closeMenu())
    }

    // 1) Subscribe on mount
    window.addEventListener('resize', handleResize)

    // 2) Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])
  useEffect(() => {
    if (isLoading) {
      console.log('loading')
    }
    if (isError) {
      console.log('error')
    }
    if (isSuccess) {
      console.log('data:', data)
    }
  }, [isLoading, isError, isSuccess, data])

  return (
    <ul className={classNames(style.catalogList, ' col-xl-3 col-12')}>
      {isSuccess &&
        data.map((cat) => (
          <CatalogItem key={cat.id} categoryName={cat.name} categoryIconFile={cat.iconFile ?? 'Icon-Home.svg'} />
        ))}
      {isLoading && <li>Loading…</li>}
      {isError && <li>Error loading categories.</li>}
    </ul>
  )
}

export default CatalogList
