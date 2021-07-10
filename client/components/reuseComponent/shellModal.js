import React, { useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { setFlagRenderContextMenu } from '../../redux/reducers/reducerSetFlagRender'

const ShellModal = ({ contextMenuDataCoord: { x, y }, children }) => {
  const { flagRenderContextMenu } = useSelector((s) => s.reducerSetFlagRender)
  const dispatch = useDispatch()
  const modal = document.createElement('div')
  const rootElement = document.querySelector('#root')

  const handleClickOutsideFromModal = useCallback(
    (e) => {
      if (!e.path.includes(rootElement)) {
        dispatch(setFlagRenderContextMenu(!flagRenderContextMenu))
      }
    },
    [flagRenderContextMenu, rootElement]
  )

  const handleClickOutsideFromRoot = useCallback(
    (e) => {
      if (flagRenderContextMenu && e.path.includes(rootElement)) {
        dispatch(setFlagRenderContextMenu(!flagRenderContextMenu))
      }
    },
    [flagRenderContextMenu, rootElement]
  )

  useEffect(() => {
    document.body.appendChild(modal)
    modal.addEventListener('click', handleClickOutsideFromModal)
    rootElement.addEventListener('click', handleClickOutsideFromRoot)
    modal.setAttribute('class', 'flex items-center justify-center')
    modal.setAttribute('style', `position: fixed; top: ${y}px; left: ${x}px;`)
    console.log(window.innerHeight, window.innerWidth)
    return () => {
      document.body.removeChild(modal)
      modal.removeEventListener('click', handleClickOutsideFromModal)
      rootElement.removeEventListener('click', handleClickOutsideFromRoot)
    }
  }, [])

  return ReactDOM.createPortal(
    <div id="modalWind" className="z-100 border  bg-gray-50 border-gray-300  rounded-md">
      <div className="flex flex-col shadow-lg text-sm">{children}</div>
    </div>,
    modal
  )
}

ShellModal.propTypes = {
  contextMenuDataCoord: PropTypes.objectOf(PropTypes.number).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ShellModal
