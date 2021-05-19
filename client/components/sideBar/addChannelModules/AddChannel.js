import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalWindow from '../../reuseComponent/ModalWindow'
import FormAddChannel from './FormAddChannel'
import NewObjChannel from '../../../helperFunction/mainFunctionAddChannel'

import { setNewChannelActionCreator } from '../../../redux/reducers/reducerDataChannels'
import NewObjMessage from '../../../helperFunction/mainFunctionCreateMessage'
import {
  setFlagRenderModalWindow,
  setFlagRenderSideBarView
} from '../../../redux/reducers/reducerSetFlagRender'

const AddChannel = () => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)

  const triggerModal = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag))
  }

  const triggerChannel = () => {
    dispatch(setFlagRenderSideBarView('showComponentChannels'))
  }

  const runDispatchFromAcceptButton = (channelNameFromForm, descriptionFromForm) => {
    const serviceMessage = new NewObjMessage('1', 'serviceBot', 'You create the channel')

    const channel = new NewObjChannel(
      channelNameFromForm,
      'idUser11111',
      descriptionFromForm,
      serviceMessage
    )

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    const idNewChannel = getRandomArbitrary(0, 10000000)
    dispatch(setNewChannelActionCreator({ [idNewChannel]: channel }))
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
