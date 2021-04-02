import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataChannels } from '../../redux/reducers/reducerDataChannels'
import ChatHistoryMessages from './ChatHistoryMessages'
import ChatInput from './ChatInput'
import ChatPannel from './ChatPannel'

const ChatMainWindow = () => {
  const { dataParticularId, dataChannels, newMessage } = useSelector((s) => s.reducerDataChannels)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataChannels())
  }, [newMessage])

  if (!dataParticularId) {
    return <div> Choose channel </div>
  }

  const { channelName } = dataChannels[dataParticularId]
  const idAdmin = dataChannels[dataParticularId].channelAdmin
  const messages = dataChannels[dataParticularId].chatDataMessage

  return (
    <div className="z-0 flex flex-col h-full w-full bg-white px-4 py-6">
      <ChatPannel channelName={channelName} />
      <ChatHistoryMessages messages={messages} etoSoobshenieNapisalImennoTi={idAdmin} />
      <ChatInput />
    </div>
  )
}

ChatMainWindow.propTypes = {}

export default React.memo(ChatMainWindow)
