import React from 'react'

const Related = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g
      transform="translate(4 4)"
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
    >
      <rect x={5} y={5} width={10} height={10} rx={2} />
      <rect x={1} y={1} width={8} height={8} rx={2} />
    </g>
  </svg>
)

export default Related
