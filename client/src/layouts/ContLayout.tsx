import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuUserActions from '../modals/Menu User Modal/MenuUserActions'
const ContLayout = () => {
  return (
    <section>
      <div className="container">
        <h2 className="h2 fw-medium mb-50x">Cabinet personal</h2>
        <div className="row">
          <aside className="col-3">
            <MenuUserActions />
          </aside>
          <article className="col-9">
            <Outlet />
          </article>
        </div>
      </div>
    </section>
  )
}

export default ContLayout
