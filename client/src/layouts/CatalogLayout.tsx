// src/layouts/CatalogLayout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import { CatalogAside } from '../components'
import { useIsMobile } from '../lib/hooks/useIsMobile'
import style from './catalogLayout.module.scss'
import IconFilter from '../assets/img/Icon-Filter.svg?react'
const CatalogLayout: React.FC = () => {
  const isMobile = useIsMobile(768)

  return (
    <section>
      <div className="container">
        <h2 className="h2 fw-medium mb-20x">Rezultatele căutării</h2>
        <div
          className="d-flex gap-20x pt-20x pb-20x"
          style={{
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {isMobile ? (
            <button
              className={style.buttonFilter}
              onClick={() => {
                /* you can toggle a sidebar or open a modal here */
              }}
            >
              <IconFilter />
              Filtrează
            </button>
          ) : (
            <CatalogAside />
          )}
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default CatalogLayout
