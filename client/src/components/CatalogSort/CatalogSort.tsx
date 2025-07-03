import React from 'react'
import classNames from 'classnames'

export type SortOption = 'POPULARITY' | 'DISCOUNT' | 'PRICE_DESC' | 'PRICE_ASC' | 'NEW'

interface CatalogSortProps {
  selected?: SortOption
  onSortChange: (newSort?: SortOption) => void
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Popularitate', value: 'POPULARITY' },
  { label: 'Reduceri', value: 'DISCOUNT' },
  { label: 'Mai scump', value: 'PRICE_DESC' },
  { label: 'Mai ieftin', value: 'PRICE_ASC' },
  { label: 'Produse noi', value: 'NEW' },
]

const CatalogSort: React.FC<CatalogSortProps> = ({ selected, onSortChange }) => {
  return (
    <div className="d-flex gap-10x mb-20x">
      <h6 className="h6 fw-regular fs-sm-14x">Sortează după:</h6>
      <ul className="d-flex gap-10x list-unstyled m-0 p-0" style={{ flexWrap: 'wrap' }}>
        {SORT_OPTIONS.map(({ label, value }) => (
          <li
            key={value}
            className={classNames(
              'paragraph-small',
              { 'text-blue-normal-active': selected === value } // active styling
            )}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              // toggle off if clicking the already selected
              onSortChange(selected === value ? undefined : value)
            }
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CatalogSort
