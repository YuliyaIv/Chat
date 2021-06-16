import React from 'react'
import { useField } from 'formik'

const CustomInputUnit = (props) => {
  const [field, meta] = useField(props)
  const { validationRequirementStyle, validationRequirement, errorStyle, ...separatedProps } = props

  return (
    <>
      <label htmlFor={props.name}>
        <input {...field} {...separatedProps} />
      </label>

      {meta.error && meta.touched ? (
        <p className={errorStyle}>{meta.error}</p>
      ) : (
        <p className={validationRequirementStyle}>{validationRequirement}</p>
      )}
    </>
  )
}

export default CustomInputUnit
