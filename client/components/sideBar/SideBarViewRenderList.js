import React from 'react'
import PropTypes from 'prop-types'

const SideBarViewRenderList = ({ forRender }) => {
  return (
    <ul className="scroll-bar flex flex-col h-full w-full items-center mt-2 p-2  overflow-y-auto">
      {forRender}
    </ul>
  )
}

SideBarViewRenderList.propTypes = {
  forRender: PropTypes.arrayOf(PropTypes.object)
}

SideBarViewRenderList.defaultProps = {
  forRender: []
}

export default React.memo(SideBarViewRenderList)
