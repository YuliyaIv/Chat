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
    <div className="flex flex-col w-4/5 pl-2 pr-1 py-4 border-4 border-green-600">
      {renderComponent}
    </div>
  )
}

SideBarView.propType = {}

export default React.memo(SideBarView)
