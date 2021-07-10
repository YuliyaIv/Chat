import React from 'react'
import logo from '../../assets/fonts/logo.svg'

const Logo = () => {
  return (
    <div className="flex flex-row mb-2 pl-8 justify-start pt-4 ">
      <img src={logo} alt="logo" />
      <div className="flex items-end justify-start content-end font-bold text-2xl font-sans">
        CATchy ChAT
      </div>
    </div>
  )
}

export default Logo
