import React from 'react'
import PropTypes from 'prop-types'

const ServiceMessage = ({ objMessage }) => {
  return (
    <div className="p-2 mt-auto">
      <div className="flex flex-row justify-center items-center">
        <div className="ml-3 border-violet-200 bg-gradient-to-r from-violet-200 to to-blue-200 text-sm  py-2 px-4 shadow rounded-xl">
          <div className="italic ">{objMessage.textMessage}</div>
        </div>
      </div>
    </div>
  )
}

ServiceMessage.propType = {
  objMessage: PropTypes.object
}

export default React.memo(ServiceMessage)
