import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import ChatHistoryMessages from './ChatHistoryMessages'
import ChatInput from './ChatOrderInput/ChatInput'

import ChatPannel from './ChatPannel'
import WelcomeWindow from './WelcomeWindow'

const ChatMainWindow = () => {
  const { particularChannelId, particularChannelData } = useSelector((s) => s.reducerDBDataChannel)
  const userData = useSelector((s) => s.reducerAuth.user)
  const [idParticularMessage, setIdParticularMessage] = useState()

  if (!particularChannelId || !particularChannelData) {
    return <WelcomeWindow />
  }

  const { channelName } = particularChannelData
  const { description } = particularChannelData
  const idLoggedUser = userData._id
  const messages = particularChannelData.chatDataMessage

  return (
    <div className="bg-gradient-to-r from-gray-50 to-cyan-50  flex flex-col  h-screen w-3/4 bg-white px-4 py-6">
      <ChatPannel channelName={channelName} description={description} />
      <ChatHistoryMessages
        messages={messages}
        idLoggedUser={idLoggedUser}
        setIdParticularMessage={setIdParticularMessage}
        idParticularMessage={idParticularMessage}
      />
      <ChatInput
        idParticularMessage={idParticularMessage}
        particularChannelData={particularChannelData}
        particularChannelId={particularChannelId}
        idLoggedUser={idLoggedUser}
      />
    </div>
  )
}

ChatMainWindow.propTypes = {}

export default React.memo(ChatMainWindow)
