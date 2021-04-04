import React from 'react'

const ServiceMessage = ({ objMessage }) => {
  return (
    <div className="p-2 col-start-3 col-end-9 border mt-auto">
      <div className="flex flex-row justify-center items-center">
        <div className="ml-3 bg-indigo-100 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div className="italic ">{objMessage.textMessage}</div>
        </div>
      </div>
    </div>
  )
}

ServiceMessage.propType = {}

export default React.memo(ServiceMessage)
