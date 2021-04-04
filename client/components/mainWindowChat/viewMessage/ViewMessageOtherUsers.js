import React from 'react'

const OtherUsers = ({ objMessage }) => {
  return (
    <div className=" col-start-1 col-end-8 p-3 rounded-lg border">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className="relative  bg-gray-50 ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{objMessage.textMessage}</div>
        </div>
      </div>
    </div>
  )
}

OtherUsers.propType = {}

export default React.memo(OtherUsers)