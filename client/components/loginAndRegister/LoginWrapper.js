import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import Logo from './Logo'

const LoginWrapper = () => {
  const { loggingResult } = useSelector((s) => s.reducerAuth)

  return (
    <section className="w-full fixed flex flex-wrap bg-gray-50">
      <section className="w-full md:w-1/2 flex flex-col">
        <Logo className="w-full md:w-1/2 flex flex-col" />
        <main className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <LoginForm loggingResult={loggingResult} />
        </main>
      </section>

      <aside className="w-1/2 shadow-2xl">
        <img
          alt="fon"
          className="object-cover w-full h-screen hidden md:block"
          src="https://pbs.twimg.com/profile_images/949441352290447361/dQ-PjiVm.jpg"
        />
      </aside>
    </section>
  )
}

export default React.memo(LoginWrapper)
