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
      //  console.log('remove document Modal')
      return document.body.removeChild(modal)
    }
  }, [])

  const handleClickOutsideFromModal = useCallback((e) => {
    if (!e.path.includes(rootElement)) {
      //  console.log('modal element', flagRenderContextMenu)
      dispatch(setFlagRenderContextMenu(!flagRenderContextMenu, null))
    }
  })

  const handleClickOutsideFromRoot = useCallback((e) => {
    if (flagRenderContextMenu && e.path.includes(rootElement)) {
      // console.log('rootElement', flagRenderContextMenu)
      dispatch(setFlagRenderContextMenu(!flagRenderContextMenu, null))
    }
  })

  useEffect(() => {
    modal.addEventListener('click', handleClickOutsideFromModal)
    // console.log('create modal event')
    return () => {
      modal.removeEventListener('click', handleClickOutsideFromModal)
      // console.log('remove modal')
    }
  }, [])

  useEffect(() => {
    rootElement.addEventListener('click', handleClickOutsideFromRoot)
    // console.log('add listener rootElement')
    return () => {
      rootElement.removeEventListener('click', handleClickOutsideFromRoot)
      // console.log('remove rootElement')
    }
  }, [])

  return ReactDOM.createPortal(
    <div id="modalWind" className="z-100 border  bg-gray-50 border-gray-400 shadow-lg rounded-md">
      <div className="p-1 bg-gray-50 shadow-lg rounded-md">{children}</div>
    </div>,
    modal
  )
}

ShellModal.propTypes = {}

export default ShellModal
