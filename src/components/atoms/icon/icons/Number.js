import React from 'react'

const Number = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
    >
      <path d="M9 5v14M15 5v14M19.004 9.01h-14M19 15H5" />
    </g>
  </svg>
)

export default Number
