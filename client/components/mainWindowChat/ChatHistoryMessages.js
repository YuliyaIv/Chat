import React from 'react'

import LoggedUser from './viewMessage/ViewMessageLoggedUser'
import OtherUsers from './viewMessage/ViewMessageOtherUsers'
import ServiceMessage from './viewMessage/ViewMessageServiceBot'

const ChatHistoryMessages = ({ messages, etoSoobshenieNapisalImennoTi }) => {
  const renderMessage = () => {
    return messages.map((objMessage) => {
      const indexUser = objMessage.idUserPostedMessage

      const { idMessage } = objMessage

      if (etoSoobshenieNapisalImennoTi === indexUser) {
        return <LoggedUser objMessage={objMessage} key={idMessage} />
      }
      if (indexUser === 'serviceBot') {
        return <ServiceMessage objMessage={objMessage} key={idMessage} />
      }
      return <OtherUsers objMessage={objMessage} key={idMessage} />
    })
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto py-4 flex-1 border  ">
      {renderMessage()}
    </div>
  )
}

ChatHistoryMessages.propTypes = {}

export default React.memo(ChatHistoryMessages)
