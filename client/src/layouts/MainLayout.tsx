import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import ModalHost from '../modals/ModalHost'
import Catalog from '../modals/Catalog Menu/Catalog'
import useAppSelector from '../store/hooks/useSelector'
const MainLayout = () => {
  const { categoryOpen } = useAppSelector((state) => state.menu)
  return (
    <div className="d-flex" style={{ flexDirection: 'column', backgroundColor: '#f9f9f9', position: 'relative' }}>
      <Header />
      <ModalHost />
      {categoryOpen && <Catalog />}

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
