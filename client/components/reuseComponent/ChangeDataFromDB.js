import React from 'react'

const ChangeDataFromDB = ({ type }) => {
  return (
    <div className=" p-1 bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200">
      Change {type}
    </div>
  )
}

ChangeDataFromDB.propTypes = {}

export default React.memo(ChangeDataFromDB)
