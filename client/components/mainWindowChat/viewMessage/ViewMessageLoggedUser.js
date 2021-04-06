import React from 'react'

const LoggedUser = ({ objMessage }) => {
  return (
    <div className="flex flex justify-end p-3 w-3/4 rounded-lg ml-auto">
      <div className="flex items-center  justify-start flex-row-reverse">
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
