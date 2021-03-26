import React from 'react'
import { useDispatch } from 'react-redux'
import { getDataParticularChannel } from '../../redux/reducers/reducerDataChannels'

const ChatPreview = ({ message, name, channelId }) => {
  const dispatch = useDispatch()

  const setChannelId = () => {
    return dispatch(getDataParticularChannel(channelId))
  }
  return (
    <button
      type="button"
      onClick={setChannelId}
      className="hover:bg-gray-200 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out relative flex flex-row items-center p-4"
    >
      <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">5 min</div>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-gray-300 font-bold flex-shrink-0 mr-2">
        T r
      </div>
      <div className="flex flex-col flex-grow ml-3">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs truncate w-40">{message}</div>
      </div>
      <div className="flex-shrink-0 ml-2 self-end mb-1">
        <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
          5
        </span>
      </div>
    </button>
  )
}

ChatPreview.propTypes = {}

export default React.memo(ChatPreview)
