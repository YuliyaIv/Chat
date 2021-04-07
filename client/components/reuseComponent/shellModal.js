import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const ShellModal = ({ contextMenuDataCoord: { x, y } }) => {
  const modal = document.createElement('div')
  useEffect(() => {
    document.body.appendChild(modal)
    modal.setAttribute('class', 'flex items-center justify-center  border bg-red-300')
    modal.setAttribute('style', `position: fixed; top: ${y}px; left: ${x}px;`)
    return () => {
      document.body.removeChild(modal)
    }
  }, [])

  console.log(modal)

  return ReactDOM.createPortal(
    <div id="modal-2" className=" z-100  border  ">
      Modal Window !!
    </div>,
    modal
  )
}

ShellModal.propTypes = {}

export default ShellModal
