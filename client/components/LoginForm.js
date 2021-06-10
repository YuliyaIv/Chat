import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLoginField, updatePasswordField, signIn } from '../redux/reducers/reducerAuth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { login, password } = useSelector((s) => s.reducerAuth)
  // create State for input
  return (
    <div className="w-full flex flex-wrap">
      {/* <!-- Login Section --> */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Welcome</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit="event.preventDefault();">
            <div className="flex flex-col pt-4">
              <label htmlFor="login" className="text-lg">
                Login
              </label>
              <input
                type="login"
                id="login"
                value={login}
                placeholder="login"
                onChange={(e) => dispatch(updateLoginField(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => dispatch(updatePasswordField(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <bytton
              type="button"
              className="bg-gray-200 text-white font-bold text-lg text-center transition duration-500 ease-in-out   hover:bg-gray-700 p-2 mt-8"
              onClick={() => dispatch(signIn())}
            >
              Log in
            </bytton>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Don t have an account?
              <p className="underline font-semibold">
                <Link to="/regis" className="underline font-semibold">
                  Register here.
                </Link>
              </p>
            </p>
          </div>
        </div>
      </div>
      {/* <!-- Image Section --> */}
      <div className="w-1/2 shadow-2xl">
        <img
          alt="fon"
          className="object-cover w-full h-screen hidden md:block"
          // src="https://source.unsplash.com/IXUM4cJynP0"
          src="https://i.pinimg.com/564x/9e/eb/1f/9eeb1faeb825ffc58b60c541ad7f5f87.jpg"
        />
      </div>
    </div>
  )
}

export default LoginForm
