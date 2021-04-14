import React from 'react'
import { useDispatch } from 'react-redux'

const LoggedUser = ({
  objMessage,
  setIdParticularMessage,
  flagRenderContextMenu,
  setContextMenuDataCoord,
  setFlagRenderContextMenu
}) => {
  const dispatch = useDispatch()
  const openContextMenu = (e) => {
    e.preventDefault()
    setContextMenuDataCoord({ x: e.clientX, y: e.clientY })
    dispatch(setFlagRenderContextMenu(!flagRenderContextMenu, 'message'))
    setIdParticularMessage(objMessage.idMessage)
    console.log(objMessage.idMessage)
  }
  return (
    <button
      type="button"
      onContextMenu={openContextMenu}
      className="focus:outline-none flex justify-end p-3 w-3/4 rounded-lg ml-auto"
    >
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{objMessage.textMessage}</div>
        </div>
      </div>
    </button>
  )
}

LoggedUser.propType = {}

export default React.memo(LoggedUser)
