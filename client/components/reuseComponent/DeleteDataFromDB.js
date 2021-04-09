import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteChannel } from '../../redux/reducers/reducerDataChannels'

const DeleteDataFromDB = ({ type, id }) => {
  const dispatch = useDispatch()
  const sendActionDelete = () => {
    dispatch(deleteChannel(id))
  }
  return (
    <button
      type="button"
      onClick={sendActionDelete}
      className=" p-1  bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200"
    >
      Delete {type}
    </button>
  )
}

DeleteDataFromDB.propTypes = {}

export default React.memo(DeleteDataFromDB)
