import React from 'react'

const Collections = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g transform="translate(4 4)" fill="currentColor" fillRule="evenodd">
      <path
        d="M2 8v6h12V8H2zm0-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
        fillRule="nonzero"
      />
      <path d="M4 11h8v2H4z" />
      <rect x={4} y={9} width={2} height={3} rx={1} />
      <rect x={10} y={9} width={2} height={3} rx={1} />
      <rect x={2} y={3} width={12} height={2} rx={1} />
      <rect x={4} width={8} height={2} rx={1} />
    </g>
  </svg>
)

export default Collections
