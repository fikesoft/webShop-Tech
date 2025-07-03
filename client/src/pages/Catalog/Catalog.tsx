// src/pages/Catalog.tsx
import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import { CatalogProduct, CatalogSort } from '../../components'
import EmptyPage from '../Empty/EmptyPage'
import style from './catalog.module.scss'

export type SortOption = 'POPULARITY' | 'DISCOUNT' | 'PRICE_DESC' | 'PRICE_ASC' | 'NEW'

const Catalog: React.FC = () => {
  // 1️⃣ Read the route params
  const { category, subCategory } = useParams<{
    category?: string
    subCategory?: string
  }>()

  // 2️⃣ Read the URL‐filters
  const [searchParams] = useSearchParams()
  const availabilityParam = searchParams.get('availability') as 'IN_STOCK' | 'ON_ORDER' | null
  const priceMinParam = searchParams.get('priceMin')
  const priceMaxParam = searchParams.get('priceMax')

  // 3️⃣ Local state for sorting
  const [selectedOrderBy, setSelectedOrderBy] = useState<SortOption>()

  // 4️⃣ Fire the query
  const { data, isLoading, error } = trpc.products.getAllProducts.useQuery({
    page: 1,
    limit: 30,
    categorySlug: category,
    subCategorySlug: subCategory,
    sort: selectedOrderBy,
    availability: availabilityParam ?? undefined,
    priceMin: priceMinParam ? Number(priceMinParam) : undefined,
    priceMax: priceMaxParam ? Number(priceMaxParam) : undefined,
  })

  if (isLoading) return <div>Loading…</div>
  if (error) return <div>Error: {error.message}</div>

  const total = data?.total ?? 0
  const products = data?.products ?? []

  return (
    <div className="w-100">
      {/* Sort + total count */}
      <div className="d-flex j-c-between align-center mb-20x">
        <CatalogSort selected={selectedOrderBy} onSortChange={setSelectedOrderBy} />
        <p className="paragraph-small grey">{`${total} produse`}</p>
      </div>

      {/* If we have products, show a 3-column grid; otherwise show EmptyPage */}
      {total > 0 ? (
        <div className={style.catalog}>
          {products.map((item) => (
            <CatalogProduct
              key={item.id}
              imgUrl={item.gallery[0]?.url}
              name={item.name}
              price={item.price}
              discount={item.discount}
              isNew={item.isNew}
              isTop={item.isTop}
              rating={item.rating}
              ratingCounter={item.reviewCount}
              availability={item.availability}
            />
          ))}
        </div>
      ) : (
        <EmptyPage
          title="Nici un produs de afișat"
          paragraph="Ne pare rău, nu am găsit niciun produs care să corespundă filtrului tău."
        />
      )}
    </div>
  )
}

export default Catalog
