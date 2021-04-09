import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ChatPreview from './ChatPreview'
import InputSearch from '../reuseComponent/InputSearch'
import SideBarViewRenderList from './SideBarViewRenderList'

import ShellModal from '../reuseComponent/shellModal'
import { setFlagRenderContextMenu } from '../../redux/reducers/reducerSetFlagRender'
import DeleteDataFromDB from '../reuseComponent/DeleteDataFromDB'
import ChangeDataFromDB from '../reuseComponent/ChangeDataFromDB'

const Channels = () => {
  const { flagRenderContextMenu } = useSelector((s) => s.reducerSetFlagRender)
  const { dataChannels, dataParticularId } = useSelector((s) => s.reducerDataChannels)

  const [contextMenuDataCoord, setContextMenuDataCoord] = useState({
    x: 0,
    y: 0
  })
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
        setContextMenuDataCoord={setContextMenuDataCoord}
        setFlagRenderContextMenu={setFlagRenderContextMenu}
        flagRenderContextMenu={flagRenderContextMenu}
        dataParticularId={dataParticularId}
      />
    )
  })
  return (
    <div className="flex flex-col h-full w-full  ">
      <InputSearch textPlaceholder="Search by message..." />

      <div className="flex flex-row items-center  ">
        <div className="text-xl text-gray-700   font-semibold">Messages</div>
        <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
          5
        </div>
      </div>
      <ul className="mt-3 pr-2 pl-2 pt-2 w-full flex flex-row items-center justify-between">
        <li>
          <a
            href="#"
            className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800"
          >
            <span>All Conversations</span>
            <span className="absolute left-0 bottom-0 h-1 w-2/6 bg-indigo-800 rounded-full" />
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center pb-3 text-xs w-2/6 text-gray-700 font-semibold">
            <span>Private</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center pb-3 text-xs w-2/6  text-gray-700 font-semibold">
            <span>Team</span>
          </a>
        </li>
      </ul>
      <SideBarViewRenderList forRender={renderChat} />
      {flagRenderContextMenu && (
        <ShellModal
          contextMenuDataCoord={contextMenuDataCoord}
          setFlagRenderContextMenu={setFlagRenderContextMenu}
          flagRenderContextMenu={flagRenderContextMenu}
        >
          <ChangeDataFromDB type="channel" id={dataParticularId} />
          <DeleteDataFromDB type="channel" id={dataParticularId} />
        </ShellModal>
      )}
    </div>
  )
}

Channels.propTypes = {}

export default React.memo(Channels)
