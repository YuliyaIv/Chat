import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SideBar from './sideBar/SideBar'
import ChatMainWindow from './mainWindowChat/ChatMainWindow'

import { getDataChannels } from '../redux/reducers/reducerDataChannels'
import { getDataCard } from '../redux/reducers/reducerDataCard'

const Chat = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataCard())
  }, [])

  useEffect(() => {
    dispatch(getDataChannels())
  }, [])

  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
        <SideBar />
      </div>
      <div className="z-0 flex flex-col h-full w-full bg-white px-4 py-6">
        <ChatMainWindow />
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
