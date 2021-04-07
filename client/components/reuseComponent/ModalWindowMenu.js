import React, { useEffect } from 'react'

const ModalWindowMenu = ({
  contextMenuDataTrigger,
  setContextMenuDataTrigger,
  contextMenuDataCoord
}) => {
  useEffect(() => {
    const modal = document.querySelector('#modal')
    const childModal = document.querySelector('#childModal')

    const handleClickOutside = (e) => {
      if (contextMenuDataTrigger && !e.path.includes(childModal)) {
        setContextMenuDataTrigger(!contextMenuDataTrigger)
      }
    }

    modal.addEventListener('click', (e) => handleClickOutside(e))
    return () => {
      return modal.removeEventListener('click', (e) => handleClickOutside(e))
    }
  }, [])
  return (
    <div
      id="modal"
      className=" absolute w-screen h-screen top-0 left-0 flex items-center justify-center  bg-gray-200 bg-opacity-80"
    >
      <div id="childModal" className=" h-20 w-20 bg-red-400">
        Hello Modal Window {contextMenuDataCoord.x} {contextMenuDataCoord.y}
      </div>
    </div>
  )
}

ModalWindowMenu.propTypes = {}

export default React.memo(ModalWindowMenu)
