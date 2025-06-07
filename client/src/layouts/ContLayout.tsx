import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuUserActions from '../modals/Menu User Modal/MenuUserActions'
const ContLayout = () => {
  return (
    <section>
      <div className="container">
        <h2 className="h2 fw-medium mb-50x">Cabinet personal</h2>
        <div className="row gap-lg-0x gap-50x">
          <aside className="col-lg-3 col-12">
            <MenuUserActions />
          </aside>
          <article className="col-lg-9 col-12 b-r-20x mb-20x" style={{ backgroundColor: 'white' }}>
            <Outlet />
          </article>
        </div>
      </div>
    </section>
  )
}

export default ContLayout
