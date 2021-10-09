import React from 'react'

import Logo from '../loginAndRegister/Logo'

const TestLogin = () => {
  return (
    <div className="main">
      <main className="main-lefthalf">
        <header className="main-lefthalf-header">
          <Logo />
          <h1>Text</h1>
        </header>
        <form action="" className="main-lefthalf-form">
          <label htmlFor="login">login</label>
          <input type="text" id="login" name="login" placeholder="enter login" />
          <button type="submit">Log in</button>
        </form>
        <footer className="main-lefthalf-footer">
          <h2>Don&apos;t have an account?</h2>
          <a href="#">Register here</a>
        </footer>
      </main>
      <aside className="main-righthalf">
        <img
          alt="fon"
          src="https://i.pinimg.com/564x/06/e5/2e/06e52e75079402a173def79ca9337de9.jpg"
        />
      </aside>
    </div>
  )
}

export default React.memo(TestLogin)
