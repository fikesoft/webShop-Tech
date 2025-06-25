import { Outlet } from 'react-router-dom'
import { Header } from '../components'
import ModalHost from '../modals/ModalHost'
import useAppSelector from '../store/hooks/useSelector'
import CategoryMenu from '../modals/Catalog Menu/CategoryMenu'
const MainLayout = () => {
  const { categoryOpen } = useAppSelector((state) => state.menu)
  return (
    <div className="d-flex" style={{ flexDirection: 'column', backgroundColor: '#f9f9f9', position: 'relative' }}>
      <Header />
      <ModalHost />
      {categoryOpen && <CategoryMenu />}

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
