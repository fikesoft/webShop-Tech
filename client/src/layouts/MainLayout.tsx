import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import ModalHost from '../modals/ModalHost'
const MainLayout = () => {
  return (
    <div className="d-flex" style={{ flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
      <Header />
      <ModalHost />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
