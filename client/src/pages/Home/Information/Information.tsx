import React from 'react'
import IconClock from '../../../assets/img/Icon-Clock.svg?react'
import IconRestart from '../../../assets/img/Icon-Restart.svg?react'
import IconShield from '../../../assets/img/Icon-shield.svg?react'
import IconKey from '../../../assets/img/Icon-Key.svg?react'
import IconTick from '../../../assets/img/Icon-Tick.svg?react'

import style from './information.module.scss'
import classNames from 'classnames'
const Information = () => {
  return (
    <div className={style.menuWrapper}>
      <ul className="d-flex gap-20x paragraph fw-medium">
        <li className={classNames(style.menuItem)}>
          <IconClock className="text-blue-normal w-lg-40x  h-lg-40x w-30x h-30x" />
          <p>Livrare rapidă și eficientă</p>
        </li>
        <li className={classNames(style.menuItem)}>
          <IconRestart className="text-blue-normal w-lg-40x  h-lg-40x w-30x h-30x" />
          <p>Retur simplu și gratuit</p>
        </li>
        <li className={classNames(style.menuItem)}>
          <IconShield className="text-blue-normal w-lg-40x  h-lg-40x w-30x h-30x" />
          <p>Produse verificate și de calitate</p>
        </li>
        <li className={classNames(style.menuItem)}>
          <IconKey className="text-blue-normal w-lg-40x  h-lg-40x w-30x h-30x" />
          <p>Plată securizată</p>
        </li>
        <li className={classNames(style.menuItem)}>
          <IconTick className="text-blue-normal w-lg-40x  h-lg-40x w-30x h-30x" />
          <p>Garanție extinsă pentru produse</p>
        </li>
      </ul>
    </div>
  )
}

export default Information
