import style from './catalogSubCategory.module.scss'
import { useEffect } from 'react'
import { useGetSubCategories } from '../../../lib/hooks/useGetSubCategories'
import classNames from 'classnames'
interface Props {
  slug: string
}
const CatalogSubCategory: React.FC<Props> = ({ slug }) => {
  const { data, isLoading, isError, refetch } = useGetSubCategories(slug)

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return <p>Loading…</p>
  }
  if (isError) {
    return <p>Error loading subcategories.</p>
  }

  return (
    <ul className={style.catalogList}>
      {data?.subcategories.map((sub) => (
        <>
          <li key={sub.id} className={classNames(style.catalogItem, 'paragraph-small fw-bold mt-10x mb-10x ')}>
            {sub.name}
          </li>
          <ul>
            <li>Electrocasnice</li>
            <li>Mecanica</li>
          </ul>
        </>
      ))}
    </ul>
  )
}

export default CatalogSubCategory
