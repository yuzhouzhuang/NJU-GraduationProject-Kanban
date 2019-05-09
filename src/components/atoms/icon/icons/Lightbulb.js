import React from 'react'

const Lightbulb = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M17 9.865c0 .922-.263 1.783-.72 2.518C15.402 13.79 14.954 16 12 16c-2.771 0-3.408-2.213-4.284-3.624A4.754 4.754 0 0 1 7 9.866C7 7.177 9.238 5 12 5s5 2.178 5 4.865zM12.03 15.5V12M9.996 18.999h3.985M9.996 15.999h3.985"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  </svg>
)

export default Lightbulb
