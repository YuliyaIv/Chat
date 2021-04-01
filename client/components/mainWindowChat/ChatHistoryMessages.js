import React from 'react'

const ChatHistoryMessages = ({ messages, etoSoobshenieNapisalImennoTi }) => {
  const renderMessage = () => {
    if (messages.length >= 1) {
      return messages.map((objMessage, index) => {
        if (etoSoobshenieNapisalImennoTi !== objMessage.idUserPostedMessage) {
          return (
            <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
              <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  A
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div>{objMessage.textMessage}</div>
                </div>
              </div>
            </div>
          )
        }
        return (
          <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                A
              </div>
              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                <div>{objMessage.textMessage}</div>
              </div>
            </div>
          </div>
        )
      })
    }
    return (
      <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-center">Нет сообщений</div>
      </div>
    )
  }

  return (
    <div>
      <div className="h-full overflow-hidden py-4 ">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">{renderMessage()}</div>
        </div>
      </div>
    </div>
  )
}

ChatHistoryMessages.propTypes = {}

export default React.memo(ChatHistoryMessages)
