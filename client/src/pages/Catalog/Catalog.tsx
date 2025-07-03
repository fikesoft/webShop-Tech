import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import { CatalogProduct, CatalogSort } from '../../components'
import style from './catalog.module.scss'
import EmptyPage from '../Empty/EmptyPage'

export type SortOption = 'POPULARITY' | 'DISCOUNT' | 'PRICE_DESC' | 'PRICE_ASC' | 'NEW'

const Catalog: React.FC = () => {
  // 1️⃣ Read the route params
  const { category, subCategory } = useParams<{
    category?: string
    subCategory?: string
  }>()

  // 2️⃣ Local state for sorting
  const [selectedOrderBy, setSelectedOrderBy] = useState<SortOption>()

  // 3️⃣ Single useQuery that watches category, subCategory, and sort
  const { data, isLoading, error } = trpc.products.getAllProducts.useQuery({
    page: 1,
    limit: 10,
    categorySlug: category,
    subCategorySlug: subCategory,
    sort: selectedOrderBy,
  })

  if (isLoading) return <div>Loading…</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="w-100">
      {/* Sort + total count */}
      <div className="d-flex j-c-between">
        <CatalogSort selected={selectedOrderBy} onSortChange={setSelectedOrderBy} />
        <p className="paragraph-small grey">{`${data?.total ?? 0} produse`}</p>
      </div>

      <div className={style.catalog}>
        {data?.products.length ? (
          // we have products → show the grid
          data.products.map((item) => (
            <CatalogProduct
              key={item.id}
              imgUrl={item.gallery[0].url}
              name={item.name}
              price={item.price}
              discount={item.discount}
              isNew={item.isNew}
              isTop={item.isTop}
              rating={item.rating}
              ratingCounter={item.reviewCount}
              availability={item.availability}
            />
          ))
        ) : (
          <EmptyPage
            title="Nici un produs de afișat"
            paragraph="Ne pare rău, nu am găsit niciun produs care să corespundă filtrului tău."
          />
        )}
      </div>
    </div>
  )
}

export default Catalog
