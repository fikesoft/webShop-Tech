import Slider from './Slider/Slider'
import Information from './Information/Information'
import { Auth } from '../../components'
const Home = () => {
  return (
    <div className="bg-grey-second">
      <div className="container">
        <Slider />
        <Information />
        <Auth />
      </div>
    </div>
  )
}

export default Home
