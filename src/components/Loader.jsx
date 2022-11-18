import { DotSpinner } from '@uiball/loaders'
import React from 'react'

const Loader = () => {
  return (
    <div className="container-loader">
      <DotSpinner size={40} speed={0.9} color='black' />
    </div>
  )
}

export default Loader