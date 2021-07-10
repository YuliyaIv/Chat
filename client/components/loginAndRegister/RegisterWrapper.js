import React from 'react'

import Logo from './Logo'
import RegisterForm from './RegisterForm'

const RegisterWrapper = () => {
  return (
    <div className="w-full fixed flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <Logo />
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <RegisterForm />
        </div>
      </div>

      <div className="w-1/2 shadow-2xl">
        <img
          alt="fon"
          className="object-cover w-full h-screen hidden md:block"
          src="https://i.pinimg.com/564x/06/e5/2e/06e52e75079402a173def79ca9337de9.jpg"
        />
      </div>
    </div>
  )
}

export default React.memo(RegisterWrapper)
