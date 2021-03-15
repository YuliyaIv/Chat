import React from 'react'

import SideBarNavigate from './SideBarNavigate'
import SideBarView from './SideBarView'

const Sidebar = () => {
  return (
    <div className="flex items-start justify-start">
      <SideBarNavigate />
      <SideBarView />
    </div>
  )
}

Sidebar.propTypes = {}

export default React.memo(Sidebar)
