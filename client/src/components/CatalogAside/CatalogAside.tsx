import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { trpc } from '../../lib/trpc'
import { Range, getTrackBackground } from 'react-range'
import style from './CatalogAside.module.scss'

// ─── Constants ─────────────────────────────────────
const PRICE_MIN = 0
const PRICE_MAX = 50000
const PRICE_STEP = 100

// ─── Component ─────────────────────────────────────
const CatalogAside: React.FC = () => {
  // ─ Section: route params & category data
  const { category, subCategory } = useParams<{
    category?: string
    subCategory?: string
  }>()
  const { data: categories } = trpc.category.getAllCategories.useQuery(undefined, { enabled: !category })
  const { data: currentCategory } = trpc.category.getBySlugCategory.useQuery(
    { slug: category || '' },
    { enabled: !!category }
  )
  const items = category ? (currentCategory?.subcategories ?? []) : (categories ?? [])

  // ─ Section: URL search params
  const [searchParams, setSearchParams] = useSearchParams()
  const availabilityParams = searchParams.getAll('availability')

  // ─ Section: price params from URL
  const paramMin = Number(searchParams.get('priceMin') ?? PRICE_MIN)
  const paramMax = Number(searchParams.get('priceMax') ?? PRICE_MAX)

  // ─ Section: local slider state
  const [values, setValues] = useState<[number, number]>([paramMin, paramMax])

  // keep slider in sync when user navigates browser history
  useEffect(() => {
    setValues([paramMin, paramMax])
  }, [paramMin, paramMax])

  // ─ Section: handlers ──────────────────────────────

  // toggle single availability filter in URL params
  const toggleAvailability = (value: 'IN_STOCK' | 'ON_ORDER') => {
    const p = new URLSearchParams(searchParams)
    // remove existing
    p.delete('availability')
    // re-add all except this value
    searchParams
      .getAll('availability')
      .filter((v) => v !== value)
      .forEach((v) => p.append('availability', v))
    // if not previously selected, append it
    if (!availabilityParams.includes(value)) {
      p.append('availability', value)
    }
    setSearchParams(p)
  }

  // write new min/max back to URL
  const updatePriceParams = ([min, max]: [number, number]) => {
    const p = new URLSearchParams(searchParams)
    p.set('priceMin', String(min))
    p.set('priceMax', String(max))
    setSearchParams(p)
  }

  // handle manual input in the pill fields
  const onInputChange = (idx: 0 | 1) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value)
    // clamp
    v = Math.max(PRICE_MIN, Math.min(PRICE_MAX, v))
    const other = values[1 - idx]
    if (idx === 0 && v > other) v = other
    if (idx === 1 && v < other) v = other
    const next: [number, number] = idx === 0 ? [v, other] : [other, v]
    setValues(next)
    updatePriceParams(next)
  }

  // ─── Rendering ────────────────────────────────────
  return (
    <aside className={style.catalogAside}>
      {/* Category / Subcategory Links */}
      <h5 className="h5 mb-10x paragraph fw-medium">
        {category ? currentCategory?.name || 'Subcategorii' : 'Categorii'}
      </h5>
      <ul className={style.list}>
        {items.map((item) => {
          const isActive = subCategory === item.slug || (!subCategory && category === item.slug)
          const to = category ? `/catalog/${category}/${item.slug}` : `/catalog/${item.slug}`
          return (
            <li key={item.id} className={style.item}>
              <Link
                to={to}
                className={classNames(style.link, { 'text-blue-normal-active': isActive }, 'paragraph-small')}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Availability Filters */}
      <div className="mt-20x">
        <h6 className="h6 mb-10x paragraph fw-medium">Disponibilitate</h6>
        <div className={style.filterGroup}>
          <label className={style.option}>
            <input
              type="checkbox"
              checked={availabilityParams.includes('IN_STOCK')}
              onChange={() => toggleAvailability('IN_STOCK')}
            />
            <span className={style.customCheckbox} />
            <span className="paragraph">În stoc</span>
          </label>
          <label className={style.option}>
            <input
              type="checkbox"
              checked={availabilityParams.includes('ON_ORDER')}
              onChange={() => toggleAvailability('ON_ORDER')}
            />
            <span className={style.customCheckbox} />
            <span className="paragraph">La comandă</span>
          </label>
        </div>
      </div>

      {/* Price Slider */}
      <div className="mt-20x" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h6 className="h6 mb-10x paragraph fw-medium">Preț</h6>
        {/* Pill Inputs */}
        <div className={style.priceDisplay}>
          <input type="number" className={style.pricePillInput} value={values[0]} onChange={onInputChange(0)} />
          <input type="number" className={style.pricePillInput} value={values[1]} onChange={onInputChange(1)} />
        </div>
        {/* Two‐thumb slider */}
        <Range
          values={values}
          step={PRICE_STEP}
          min={PRICE_MIN}
          max={PRICE_MAX}
          onChange={(vals) => setValues([vals[0], vals[1]])}
          onFinalChange={(vals) => updatePriceParams([vals[0], vals[1]])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: 8,
                width: '100%',
                background: getTrackBackground({
                  values,
                  colors: ['#eee', '#5dd0d8', '#eee'],
                  min: PRICE_MIN,
                  max: PRICE_MAX,
                }),
                borderRadius: 4,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: 24,
                width: 24,
                borderRadius: '50%',
                background: '#5dd0d8',
                cursor: 'grab',
              }}
            />
          )}
        />
      </div>
    </aside>
  )
}

export default CatalogAside
