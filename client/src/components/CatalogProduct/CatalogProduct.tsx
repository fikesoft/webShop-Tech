import React from 'react'
import style from './catalogProduct.module.scss'
import { Availability as PrismaAvailability } from '@prisma/client'
import classNames from 'classnames'
import IconCart from '../../assets/img/Icon-Cart.svg?react'
import IconCompare from '../../assets/img/Icon-Compare.svg?react'
import IconFavorite from '../../assets/img/Icon-Heart.svg?react'

import { CatalogBadge } from '..'
import StarRating from '../Star Raiting/StarRaiting'

interface CatalogProductProps {
  discount: string | null
  isNew: boolean
  isTop: boolean
  imgUrl: string
  name: string
  rating: number
  ratingCounter: number
  price: string
  availability: PrismaAvailability
}

const CatalogProduct: React.FC<CatalogProductProps> = ({
  discount,
  isNew,
  isTop,
  //imgUrl,
  name,
  rating,
  ratingCounter,
  price,
  availability,
}) => {
  // parse once
  const priceNum = parseFloat(price) || 0
  const discountNum = discount ? parseFloat(discount) : 0

  // "-10%" or "" if no discount
  const getPercentage = (): string => {
    if (priceNum <= 0 || discountNum <= 0) {
      return ''
    }
    const pct = Math.round((discountNum / priceNum) * 100)
    return `-${pct}%`
  }

  const discountedPrice = priceNum - discountNum

  return (
    <div className={style.productContainer}>
      {/* Images + Badges */}
      <div className={classNames(style.productImg, 'pt-30x pb-30x')}>
        <img src="../../../src/assets/img/Product1.png" alt={name} />

        <div className={style.badgesContainer}>
          {discountNum > 0 && <CatalogBadge color="error" text={getPercentage()} />}
          {isNew && <CatalogBadge color="success" text="New!" />}
          {isTop && <CatalogBadge color="warning" text="Top!" />}
        </div>
      </div>

      <div className={style.infoWrapper}>
        {/* Name & Rating */}
        <div className={style.nameContainer}>
          <p className="paragraph fw-medium">{name}</p>
          <div className={style.raitingContainer}>
            <StarRating rating={rating} />
            <p className={classNames(style.grey, 'paragraph-small ')}>{ratingCounter}</p>
          </div>
        </div>

        {/* Price */}
        <div className={style.infoPrice}>
          {discountNum > 0 ? (
            <>
              <h3 className="h3 fw-bold">{discountedPrice.toLocaleString()} lei</h3>
              <p className={classNames(style.grey, style.underlined, 'paragraph-small ')}>
                {priceNum.toLocaleString()}{' '}
              </p>
            </>
          ) : (
            <h3 className="h3 fw-bold">{priceNum.toLocaleString()} lei</h3>
          )}
          {discount ? <CatalogBadge color="error" text={`-${discount}`} /> : null}
        </div>

        {/* Availability */}
        <div className={availability === PrismaAvailability.IN_STOCK ? 'text-green-normal' : ' text-red-normal'}>
          {availability === PrismaAvailability.IN_STOCK ? 'In Stock' : 'On Order'}
        </div>

        {/* Action */}
        <div className={style.productActions}>
          <button className={classNames(style.buyProduct, 'paragraph-small')}>
            <IconCart />
            În coș
          </button>
          <div className={style.actions}>
            <IconFavorite />
            <IconCompare />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogProduct
