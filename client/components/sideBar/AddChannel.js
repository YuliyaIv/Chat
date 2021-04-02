import React from 'react'
import { useDispatch } from 'react-redux'

import ModalWindow from '../reuseComponent/ModalWindow'
import FormAddChannel from './formAddChannel'
import NewObjChannel from '../../helperFunction/mainFunctionAddChannel'

import { setNewChannelActionCreator } from '../../redux/reducers/reducerDataChannels'
import NewObjMessage from '../../helperFunction/mainFunctionCreateMessage'

const AddChannel = () => {
  const dispatch = useDispatch()

  const runDispatchFromAcceptButton = (channelNameFromForm, descriptionFromForm) => {
    const serviceMessage = new NewObjMessage('1', 'serviceBot', 'You create the channel')

    const channel = new NewObjChannel(
      channelNameFromForm,
      'idUser11111',
      descriptionFromForm,
      serviceMessage
    )

    dispatch(setNewChannelActionCreator({ id4561315768768643: channel }))
  }

  return (
    <ModalWindow>
      <FormAddChannel runDispatchFromAcceptButton={runDispatchFromAcceptButton} />
    </ModalWindow>
  )
}

AddChannel.propTypes = {}
export default React.memo(AddChannel)
