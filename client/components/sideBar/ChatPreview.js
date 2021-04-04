import React from 'react'
import { useDispatch } from 'react-redux'
import { getDataParticularChannel } from '../../redux/reducers/reducerDataChannels'

const ChatPreview = ({ message, name, channelId }) => {
  const dispatch = useDispatch()

  const setChannelId = () => {
    return dispatch(getDataParticularChannel(channelId))
  }
  return (
    <li className="shadow-lg rounded-md border-b border-x border-gray-300 flex flex-row w-full mt-2 transition duration-500 hover:bg-gray-300">
      <button
        type="button"
        onClick={setChannelId}
        className="flex w-full flex-row  relative focus:outline-none rounded-md"
      >
        <div className="whitespace-nowrap absolute top-0 right-0 text-xs text-gray-700 text-opacity-75">
          24 days ago
        </div>
        <div className="flex w-full flex-row rounded-md items-center  ">
          <div className="ml-1 flex items-center justify-center min-w-1/6 h-10 mr-1 rounded-full bg-cyan-700 text-gray-300 font-bold flex-shrink-0">
            T r
          </div>
          <div className="my-2 flex flex-col min-w-4/6">
            <span className="pl-1 text-left font-semibold text-base truncate">{name}</span>
            <span className="pl-1 text-gray-700 text-opacity-75 text-left font-medium truncate text-xs">
              {message}
            </span>
          </div>
          <div className="px-2 pb-2 self-end min-w-1/6">
            <div className="bg-red-400 h-6 rounded-full">
              <span className="text-center text-xs font-medium text-opacity-75">9</span>
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}

ChatPreview.propTypes = {}

export default React.memo(ChatPreview)
