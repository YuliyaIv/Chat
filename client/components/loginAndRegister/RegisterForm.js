import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

import CustomInputUnit from './CustomInputUnit'
import NewObjUser from '../../helperFunction/mainFunctionCreateUser'

const RegisterForm = () => {
  //  const [errMessageRegistr, setErrMessageRegistr] = useState('')
  const history = useHistory()

  const initialValues = {
    name: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    login: Yup.string()
      .min(6, 'name must be at least 6 characters')
      .max(15, 'name can be maximum 15 characters')
      // .test('check login', 'err login', async function check(value) {
      //   const { path, createError } = this
      //   if (value) {
      //     const checkLogin = await axios(`/api/v2/auth/register/${value}`)
      //     console.log('checkLogin', checkLogin)
      //     return (
      //       checkLogin.data.msg === 'Login available' ||
      //       createError({ path, message: 'login already in use' })
      //     )
      //   }
      //   return createError({ path, message: 'please enter a login' })
      // })
      .required('login is required'),
    name: Yup.string()
      .min(5, 'name must be at least 5 characters')
      .max(15, 'name can be maximum 15 characters')
      .required('name is required'),
    email: Yup.string().email().required('email is required'),
    password: Yup.string()
      .min(6, 'password must be at least 6 characters')
      .max(10, 'password can be maximum 10 characters')
      .required('password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match')
  })

  const submit = async (values, { setSubmitting, resetForm, setStatus }) => {
    const newUserFullObj = new NewObjUser(values)
    const { data } = await axios.post('/api/v2/user', newUserFullObj)
    console.log('err', data)
    if (data.status === 'success') {
      history.push('/auth')
      setSubmitting(false)
      resetForm()
    } else {
      setStatus(data.status)
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl">Create an Account!</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
        validateOnChange={false}
        validateOnMount
      >
        {(formik, field) => {
          return (
            <Form className="flex flex-col justify-around pb-2">
              <CustomInputUnit
                id="login"
                name="login"
                labelText="Login"
                placeholder="login"
                errorStyle="text-red-500 text-xs"
                labelStyle="pt-1 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              />
              <CustomInputUnit
                id="name"
                name="name"
                labelText="Name"
                placeholder="name"
                errorStyle="text-red-500 text-xs"
                labelStyle="pt-1 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              />
              <CustomInputUnit
                id="email"
                name="email"
                labelText="Email"
                placeholder="email"
                errorStyle="text-red-500 text-xs"
                labelStyle="pt-2 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              />
              <CustomInputUnit
                type="password"
                id="password"
                name="password"
                labelText="Password"
                placeholder="password"
                validationRequirement="password must be at least 6 characters"
                validationRequirementStyle="text-xs text-gray-800"
                errorStyle="text-red-500 text-xs"
                labelStyle="pt-2 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <CustomInputUnit
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                labelText="Confirm password"
                placeholder="confirm password"
                errorStyle="text-red-500 text-xs"
                labelStyle="pt-2 text-lg"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="text-red-600 text-lg text-center ">{formik.status}</div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-gray-200 p-2  mt-5 text-white font-bold text-lg text-center transition duration-500 ease-in-out hover:bg-gray-700 "
              >
                register
              </button>
            </Form>
          )
        }}
      </Formik>
      <footer className="text-center">
        <p>Already have an account?</p>
        <Link to="/auth" className="underline font-semibold">
          Login!
        </Link>
      </footer>
    </>
  )
}

export default React.memo(RegisterForm)
