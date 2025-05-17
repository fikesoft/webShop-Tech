import LogoPhoto from '../../assets/img/Logo.svg'
import { useNavigate } from 'react-router-dom'
const Logo = () => {
  const navigate = useNavigate()
  return (
    <img
      src={LogoPhoto}
      alt="logo"
      onClick={() => {
        navigate('/')
      }}
      style={{ cursor: 'pointer' }}
    />
  )
}

export default Logo
