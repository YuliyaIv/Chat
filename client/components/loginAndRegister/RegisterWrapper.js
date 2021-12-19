import React from 'react'

import Logo from './Logo'
import RegisterForm from './RegisterForm'

const RegisterWrapper = () => {
  return (
    <section className="w-full h-screen fixed flex flex-wrap">
      <section className="w-full md:w-1/2 flex flex-col">
        <Logo />
        <main className="flex flex-col justify-start md:justify-around my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32  ">
          <RegisterForm />
        </main>
      </section>

      <aside className="w-1/2 shadow-2xl">
        <img
          alt="fon"
          className="object-cover w-full h-screen hidden md:block"
          src="https://i.pinimg.com/564x/06/e5/2e/06e52e75079402a173def79ca9337de9.jpg"
        />
      </aside>
    </section>
  )
}

export default React.memo(RegisterWrapper)
