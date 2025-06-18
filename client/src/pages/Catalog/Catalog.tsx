import React from 'react'
import { useParams } from 'react-router-dom'

const Catalog = () => {
  const { categorySlug, subCategorySlug } = useParams()
  return (
    <div>
      <h2>Catalog Page</h2>
      {categorySlug && <p>Category: {categorySlug}</p>}
      {subCategorySlug && <p>Subcategory: {subCategorySlug}</p>}
    </div>
  )
}

export default Catalog
