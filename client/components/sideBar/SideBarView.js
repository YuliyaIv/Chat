import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AddChannel from './AddChannel'
import Channels from './Channels'
import UserList from './UserList'

const SideBarView = () => {
  const { flagRenderSideBarView } = useSelector((s) => s.reducerSetFlagRender)
  const [renderComponent, setRenderComponent] = useState(<Channels />)

  useEffect(() => {
    if (flagRenderSideBarView === 'showComponentUserList') setRenderComponent(<UserList />)
    if (flagRenderSideBarView === 'showComponentChannels') setRenderComponent(<Channels />)
    if (flagRenderSideBarView === 'showComponentAddChanel') setRenderComponent(<AddChannel />)
  }, [flagRenderSideBarView])

  return (
    <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 overflow-y-auto">
      {renderComponent}
    </div>
  )
}

SideBarView.propType = {}

export default React.memo(SideBarView)
