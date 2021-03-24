import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Channels from './Channels'
import UserList from './UserList'

const SideBarView = () => {
  const flagRender = useSelector((s) => s.reducerSetFlagRenderSideBarView.flag)
  const [renderComponent, setRenderComponent] = useState(<Channels />)

  useEffect(() => {
    if (flagRender === 'userList') setRenderComponent(<UserList />)
    if (flagRender === 'channels') setRenderComponent(<Channels />)
  }, [flagRender])

  return (
    <div>
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-10">
        <div>{renderComponent}</div>
      </div>
    </div>
  )
}

SideBarView.propType = {}

export default SideBarView
