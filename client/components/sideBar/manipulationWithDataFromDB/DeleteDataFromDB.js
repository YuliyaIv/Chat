import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { deleteChannelDB, deleteMessageDB } from '../../../redux/reducers/reducerDBDataChannel'

const DeleteDataFromDB = ({ idParticularMessage }) => {
  const { particularChannelId } = useSelector((s) => s.reducerDBDataChannel)
  const { typeOfContent } = useSelector((s) => s.reducerSetFlagRender.flagRenderContextMenu)
  const dispatch = useDispatch()
  const sendActionDelete = () => {
    if (typeOfContent === 'channel') {
      dispatch(deleteChannelDB(particularChannelId))
    }
    if (typeOfContent === 'message') {
      dispatch(deleteMessageDB(particularChannelId, idParticularMessage))
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

DeleteDataFromDB.propTypes = {
  idParticularMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

DeleteDataFromDB.defaultProps = {
  idParticularMessage: null
}

export default React.memo(DeleteDataFromDB)
