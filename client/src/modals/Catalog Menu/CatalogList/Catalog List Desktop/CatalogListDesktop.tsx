import React, { useEffect } from 'react'
import { useGetAllCategories } from '../../../../lib/hooks/useGetAllCategories'
import style from '../catalogList.module.scss'
import CatalogItem from '../../Catalog Item/CatalogItem'
import { useCloseWindowResize } from '../../../../lib/hooks/useCloseWindowResize'
import iconFile from '../../../../assets/img/Icon-Category.svg'
interface CatalogListDesktopProps {
  onSelectDesktop: (slug: string) => void
}
const CatalogListDesktop: React.FC<CatalogListDesktopProps> = ({ onSelectDesktop }) => {
  const { data, isLoading, error, refetch } = useGetAllCategories()

  //Refetch on mount
  useEffect(() => {
    refetch()
  }, [refetch])

  //Close menu when resize screen
  useCloseWindowResize()

  if (isLoading) {
    return <div>Loading categories…</div>
  }
  if (error) {
    return <div>Failed to load categories</div>
  }

  return (
    <ul className={style.catalogList}>
      {data && data.length > 0 ? (
        data.map((cat) => (
          <CatalogItem
            key={cat.id}
            slug={cat.slug}
            categoryName={cat.name}
            categoryIconFile={cat.iconFile ? cat.iconFile : iconFile}
            onSelectDesktop={() => {
              onSelectDesktop(cat.slug)
            }}
          />
        ))
      ) : (
        <li>No categories found</li>
      )}
    </ul>
  )
}

export default CatalogListDesktop
