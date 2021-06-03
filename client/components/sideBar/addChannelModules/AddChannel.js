import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalWindow from '../../reuseComponent/ModalWindow'
import FormAddChannel from './FormAddChannel'
import NewObjChannel from '../../../helperFunction/mainFunctionAddChannel'

import { setNewChannelDB } from '../../../redux/reducers/reducerDBDataChannel'
// import { setNewChannelActionCreator } from '../../../redux/reducers/reducerDataChannels'
// import NewObjMessage from '../../../helperFunction/mainFunctionCreateMessage'
import {
  setFlagRenderModalWindow,
  setFlagRenderSideBarView
} from '../../../redux/reducers/reducerSetFlagRender'

const AddChannel = () => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  // const { particularChannelId } = useSelector((s) => s.reducerDBDataChannel)
  const { user } = useSelector((s) => s.reducerAuth)

  const triggerModal = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag))
  }

  const triggerChannel = () => {
    dispatch(setFlagRenderSideBarView('showComponentChannels'))
  }

  const runDispatchFromAcceptButton = (channelNameFromForm, descriptionFromForm) => {
    const newChannel = new NewObjChannel(channelNameFromForm, user._id, descriptionFromForm)
    dispatch(setNewChannelDB(newChannel))
  }

  return (
    <ModalWindow>
      <FormAddChannel
        runDispatchFromAcceptButton={runDispatchFromAcceptButton}
        triggerModal={triggerModal}
        triggerChannel={triggerChannel}
      />
    </ModalWindow>
  )
}

AddChannel.propTypes = {}
export default React.memo(AddChannel)
