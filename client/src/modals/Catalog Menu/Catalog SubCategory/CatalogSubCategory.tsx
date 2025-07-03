import style from './catalogSubCategory.module.scss'
import { useEffect } from 'react'
import { useGetSubCategories } from '../../../lib/hooks/useGetSubCategories'
import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import useAppDispatch from '../../../store/hooks/useDispach'
import { closeMenu } from '../../../store/slices/menuSlice'
interface Props {
  slug: string
}
const CatalogSubCategory: React.FC<Props> = ({ slug }) => {
  const { data, isLoading, isError, refetch } = useGetSubCategories(slug)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
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
        <li
          key={sub.id}
          className={classNames(style.catalogItem, 'paragraph-small fw-bold mt-10x mb-10x ')}
          onClick={() => {
            dispatch(closeMenu())
            navigate(`${pathname}/${sub.slug}`)
          }}
        >
          {sub.name}
        </li>
      ))}
    </ul>
  )
}

export default CatalogSubCategory
