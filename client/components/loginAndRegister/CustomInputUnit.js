import React from 'react'
import { useField } from 'formik'

const CustomInputUnit = (props) => {
  const [field, meta] = useField(props)
  const {
    labelText,
    validationRequirementStyle,
    validationRequirement,
    errorStyle,
    labelStyle,
    ...separatedProps
  } = props

  return (
    <>
      <label htmlFor={props.name} className={labelStyle}>
        {labelText}
        <input {...field} {...separatedProps} />
      </label>
      {meta.error && meta.touched ? (
        <div className={errorStyle}>{meta.error}</div>
      ) : (
        <div className={validationRequirementStyle}>{validationRequirement}</div>
      )}
    </>
  )
}

export default CustomInputUnit
