import React from 'react'
import styles from './CircularProgress.module.scss'

export interface CircularProgressProps {
  /** If provided, shows a determinate ring (0–100). Otherwise spins indefinitely. */
  value?: number
  /** Diameter in px */
  size?: number
  /** Stroke width in px */
  thickness?: number
  /** Circle color (any valid CSS color) */
  color?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 40,
  thickness = 4,
  color = '#14A1AD',
}) => {
  const half = size / 2
  const radius = half - thickness / 2
  const circumference = 2 * Math.PI * radius

  // For determinate
  const dashOffset = value != null ? circumference * (1 - Math.min(Math.max(value, 0), 100) / 100) : 0

  // For indeterminate: 75% arc, 25% gap
  const indetDashArray = `${(circumference * 0.75).toFixed(3)} ${circumference.toFixed(3)}`

  return (
    <svg
      className={value == null ? styles.indeterminate : ''}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle className={styles.track} cx={half} cy={half} r={radius} strokeWidth={thickness} />
      <circle
        className={styles.indicator}
        cx={half}
        cy={half}
        r={radius}
        strokeWidth={thickness}
        stroke={color}
        strokeDasharray={value == null ? indetDashArray : circumference}
        strokeDashoffset={value == null ? 0 : dashOffset}
      />
    </svg>
  )
}
