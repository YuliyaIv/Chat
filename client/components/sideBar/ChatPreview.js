import React from 'react'
import { useDispatch } from 'react-redux'
import { getDataParticularChannel } from '../../redux/reducers/reducerDataChannels'

const ChatPreview = ({ message, name, channelId }) => {
  const dispatch = useDispatch()

  const setChannelId = () => {
    return dispatch(getDataParticularChannel(channelId))
  }
  return (
    <li className="border-gray-400 flex flex-row w-full mt-2 border-2 border-red-800 ">
      <button
        type="button"
        onClick={setChannelId}
        className="flex w-full focus:outline-none border-2 border-lime-800 rounded-md"
      >
        <div className="flex w-full flex-row rounded-md items-center  transition duration-500 hover:bg-gray-300 border-2 border-grey-800">
          <div className="flex items-center justify-center w-1/6 h-10 mr-1 rounded-full bg-cyan-700 text-gray-300 font-bold flex-shrink-0 ">
            T r
          </div>
          <div className="flex flex-col  w-4/6 border-2 border-yellow-800">
            <span className=" pl-1 text-left font-medium border-2 text-base border-green-800">
              {name}
            </span>
            <span className=" pl-1 text-left w-full  font-medium truncate text-xs border-2 border-lime-800">
              {message}
            </span>
          </div>
          <div className="flex flex-col w-1/6">
            <span className="whitespace-nowrap text-xs"> 25 min </span>
            <span className="flex items-center justify-center ml-2  h-7 w-7 bg-red-500 rounded-full font-medium">
              <span className="flex text-xs justify-center"> 999.. </span>
            </span>
          </div>
        </div>
      </button>
    </li>
  )
}

ChatPreview.propTypes = {}

export default React.memo(ChatPreview)
