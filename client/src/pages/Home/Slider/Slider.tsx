import style from './slider.module.scss'
import RightArrow from '../../../assets/img/Icon-arrRight.svg?react'
import LeftArrow from '../../../assets/img/Icon-arrLeft.svg?react'
import classNames from 'classnames'
import photo1 from '../../../assets/img/slider-1.png'
import photo2 from '../../../assets/img/slider-2.png'
import photo3 from '../../../assets/img/slider-3.png'

import { useState } from 'react'

const Slider = () => {
  const [indexImg, setIndexImg] = useState(0)

  const photosSlider = [
    { id: 1, photo: photo1, alt: 'Slider Img' },
    { id: 2, photo: photo2, alt: 'Slider Img2' },
    { id: 3, photo: photo3, alt: 'Slider Img3' },
  ]

  const handlePrevImg = () => {
    setIndexImg((prev) => (prev === 0 ? photosSlider.length - 1 : prev - 1))
  }
  const handleNextImg = () => {
    setIndexImg((prev) => (prev === photosSlider.length - 1 ? 0 : prev + 1))
  }
  const handleChangeImg = (indexImg: number) => {
    setIndexImg(indexImg)
  }

  return (
    <div className={classNames(style.wrapperImg, 'p-20x-10x')}>
      {/* Slider Image */}
      <img
        src={photosSlider[indexImg].photo}
        alt={photosSlider[indexImg].alt}
        className={classNames(style.sliderImage, ' b-r-md-48x b-r-20x')}
      />

      {/* Arrows */}
      <div className={classNames(style.circle, style.leftArrow, 'd-lg-block d-none')} onClick={handlePrevImg}>
        <LeftArrow />
      </div>
      <div className={style.wrapperSliderCircle}>
        {photosSlider.map((object, index) => (
          <div
            className={
              indexImg == index
                ? classNames(style.sliderOptionSelected, 'bg-blue-normal ')
                : classNames(style.sliderOption, 'bg-blue-normal ')
            }
            key={index}
            onClick={() => handleChangeImg(index)}
          ></div>
        ))}
      </div>
      <div className={classNames(style.circle, style.rightArrow, 'd-lg-block d-none')} onClick={handleNextImg}>
        <RightArrow />
      </div>
    </div>
  )
}

export default Slider
