import React from 'react'
import { useDispatch } from 'react-redux'
import { setFlagRenderSideBarView } from '../../../redux/reducers/reducerSetFlagRender'

const ButtonUsersList = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <button
        type="button"
        className="flex items-center focus:outline-none"
        onClick={() => {
          dispatch(setFlagRenderSideBarView('showComponentUserList'))
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}

ButtonUsersList.propType = {}

export default React.memo(ButtonUsersList)
