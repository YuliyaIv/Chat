import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import CustomInputUnit from './CustomInputUnit'
import NewObjUser from '../../helperFunction/mainFunctionCreateUser'

const RegisterForm = () => {
  const history = useHistory()

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
      .test('check email', 'err email', async function (value) {
        const { path, createError } = this
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          const checkEmail = await axios(`/api/v2/auth/register/${value}`)
          return (
            checkEmail.data.msg === 'Email available' ||
            createError({ path, message: 'email already in use' })
          )
        }
        return createError({ path, message: 'please enter a valid email address' })
      })
      .required('email is required'),
    password: Yup.string()
      .min(6, 'password must be at least 6 characters')
      .max(10, 'password can be maximum 10 characters')
      .required('password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match')
  })

  const submit = async (values, { setSubmitting, resetForm }) => {
    const newUserFullObj = new NewObjUser(values)
    const { data } = await axios.post('/api/v2/user', newUserFullObj)
    if (data.status === 'success') {
      history.push('/auth')
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <>
      <div className="text-center text-3xl">Create an Account!</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
        validateOnChange={false}
        validateOnMount
      >
        {(formik, field) => {
          return (
            <Form className="flex flex-col justify-around pt-3 ">
              <div className="flex flex-col pt-4 text-lg ">
                <CustomInputUnit
                  id="name"
                  name="name"
                  labelText="Name"
                  placeholder="name"
                  errorStyle="text-red-500 text-sm"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4 text-lg">
                <CustomInputUnit
                  id="email"
                  name="email"
                  labelText="Email"
                  placeholder="Email"
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
                  placeholder="Password"
                  validationRequirement="password must be at least 6 characters"
                  validationRequirementStyle="text-sm text-gray-800"
                  errorStyle="text-red-500 text-sm"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4 text-lg">
                <CustomInputUnit
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  labelText="Confirm password"
                  placeholder="confirm password"
                  errorStyle="text-red-500 text-sm"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

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
          Already have an account?
          <div className="underline font-semibold">
            <Link to="/auth">Login!</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(RegisterForm)
