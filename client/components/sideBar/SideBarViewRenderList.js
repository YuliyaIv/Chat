import React from 'react'

const SideBarViewRenderList = ({ forRender }) => {
  return (
    <ul className="scroll-bar flex flex-col h-full w-full items-center mt-2 p-2 border-4 border-lime-800 overflow-y-auto">
      {forRender}
    </ul>
  )
}

SideBarViewRenderList.propTypes = {}

export default React.memo(SideBarViewRenderList)
