import React from 'react'

const DeleteChannel = () => {
  return (
    <div className=" p-1  bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200">
      Delete channel
    </div>
  )
}

DeleteChannel.propTypes = {}

export default React.memo(DeleteChannel)
