import React from 'react'

// Simple SVGs for the three star states:
const FullStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#f5a623">
    <path d="M12 .587l3.668 7.571L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.265z" />
  </svg>
)

const HalfStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="#f5a623" />
        <stop offset="50%" stopColor="#ddd" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGrad)"
      d="M12 .587l3.668 7.571L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.265z"
    />
  </svg>
)

const EmptyStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ddd">
    <path d="M12 .587l3.668 7.571L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.265z" />
  </svg>
)

export default function StarRating({ rating }) {
  // rating: number between 0 and 5 (can be fractional)
  const stars = []

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      // full star
      stars.push(<FullStar key={i} />)
    } else if (rating >= i + 0.5) {
      // half star
      stars.push(<HalfStar key={i} />)
    } else {
      // empty star
      stars.push(<EmptyStar key={i} />)
    }
  }

  return <div style={{ display: 'flex', gap: 4 }}>{stars}</div>
}
