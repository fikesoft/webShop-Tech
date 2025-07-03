import React from 'react'
import style from './catalogBadges.module.scss'
import classNames from 'classnames'

// 1) Define the only allowed color strings
type BadgeColor = 'error' | 'success' | 'warning'

// 2) Map them to your CSS classes
const COLOR_CLASS: Record<BadgeColor, string> = {
  error: 'bg-red-normal',
  success: 'bg-green-normal',
  warning: 'bg-orange-normal',
}

interface CatalogBadgesProps {
  color: BadgeColor
  text: string
}

const CatalogBadges: React.FC<CatalogBadgesProps> = ({ color, text }) => {
  return <div className={classNames(COLOR_CLASS[color], style.badge, 'caption fw-medium')}>{text}</div>
}

export default CatalogBadges
