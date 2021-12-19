import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import CustomInputUnit from './CustomInputUnit'
import { signIn } from '../../redux/reducers/reducerAuth'

const LoginForm = ({ loggingResult }) => {
  const dispatch = useDispatch()

  const initialValues = {
    login: '',
    password: ''
  }

  const validationSchema = Yup.object({
    login: Yup.string()
      .min(6, 'login must be at least 6 characters')
      .max(15, 'login can be maximum 15 characters')
      .required('login is required'),
    password: Yup.string()
      .min(6, 'password must be at least 6 characters')
      .max(10, 'password can be maximum 10 characters')
      .required('password is required')
  })

  const submit = (values, { setSubmitting, resetForm }) => {
    console.log('values LoginForm submit', values)
    dispatch(signIn(values))
    setSubmitting(false)
    resetForm()
  }

  return (
    <>
      <h1 className="text-center text-3xl">Hi !</h1>
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
              <CustomInputUnit
                id="login"
                name="login"
                placeholder="login"
                labelText="Login"
                errorStyle="text-red-500 text-sm"
                labelStyle="pt-4 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />

              <CustomInputUnit
                type="password"
                id="password"
                name="password"
                labelText="Password"
                placeholder="password"
                validationRequirementStyle="text-sm text-gray-800"
                errorStyle="text-red-500 text-sm"
                labelStyle="pt-4 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />

              <p className="text-center text-red-500 text-lg font-semibold">{loggingResult}</p>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-gray-200 text-white font-bold text-lg text-center transition duration-500 ease-in-out hover:bg-gray-700 p-2 mt-8"
              >
                Log in
              </button>
            </Form>
          )
        }}
      </Formik>
      <footer className="text-center pt-12 pb-12">
        <p>Don&apos;t have an account?</p>
        <Link to="/regis" className="underline font-semibold">
          Register here
        </Link>
      </footer>
    </>
  )
}

export default React.memo(LoginForm)
