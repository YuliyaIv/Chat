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
    dispatch(getDataChannels())
  }, [])

  return (
    <div className="flex flex-row h-screen w-screen fixed  antialiased text-gray-800">
      <SideBar />
      <ChatMainWindow />
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
