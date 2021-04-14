import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel, deleteMessage } from '../../../redux/reducers/reducerDataChannels'

const DeleteDataFromDB = ({ id, idParticularMessage, dataParticularIdChannel }) => {
  const { typeOfContent } = useSelector((s) => s.reducerSetFlagRender.flagRenderContextMenu)
  const dispatch = useDispatch()
  const sendActionDelete = () => {
    if (typeOfContent === 'channel') {
      dispatch(deleteChannel(id))
    }
    if (typeOfContent === 'message') {
      dispatch(deleteMessage(dataParticularIdChannel, idParticularMessage))
    }
  }

  return (
    <button
      type="button"
      onClick={sendActionDelete}
      className="h-full p-1 bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200"
    >
      Delete {idParticularMessage}
    </button>
  )
}

DeleteDataFromDB.propTypes = {}

export default React.memo(DeleteDataFromDB)
