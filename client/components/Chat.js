import React from 'react'
import ChatMainWindow from './mainWindowChat/ChatMainWindow'
import SideBar from './sideBar/SideBar'

const Chat = () => {
  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
        <SideBar />
      </div>
      <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
        <ChatMainWindow />
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
