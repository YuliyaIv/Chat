import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import LoggedUser from './viewMessage/ViewMessageLoggedUser'
import OtherUsers from './viewMessage/ViewMessageOtherUsers'
import ServiceMessage from './viewMessage/ViewMessageServiceBot'
import ShellModal from '../reuseComponent/shellModal'
import { setFlagRenderContextMenu } from '../../redux/reducers/reducerSetFlagRender'
import DeleteDataFromDB from '../reuseComponent/DeleteDataFromDB'
import ChangeDataFromDB from '../reuseComponent/ChangeDataFromDB'

const ChatHistoryMessages = ({ messages, etoSoobshenieNapisalImennoTi }) => {
  const { flagRenderContextMenu } = useSelector((s) => s.reducerSetFlagRender)
  const { dataParticularId } = useSelector((s) => s.reducerDataChannels)
  const [idDeleteMessage, setIdDeleteMessage] = useState()
  const [contextMenuDataCoord, setContextMenuDataCoord] = useState({
    x: 0,
    y: 0
  })

  const renderMessage = () => {
    return messages.map((objMessage) => {
      const indexUser = objMessage.idUserPostedMessage

      const { idMessage } = objMessage

      if (etoSoobshenieNapisalImennoTi === indexUser) {
        return (
          <LoggedUser
            setIdDeleteMessage={setIdDeleteMessage}
            setContextMenuDataCoord={setContextMenuDataCoord}
            contextMenuDataCoord={contextMenuDataCoord}
            objMessage={objMessage}
            dataParticularIdChannel={dataParticularId}
            key={idMessage}
            flagRenderContextMenu={flagRenderContextMenu.flag}
            setFlagRenderContextMenu={setFlagRenderContextMenu}
          />
        )
      }
      if (indexUser === 'serviceBot') {
        return <ServiceMessage objMessage={objMessage} key={idMessage} />
      }
      return <OtherUsers objMessage={objMessage} key={idMessage} />
    })
  }

  return (
    <div className="scroll-bar flex flex-col h-full overflow-y-auto py-4 flex-1">
      {renderMessage()}
      {flagRenderContextMenu.flag && flagRenderContextMenu.typeOfContent === 'message' && (
        <ShellModal
          contextMenuDataCoord={contextMenuDataCoord}
          setFlagRenderContextMenu={setFlagRenderContextMenu}
          flagRenderContextMenu={flagRenderContextMenu.flag}
        >
          <ChangeDataFromDB type="message" id={dataParticularId} />
          <DeleteDataFromDB
            type="message"
            id={dataParticularId}
            idMessage={idDeleteMessage}
            dataParticularIdChannel={dataParticularId}
          />
        </ShellModal>
      )}
    </div>
  )
}

ChatHistoryMessages.propTypes = {}

export default React.memo(ChatHistoryMessages)
