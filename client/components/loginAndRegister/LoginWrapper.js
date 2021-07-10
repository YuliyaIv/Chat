import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import Logo from './Logo'

const LoginWrapper = () => {
  const { loggingResult } = useSelector((s) => s.reducerAuth)

  return (
    <div className="w-full fixed flex flex-wrap bg-gray-50">
      <div className="w-full md:w-1/2 flex flex-col">
        <Logo />
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <LoginForm loggingResult={loggingResult} />
        </div>
      </div>

      <div className="w-1/2 shadow-2xl">
        <img
          alt="fon"
          className="object-cover w-full h-screen hidden md:block"
          src="https://pbs.twimg.com/profile_images/949441352290447361/dQ-PjiVm.jpg"
        />
      </div>
    </div>
  )
}

export default React.memo(LoginWrapper)
