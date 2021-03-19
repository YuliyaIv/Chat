import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Channels from './Channels'
import UserList from './UserList'

const SideBarView = () => {
  const flagRender = useSelector((s) => s.reducerSetFlagRenderSideBarView.flag)
  const [renderComponent, setRenderComponent] = useState(<UserList />)

  useEffect(() => {
    if (flagRender === 'userList') {
      setRenderComponent(<UserList />)
    }
    if (flagRender === 'channels') {
      setRenderComponent(<Channels />)
    }
  }, [flagRender])

  return (
    <div>
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="text-xl font-semibold">Messages</div>
            <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
              5
            </div>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full"
            >
              <svg
                className="w-4 h-4 stroke-current"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-5">
          <ul className="flex flex-row items-center justify-between">
            <li>
              <a
                href="#"
                className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800"
              >
                <span>All Conversations</span>
                <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
                <span>Archived</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
                <span>Starred</span>
              </a>
            </li>
          </ul>
        </div>
        <h2>Team chat start</h2>
        <h2>Team chat end</h2>
        <div>{renderComponent}</div>
        <h2>Personal chat start</h2>

        <h2>Personal chat end</h2>
      </div>
    </div>
  )
}

SideBarView.propType = {}

export default SideBarView
