import React from 'react'

const ChangeNameChannel = () => {
  return (
    <div className=" p-1 bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200">
      Change name
    </div>
  )
}

ChangeNameChannel.propTypes = {}

export default React.memo(ChangeNameChannel)
