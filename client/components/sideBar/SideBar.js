import React from 'react'

import SideBarNavigate from './SideBarNavigate'
import SideBarView from './SideBarView'

const Sidebar = () => {
  return (
    <div className="flex flex-row w-1/4 flex-shrink-0 bg-gray-100 p-2 border-r-2 border-gray-300">
      <SideBarNavigate />
      <SideBarView />
    </div>
  )
}

Sidebar.propTypes = {}

export default React.memo(Sidebar)
