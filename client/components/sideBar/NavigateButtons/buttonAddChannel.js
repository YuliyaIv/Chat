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
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}

ButtonAddChannel.propType = {}

export default ButtonAddChannel
