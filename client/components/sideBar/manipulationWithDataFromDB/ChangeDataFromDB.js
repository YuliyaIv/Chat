import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setFlagChangeMessage,
  setFlagRenderModalWindow
} from '../../../redux/reducers/reducerSetFlagRender'

const ChangeDataFromDB = () => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow, flagRenderContextMenu } = useSelector(
    (s) => s.reducerSetFlagRender
  )
  const { typeOfContent } = flagRenderContextMenu

  const sendDispatchChangeNameChannel = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag, 'changeChannelName'))
  }
  const sendDispatchDescription = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag, 'changeDescription'))
  }
  const sendDispatchChangeMessage = () => {
    dispatch(setFlagChangeMessage(true))
  }

  const actionChangeDataType = () => {
    if (typeOfContent === 'message') {
      return sendDispatchChangeMessage()
    }
    return sendDispatchChangeNameChannel()
  }

  return (
    <div className="flex flex-col ">
      <button
        onClick={actionChangeDataType}
        type="button"
        className=" bg-gray-50 shadow-lg px-3 py-1 duration-500 border border-gray-200 hover:bg-gray-200"
      >
        Change name
      </button>

      {typeOfContent === 'channel' && (
        <button
          onClick={sendDispatchDescription}
          type="button"
          className=" bg-gray-50 shadow-lg px-3 py-1 duration-500 border border-gray-2200 hover:bg-gray-200"
        >
          Change description
        </button>
      )}
    </div>
  )
}

ChangeDataFromDB.propTypes = {}

export default React.memo(ChangeDataFromDB)
