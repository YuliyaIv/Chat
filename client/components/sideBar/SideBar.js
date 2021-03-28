import React from 'react'

import SideBarNavigate from './SideBarNavigate'
import SideBarView from './SideBarView'

const Sidebar = () => {
  return (
    <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
      <div className="flex items-start justify-start">
        <SideBarNavigate />
        <SideBarView />
      </div>
    </div>
  )
}

Sidebar.propTypes = {}

export default React.memo(Sidebar)
