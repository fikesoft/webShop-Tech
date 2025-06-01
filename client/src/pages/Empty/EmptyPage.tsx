import React from 'react'
import IconEmpty from '../../assets/img/Icon-Empty.svg?react'
import style from './emptyPage.module.scss'
import classNames from 'classnames'
interface EmptyPageI {
  title: string
  paragraph: string
}
const EmptyPage: React.FC<EmptyPageI> = ({ title, paragraph }) => {
  return (
    <div className="d-flex gap-16x j-c-center a-i-center p-50x  w-100" style={{ flexDirection: 'column' }}>
      <IconEmpty />
      <h3 className="h3 fw-medium">{title}</h3>
      <p className={classNames(style.paragraph, 'paragraph')}>{paragraph}</p>
      <div className="d-flex gap-16x">
        <button className={style.continueButton}>Continuați cumpărăturile</button>
        <button className={style.promotionButton}>Vezi promoțiile noastre</button>
      </div>
    </div>
  )
}

export default EmptyPage
