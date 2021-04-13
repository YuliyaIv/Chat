import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFlagRenderModalWindow } from '../../../redux/reducers/reducerSetFlagRender'
import { changeNameChannelActionCreator } from '../../../redux/reducers/reducerDataChannels'

const FormChangeDataChannel = () => {
  const dispatch = useDispatch()
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  const { dataChannels, dataParticularId } = useSelector((s) => s.reducerDataChannels)
  const currentName = dataChannels[dataParticularId].channelName
  const currentDesription = dataChannels[dataParticularId].description
  const [newNameChannel, setNewNameChannel] = useState(currentName)
  const [newDescription, setNewDescription] = useState(currentDesription)

  const triggerModal = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag))
  }
  console.log(newNameChannel)
  const changeNameChannel = (e) => {
    setNewNameChannel(e.target.value)
  }
  const changeDescription = (e) => {
    setNewDescription(e.target.value)
  }

  const clearForm = (e) => {
    e.preventDefault()
    setNewNameChannel('')
    setNewDescription('')
    triggerModal()
  }
  const sendDataName = (event) => {
    dispatch(changeNameChannelActionCreator(dataParticularId, newNameChannel))
    clearForm(event)
  }
  // const sendDataDescription = (event) => {
  //   отправляет измененные данные на сервер  дискрипшина
  //   clearForm(event)
  // }
  const closeForm = (event) => {
    clearForm(event)
  }

  const chooseHeader = () => {
    return `Change ${
      flagRenderModalWindow.whatOpen === 'changeChannelName' ? 'channel name' : 'description'
    }`
  }

  const openBlock = (arg) => {
    if (arg === 'changeChannelName') {
      return (
        <div>
          <input
            value={newNameChannel}
            type="text"
            onChange={changeNameChannel}
            placeholder=" Channel name"
            className="focus:outline-none mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
          />
        </div>
      )
    }
    return (
      <div>
        <input
          value={newDescription}
          onChange={changeDescription}
          type="text"
          placeholder="Description"
          className="focus:outline-none mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
        />
      </div>
    )
  }

  return (
    <div className="font-sans container mx-auto px-4">
      <div className="relative flex flex-col sm:justify-center items-center bg-opacity-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-teal-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-lime-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            {chooseHeader()}
            <form onSubmit={sendDataName} method="#" action="#" className="mt-10">
              {openBlock(flagRenderModalWindow.whatOpen)}
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="flex mt-7 justify-center w-full">
                <button
                  onClick={sendDataName}
                  type="button"
                  className="focus:outline-none  mr-5 bg-teal-600 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Accept
                </button>

                <button
                  onClick={closeForm}
                  type="button"
                  className="focus:outline-none bg-lime-600 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Сancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

FormChangeDataChannel.propTypes = {}
export default React.memo(FormChangeDataChannel)
