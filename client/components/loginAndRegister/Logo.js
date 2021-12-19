import React from 'react'
import logo from '../../assets/fonts/logo.svg'

const Logo = () => {
  return (
    <figure className="flex flex-row mb-1 pl-8 justify-start pt-4">
      <img src={logo} alt="logo" />
      <figcaption className="flex items-end justify-start content-end font-bold text-2xl font-sans">
        CATchy ChAT
      </figcaption>
    </figure>
  )
}

export default Logo
