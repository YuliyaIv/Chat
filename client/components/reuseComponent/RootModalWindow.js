import React from 'react'
import ReactDOM from 'react-dom'

const RootModalWindow = () => {
  console.log('rooooooot')
  return ReactDOM.createPortal(
    <div className="z-100 flex bg-red-500 h-screen"> Modal !!!!!!!!!!!!!!!!!!!!!</div>,
    document.querySelector('#root-modal')
  )
}

RootModalWindow.propTypes = {}

export default RootModalWindow
