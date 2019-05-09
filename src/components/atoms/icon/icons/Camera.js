import React from 'react'

const Camera = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M4 9.79c0-.985.716-1.784 1.6-1.784h12.8c.884 0 1.6.8 1.6 1.785v7.437c0 .986-.716 1.784-1.6 1.784H5.6c-.884 0-1.6-.799-1.6-1.784V9.791zm2.023.969c0-.423.358-.765.8-.765h10.403c.442 0 .8.342.8.765v5.492c0 .422-.358.765-.8.765H6.823c-.442 0-.8-.343-.8-.765v-5.492zM15 5.756c0-.423.373-.752.833-.752h3.334c.46 0 .833.33.833.752v1.25h-5V5.756z" />
      <path
        d="M12 16a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"
        fillRule="nonzero"
      />
    </g>
  </svg>
)

export default Camera
