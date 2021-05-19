import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import LoggedUser from './viewMessage/ViewMessageLoggedUser'
import OtherUsers from './viewMessage/ViewMessageOtherUsers'
import ServiceMessage from './viewMessage/ViewMessageServiceBot'

import { setFlagRenderContextMenu } from '../../redux/reducers/reducerSetFlagRender'
import DeleteDataFromDB from '../sideBar/manipulationWithDataFromDB/DeleteDataFromDB'
import ChangeDataFromDB from '../sideBar/manipulationWithDataFromDB/ChangeDataFromDB'
import ShellModal from '../reuseComponent/ShellModal'

const ChatHistoryMessages = ({
  messages,
  etoSoobshenieNapisalImennoTi,
  idParticularMessage,
  setIdParticularMessage
}) => {
  const { flagRenderContextMenu } = useSelector((s) => s.reducerSetFlagRender)
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
            key={idMessage}
            objMessage={objMessage}
            setIdParticularMessage={setIdParticularMessage}
            setContextMenuDataCoord={setContextMenuDataCoord}
            contextMenuDataCoord={contextMenuDataCoord}
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
          <ChangeDataFromDB />
          <DeleteDataFromDB idParticularMessage={idParticularMessage} />
        </ShellModal>
      )}
    </div>
  )
}

ChatHistoryMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  etoSoobshenieNapisalImennoTi: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  idParticularMessage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setIdParticularMessage: PropTypes.func
}

ChatHistoryMessages.defaultProps = {
  messages: [],
  idParticularMessage: null,
  setIdParticularMessage: () => {}
}

export default React.memo(ChatHistoryMessages)
