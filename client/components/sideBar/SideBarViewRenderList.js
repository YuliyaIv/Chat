import React from 'react'

const SideBarViewRenderList = ({ forRender }) => {
  return (
    <ul className="scroll-bar flex flex-col h-full w-full items-center mt-2 p-2  overflow-y-auto">
      {forRender}
    </ul>
  )
}

SideBarViewRenderList.propTypes = {}

export default React.memo(SideBarViewRenderList)
