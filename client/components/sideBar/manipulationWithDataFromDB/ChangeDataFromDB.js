import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFlagRenderModalWindow } from '../../../redux/reducers/reducerSetFlagRender'

const ChangeDataFromDB = ({ type }) => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  const sendDispatchChangeName = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag, 'changeChannelName'))
  }
  const sendDispatchDescription = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag, 'changeDescription'))
  }

  return (
    <div className="flex flex-col ">
      <button
        onClick={sendDispatchChangeName}
        type="button"
        className=" p-1 bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200"
      >
        Change {type} name
      </button>
      {type === 'channel' && (
        <button
          onClick={sendDispatchDescription}
          type="button"
          className=" p-1 bg-gray-50 shadow-lg rounded-md duration-500 border border-gray-300 hover:bg-gray-200"
        >
          Change {type} descripton
        </button>
      )}
    </div>
  )
}

ChangeDataFromDB.propTypes = {}

export default React.memo(ChangeDataFromDB)
