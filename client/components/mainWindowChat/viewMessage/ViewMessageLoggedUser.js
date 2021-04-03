import React from 'react'

const LoggedUser = ({ objMessage }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg border">
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
}

LoggedUser.propType = {}

export default React.memo(LoggedUser)
