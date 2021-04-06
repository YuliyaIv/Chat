import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getDataChannels } from '../../redux/reducers/reducerDataChannels'
import ChatHistoryMessages from './ChatHistoryMessages'
import ChatInput from './ChatInput'
import ChatPannel from './ChatPannel'
import WelcomeWindow from './WelcomeWindow'

const ChatMainWindow = () => {
  const { dataParticularId, dataChannels, newMessage } = useSelector((s) => s.reducerDataChannels)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataChannels())
  }, [newMessage])

  if (!dataParticularId) {
    return <WelcomeWindow />
  }

  const { channelName } = dataChannels[dataParticularId]
  const idAdmin = dataChannels[dataParticularId].channelAdmin
  const messages = dataChannels[dataParticularId].chatDataMessage

  return (
    <div className=" bg-gradient-to-r from-gray-50 to-cyan-50 z-0 flex flex-col flex-1 h-screen w-3/4 bg-white px-4 py-6">
      <ChatPannel channelName={channelName} />
      <ChatHistoryMessages messages={messages} etoSoobshenieNapisalImennoTi={idAdmin} />
      <ChatInput channelName={channelName} />
    </div>
  )
}

ChatMainWindow.propTypes = {}

export default React.memo(ChatMainWindow)
