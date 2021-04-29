import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  setFlagRenderModalWindow,
  setFlagRenderSideBarView
} from '../../redux/reducers/reducerSetFlagRender'

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow, flagRenderSideBarView } = useSelector(
    (s) => s.reducerSetFlagRender
  )

  useEffect(() => {
    const modal = document.querySelector('#modal')
    const childModal = document.querySelector('#childModal')

    const handleClickOutside = (e) => {
      if (flagRenderSideBarView === 'showComponentAddChanel' && !e.path.includes(childModal)) {
        dispatch(setFlagRenderModalWindow(!flagRenderModalWindow))
        dispatch(setFlagRenderSideBarView('showComponentChannels'))
      } else if (
        flagRenderSideBarView !== 'showComponentAddChanel' &&
        !e.path.includes(childModal)
      ) {
        dispatch(setFlagRenderModalWindow(!flagRenderModalWindow))
      }
    }

    modal.addEventListener('click', (e) => handleClickOutside(e))
    return () => {
      return modal.removeEventListener('click', (e) => handleClickOutside(e))
    }
  }, [])

  return (
    <div
      id="modal"
      className="z-100 absolute w-screen h-screen top-0 left-0 flex items-center justify-center  bg-gray-200 bg-opacity-80"
    >
      <div id="childModal">{children} </div>
    </div>
  )
}

ModalWindow.propType = {
  children: PropTypes.element.isRequired
}

export default React.memo(ModalWindow)
