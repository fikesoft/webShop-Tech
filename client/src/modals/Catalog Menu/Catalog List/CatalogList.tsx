// src/components/Catalog/CatalogList.tsx

import React, { useEffect } from 'react'
import classNames from 'classnames'
import style from './catalogList.module.scss'
import CatalogItem from '../Catalog Item/CatalogItem'
import { useGetAllCategories } from '../../../lib/hooks/useGetAllCategories'

const CatalogList: React.FC = () => {
  const { data, isSuccess, isLoading, isError, refetch } = useGetAllCategories()

  useEffect(() => {
    refetch()
  }, [refetch])

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
