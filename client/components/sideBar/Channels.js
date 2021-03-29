import React from 'react'
import { useSelector } from 'react-redux'
import ChatPreview from './ChatPreview'
import InputSearch from '../reuseComponent/InputSearch'

const Channels = () => {
  const { dataChannels } = useSelector((s) => s.reducerDataChannels)

  const renderChat = Object.keys(dataChannels).map((channelId) => {
    const messagesInChat = dataChannels[channelId].chatDataMessage
    const indexLastlMessage = messagesInChat.length - 1
    const getLastMessage = messagesInChat[indexLastlMessage].textMessage

    return (
      <ChatPreview
        key={channelId}
        channelId={channelId}
        name={dataChannels[channelId].channelName}
        message={getLastMessage}
      />
    )
  })

  return (
    <div>
      <InputSearch textPlaceholder="Search by message..." />
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold">Messages</div>
        <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
          5
        </div>
      </div>
      <div className="mt-5">
        <ul className="flex flex-row items-center justify-between">
          <li>
            <a
              href="#"
              className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800"
            >
              <span>All Conversations</span>
              <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full" />
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
              <span>Private</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
              <span>Team</span>
            </a>
          </li>
        </ul>
      </div>
      {renderChat}
    </div>
  )
}

Channels.propTypes = {}

export default React.memo(Channels)
