import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setFlagRenderSideBarView,
  setFlagRenderModalWindow
} from '../../../redux/reducers/reducerSetFlagRender'

const ButtonAddChannel = () => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  return (
    <div>
      <button
        type="button"
        href="#"
        className="focus:outline-none flex items-center"
        onClick={() => {
          dispatch(setFlagRenderSideBarView('showComponentAddChanel'))
          dispatch(setFlagRenderModalWindow(!flagRenderModalWindow))
        }}
      >
        <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-700 h-12 w-12 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}

ButtonAddChannel.propType = {}

export default ButtonAddChannel
