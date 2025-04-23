import { Outlet } from 'react-router-dom'
import { Header } from '../components'
const MainLayout = () => {
  return (
    <div className="d-flex" style={{ flexDirection: 'column' }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
