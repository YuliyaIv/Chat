import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getDataChannels } from '../../redux/reducers/reducerDataChannels'
import ChatHistoryMessages from './ChatHistoryMessages'
import ChatInput from './ChatOrderInput/ChatInput'

import ChatPannel from './ChatPannel'
import WelcomeWindow from './WelcomeWindow'

const ChatMainWindow = () => {
  const { dataParticularId, dataChannels, newMessage } = useSelector((s) => s.reducerDataChannels)
  const [idParticularMessage, setIdParticularMessage] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataChannels())
  }, [newMessage])

  if (!dataParticularId || !dataChannels[dataParticularId]) {
    return <WelcomeWindow />
  }

  const { channelName } = dataChannels[dataParticularId]
  const { description } = dataChannels[dataParticularId]
  const idAdmin = dataChannels[dataParticularId].channelAdmin
  const messages = dataChannels[dataParticularId].chatDataMessage

  return (
    <div className="bg-gradient-to-r from-gray-50 to-cyan-50  flex flex-col  h-screen w-3/4 bg-white px-4 py-6">
      <ChatPannel channelName={channelName} description={description} />
      <ChatHistoryMessages
        messages={messages}
        etoSoobshenieNapisalImennoTi={idAdmin}
        setIdParticularMessage={setIdParticularMessage}
        idParticularMessage={idParticularMessage}
      />
      <ChatInput idParticularMessage={idParticularMessage} channelName={channelName} />
    </div>
  )
}

ChatMainWindow.propTypes = {}

export default React.memo(ChatMainWindow)
