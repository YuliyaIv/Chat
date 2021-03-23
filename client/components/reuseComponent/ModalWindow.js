import React from 'react'

const ModalWindow = (props) => {
  return (
    <div className=" absolute w-screen h-screen bg-red-700 opacity-80 top-0 left-0 flex items-center justify-center">
      {props.comp}
    </div>
  )
}

ModalWindow.propType = {}

export default ModalWindow
