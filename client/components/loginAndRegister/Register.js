import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import Logo from './Logo'
import CustomInputUnit from './CustomInputUnit'

const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'name must be at least 5 characters')
      .max(15, 'name can be maximum 15 characters')
      .required('name is required'),

    email: Yup.string()
      .required('email is required')
      .test('check email', 'err email', async function (value) {
        const { path, createError } = this
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          const checkEmail = await axios(`/api/v2/auth/register/${value}`)
          return (
            checkEmail.data.msg !== 'Email already been taken' ||
            createError({ path, message: 'email already in use' })
          )
        }
        return createError({ path, message: 'please enter a valid email address' })
      }),
    password: Yup.string()
      .min(6, 'password must be at least 6 characters')
      .max(10, 'password can be maximum 10 characters')
      .required('password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match')
  })

  const submit = (values) => {
    console.log(values)
  }

  return (
    <div className="w-full fixed flex flex-wrap">
      {/* <!-- Login Section --> */}
      <div className="w-full md:w-1/2 flex flex-col">
        <Logo />
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Create an Account!</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
            validateOnChange={false}
            validateOnMount
          >
            {(formik, field) => {
              return (
                <Form className="flex flex-col pt-3 ">
                  <div className="flex flex-col justify-around pt-4 ">
                    <p className="text-lg">Name</p>
                    <CustomInputUnit
                      id="name"
                      name="name"
                      placeholder="name"
                      errorStyle="text-red-500 text-sm"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <field className="flex flex-col pt-4 ">
                    <p className="text-lg">Email</p>
                    <CustomInputUnit
                      id="email"
                      name="email"
                      placeholder="email"
                      errorStyle="text-red-500 text-sm"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </field>

                  <div className="flex flex-col pt-4 ">
                    <p className="text-lg">Password</p>
                    <CustomInputUnit
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      validationRequirement="password must be at least 6 characters"
                      validationRequirementStyle="text-sm text-gray-800"
                      errorStyle="text-red-500 text-sm"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="flex flex-col pt-4 ">
                    <p className="text-lg">Confirm password</p>
                    <CustomInputUnit
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="confirm password"
                      errorStyle="text-red-500 text-sm"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {!formik.isSubmitting ? (
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="bg-gray-200 text-white font-bold text-lg text-center transition duration-500 ease-in-out hover:bg-gray-700 p-2 mt-8"
                    >
                      Log in
                    </button>
                  ) : (
                    <p className="text-center text-lg">Please wait</p>
                  )}
                </Form>
              )
            }}
          </Formik>
          <div className="text-center pt-12 pb-12">
            <p>
              Already have an account?
              <p className="underline font-semibold">
                <Link to="/auth">Login!</Link>
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
          src="https://i.pinimg.com/564x/06/e5/2e/06e52e75079402a173def79ca9337de9.jpg"
        />
      </div>
    </div>
  )
}

export default Register
