import React from 'react'
import ChatHistoryMessages from './ChatHistoryMessages'
import ChatInput from './ChatInput'
import ChatPannel from './ChatPannel'

const ChatMainWindow = () => {
  return (
    <div>
      <ChatPannel />
      <ChatHistoryMessages />
      <ChatInput />
    </div>
  )
}

ChatMainWindow.propTypes = {}

export default React.memo(ChatMainWindow)
