import React from 'react'

const Settings = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <g transform="translate(4 4)" strokeWidth={1.5}>
        <path stroke="#EDEFF0" d="M4.75.75h6.5v14.5h-6.5z" />
        <path stroke="#EDEFF0" d="M.75 11.25v-6.5h14.5v6.5z" />
        <path stroke="#EDEFF0" d="M.75.75h14.5v14.5H.75z" />
        <circle stroke="#D6DADC" cx={8} cy={8} r={7.25} />
      </g>
      <g fillRule="nonzero" fill="currentColor">
        <path d="M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm1.237-2.656c.32.509.55 1.08.67 1.69h2.26a1 1 0 0 1 0 2h-2.274a4.972 4.972 0 0 1-.721 1.723l1.627 1.628a1 1 0 0 1-1.414 1.414l-1.627-1.628c-.53.351-1.13.604-1.775.732v2.263a1 1 0 0 1-2 0v-2.27a4.968 4.968 0 0 1-1.64-.66L7.783 17.8a1 1 0 0 1-1.415-1.414l1.53-1.53a4.975 4.975 0 0 1-.789-1.822H5a1 1 0 0 1 0-2h2.094c.128-.65.382-1.256.735-1.79L6.367 7.781a1 1 0 0 1 1.415-1.414l1.46 1.462a4.97 4.97 0 0 1 1.741-.725V5a1 1 0 0 1 2 0v2.097c.686.136 1.32.413 1.874.799l1.528-1.529a1 1 0 0 1 1.414 1.414l-1.562 1.563z" />
      </g>
    </g>
  </svg>
)

export default Settings
