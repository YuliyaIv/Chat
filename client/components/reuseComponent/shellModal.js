import React, { useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setFlagRenderContextMenu } from '../../redux/reducers/reducerSetFlagRender'

const ShellModal = ({ contextMenuDataCoord: { x, y }, children }) => {
  const { flagRenderContextMenu } = useSelector((s) => s.reducerSetFlagRender)
  const dispatch = useDispatch()
  const modal = document.createElement('div')
  const rootElement = document.querySelector('#root')

  useEffect(() => {
    document.body.appendChild(modal)
    modal.setAttribute('class', 'flex items-center justify-center')
    modal.setAttribute('style', `position: fixed; top: ${y}px; left: ${x}px;`)
    return () => {
      return document.body.removeChild(modal)
    }
  }, [])

  const handleClickOutsideFromModal = useCallback((e) => {
    if (!e.path.includes(rootElement)) {
      dispatch(setFlagRenderContextMenu(!flagRenderContextMenu, null))
    }
  })

  const handleClickOutsideFromRoot = useCallback((e) => {
    if (flagRenderContextMenu && e.path.includes(rootElement)) {
      dispatch(setFlagRenderContextMenu(!flagRenderContextMenu, null))
    }
  })

  useEffect(() => {
    modal.addEventListener('click', handleClickOutsideFromModal)
    return () => {
      modal.removeEventListener('click', handleClickOutsideFromModal)
    }
  }, [])

  useEffect(() => {
    rootElement.addEventListener('click', handleClickOutsideFromRoot)
    return () => {
      rootElement.removeEventListener('click', handleClickOutsideFromRoot)
    }
  }, [])

  return ReactDOM.createPortal(
    <div id="modalWind" className="z-100 border  bg-gray-50 border-gray-400 shadow-lg rounded-md">
      <div className="flex flex-col p-1 bg-gray-50 shadow-lg rounded-md">{children}</div>
    </div>,
    modal
  )
}

ShellModal.propTypes = {}

export default ShellModal
