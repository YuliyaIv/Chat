import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddChannel from './addChannelModules/AddChannel'

import Channels from './channelsModule/Channels'
import UsersList from './usersModules/UsersList'

const SideBarView = () => {
  const { flagRenderSideBarView } = useSelector((s) => s.reducerSetFlagRender)
  const [startComponent, setRenderComponent] = useState(<Channels />)

  useEffect(() => {
    if (flagRenderSideBarView === 'showComponentUserList') setRenderComponent(<UsersList />)
    if (flagRenderSideBarView === 'showComponentChannels') setRenderComponent(<Channels />)
    if (flagRenderSideBarView === 'showComponentAddChanel') setRenderComponent(<AddChannel />)
  }, [flagRenderSideBarView])

  return <div className="flex flex-col w-4/5 pl-2 pr-1 py-4 ">{startComponent}</div>
}

SideBarView.propType = {}

export default React.memo(SideBarView)
