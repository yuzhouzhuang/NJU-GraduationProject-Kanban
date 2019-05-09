import React from 'react'

const Alert = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 2a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
        fillRule="nonzero"
      />
      <path d="M11.1 14.556v1.896H13v-1.896h-1.9zm1.84-4.53V7.661h-1.792v2.363l.46 3.792h.86l.472-3.792z" />
    </g>
  </svg>
)

export default Alert
