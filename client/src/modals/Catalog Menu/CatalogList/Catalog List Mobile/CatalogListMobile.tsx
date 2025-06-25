import iconFile from '../../../../assets/img/Icon-Category.svg'
import style from '../catalogList.module.scss'
import CatalogItem from '../../Catalog Item/CatalogItem'
import { useCloseWindowResize } from '../../../../lib/hooks/useCloseWindowResize'
import { useEffect } from 'react'
import { useGetAllCategories } from '../../../../lib/hooks/useGetAllCategories'
import { useGetSubCategories } from '../../../../lib/hooks/useGetSubCategories'
import { useNavigate } from 'react-router-dom'

// Top‐level category list
function TopLevelList({ onClose, onSelectMobile }: { onClose: () => void; onSelectMobile: (slug: string) => void }) {
  const { data, isLoading, error, refetch } = useGetAllCategories()
  useEffect(() => {
    refetch()
  }, [refetch])
  useCloseWindowResize()

  if (isLoading) return <div>Loading…</div>
  if (error) return <div>Failed to load categories</div>

  // if data is ever undefined, treat it as an empty array
  const cats = data ?? []

  return (
    <ul className={style.catalogList}>
      {cats.map((cat) => (
        <CatalogItem
          key={cat.id}
          slug={cat.slug}
          categoryName={cat.name}
          categoryIconFile={cat.iconFile || iconFile}
          onSelectMobile={() => onSelectMobile(cat.slug)}
          onClose={onClose}
        />
      ))}
    </ul>
  )
}

// Sub‐category list
function SubCategoryList({ slug, onClose }: { slug: string; onClose: () => void }) {
  const { data, isLoading, error, refetch } = useGetSubCategories(slug)
  const navigate = useNavigate()
  useEffect(() => {
    refetch()
  }, [refetch])
  useCloseWindowResize()

  if (isLoading) return <div>Loading…</div>
  if (error) return <div>Failed to load subcategories</div>

  // safe-guard again:
  const subs = data?.subcategories ?? []

  return (
    <ul className={style.catalogList}>
      {subs.map((sub) => (
        <CatalogItem
          key={sub.id}
          slug={sub.slug}
          categoryName={sub.name}
          categoryIconFile={iconFile}
          onSelectMobile={() => {
            navigate(`/catalog/${slug}/${sub.slug}`)
            onClose()
          }}
          onClose={onClose}
        />
      ))}
    </ul>
  )
}

// The wrapper chooses which list to render.
// But each child component calls its hook unconditionally.
export const CatalogListMobile = ({
  slug,
  onClose,
  onSelectMobile,
}: {
  slug?: string
  onClose: () => void
  onSelectMobile: (slug: string) => void
}) => {
  return slug == null ? (
    <TopLevelList onClose={onClose} onSelectMobile={onSelectMobile} />
  ) : (
    <SubCategoryList slug={slug} onClose={onClose} />
  )
}
export default CatalogListMobile
