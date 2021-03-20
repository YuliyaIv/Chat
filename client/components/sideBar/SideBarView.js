import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Channels from './Channels'
import UserList from './UserList'

const SideBarView = () => {
  const flagRender = useSelector((s) => s.reducerSetFlagRenderSideBarView.flag)
  const [renderComponent, setRenderComponent] = useState(<Channels />)

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
        <div>{renderComponent}</div>
      </div>
    </div>
  )
}

SideBarView.propType = {}

export default SideBarView
