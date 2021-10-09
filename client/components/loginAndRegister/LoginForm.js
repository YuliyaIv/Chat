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
    login: Yup.string().required('login is required'),
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
      <div className="text-center text-3xl">Hi !</div>
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
              <div className="flex flex-col pt-4 text-lg" id="forttt">
                <CustomInputUnit
                  id="login"
                  name="login"
                  placeholder="login"
                  labelText="Login"
                  errorStyle="text-red-500 text-sm"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4 text-lg">
                <CustomInputUnit
                  type="password"
                  id="password"
                  name="password"
                  labelText="Password"
                  placeholder="password"
                  validationRequirementStyle="text-sm text-gray-800"
                  errorStyle="text-red-500 text-sm"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="text-center text-red-500 text-sm">{loggingResult}</div>
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
      <div className="text-center pt-12 pb-12">
        <div>
          Don&apos;t have an account?
          <div className="underline font-semibold">
            <Link to="/regis" className="underline font-semibold">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(LoginForm)
