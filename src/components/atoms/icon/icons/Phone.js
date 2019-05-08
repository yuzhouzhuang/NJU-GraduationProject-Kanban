import React from 'react'

const Phone = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g transform="translate(4 5)" fill="currentColor" fillRule="evenodd">
      <path
        d="M2 2v10h12V2H2zM1 0h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z"
        fillRule="nonzero"
      />
      <path
        d="M8.7 10.76l2.319-2.339a273.25 273.25 0 0 0 2.984 2.824v-.868h2l-.969 1.038.97.067v-1.105c-2.13-1.99-3.495-3.283-4.093-3.882-.598-.598-1.178-.619-1.739-.06l-2.88 2.904a34.305 34.305 0 0 1-.797-.844c-.568-.628-1.148-.648-1.74-.06l-4.303 4.34 3.056-.242 2.071-2.089c.095.1.197.204.305.315l-.016.016.033.002c.394.405.873.888 1.44 1.453l2.635-.208c-.468-.46-.893-.88-1.276-1.262z"
        fillRule="nonzero"
      />
      <circle cx={4.5} cy={4.5} r={1.5} />
    </g>
  </svg>
)

export default Phone
