import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFlagRenderModalWindow } from '../../../redux/reducers/reducerSetFlagRender'
import { changeChannelNameOrDescriptionDB } from '../../../redux/reducers/reducerDBDataChannel'

const FormChangeDataChannel = () => {
  // must be input validation with reg express
  const dispatch = useDispatch()
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  const { particularChannelData, particularChannelId } = useSelector((s) => s.reducerDBDataChannel)
  const [inputText, setInputText] = useState({ text: '', whatСhange: '' })

  useEffect(() => {
    if (flagRenderModalWindow.whatOpen === 'changeChannelName') {
      setInputText({ text: particularChannelData.channelName, whatСhange: 'channelName' })
    } else if (flagRenderModalWindow.whatOpen === 'changeDescription') {
      setInputText({ text: particularChannelData.description, whatСhange: 'description' })
    }
  }, [flagRenderModalWindow])

  const triggerModal = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag))
  }

  const changeData = (e) => {
    setInputText((state) => ({ ...state, text: e.target.value }))
  }

  const clearForm = (e) => {
    e.preventDefault()
    setInputText({ whatСhange: '', text: '' })
    triggerModal()
  }
  const sendDataNameOrDescrition = (event) => {
    dispatch(changeChannelNameOrDescriptionDB(particularChannelId, inputText))
    clearForm(event)
  }

  const closeForm = (event) => {
    clearForm(event)
  }

  const selectPlaceholder =
    flagRenderModalWindow.whatOpen === 'changeChannelName' ? 'channel name' : 'description'

  return (
    <div className="font-sans container mx-auto px-4">
      <div className="relative flex flex-col sm:justify-center items-center bg-opacity-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-teal-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-lime-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            {selectPlaceholder}
            <form onSubmit={sendDataNameOrDescrition} method="#" action="#" className="mt-10">
              <div>
                <input
                  value={inputText.text}
                  onChange={changeData}
                  type="text"
                  placeholder={`enter new ${selectPlaceholder}`}
                  className="focus:outline-none mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="flex mt-7 justify-center w-full">
                <button
                  onClick={sendDataNameOrDescrition}
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
