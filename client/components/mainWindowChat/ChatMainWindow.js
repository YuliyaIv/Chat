import React from 'react'
import { useSelector } from 'react-redux'
import ChatHistoryMessages from './ChatHistoryMessages'
import ChatInput from './ChatInput'
import ChatPannel from './ChatPannel'

const ChatMainWindow = () => {
  const { dataParticularChannel } = useSelector((s) => s.reducerDataChannels)
  const messages = dataParticularChannel.chatDataMessage
  const idAdmin = dataParticularChannel.channelAdmin
  const { channelName } = dataParticularChannel
  return (
    <div className="z-0">
      <ChatPannel channelName={channelName} />
      <ChatHistoryMessages messages={messages} etoSoobshenieNapisalImennoTi={idAdmin} />
      <ChatInput />
    </div>
  )
}

ChatMainWindow.propTypes = {}

export default React.memo(ChatMainWindow)
