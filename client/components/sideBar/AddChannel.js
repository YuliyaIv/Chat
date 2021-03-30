import React from 'react'
import ModalWindow from '../reuseComponent/ModalWindow'
import FormAddChannel from './formAddChannel'

const AddChannel = () => {
  return <ModalWindow component={<FormAddChannel />} />
}

AddChannel.propTypes = {}
export default React.memo(AddChannel)
