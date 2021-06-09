import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { setFlagChangeMessage } from '../../../redux/reducers/reducerSetFlagRender'
import { setNewMessageDB, changeMessageDB } from '../../../redux/reducers/reducerDBDataChannel'

// must be full regular expression, event listener for closing change block, visual effect for text for change, little button for close change
const ChatInput = ({
  idParticularMessage,
  particularChannelId,
  idLoggedUser,
  particularChannelData
}) => {
  const { flagChangeMessage } = useSelector((s) => s.reducerSetFlagRender)
  const dispatch = useDispatch()
  const [textMessage, setTextMessage] = useState('')

  useEffect(() => {
    if (flagChangeMessage) {
      const listOfMessages = particularChannelData.chatDataMessage
      const objMessage = listOfMessages.find((message) => message._id === idParticularMessage)
      const prevTextMessage = objMessage.textMessage
      setTextMessage(prevTextMessage)
    } else if (!flagChangeMessage) {
      setTextMessage('')
    }
  }, [idParticularMessage, flagChangeMessage])

  // useEffect(() => {
  //   const win = document.querySelector('#root')
  //   win.addEventListener('click', (e) => console.log(e.path))
  //   return () => {
  //     win.removeEventListener('click', () => console.log(' remoove'))
  //   }
  // }, [])

  const textOfInput = (e) => {
    setTextMessage(e.target.value)
  }

  // not full regular express
  const nonEmptyMessage = /^\s*$/g.test(textMessage)

  const actionСhoice = () => {
    const chooseAction = flagChangeMessage
      ? dispatch(changeMessageDB(textMessage, idParticularMessage, particularChannelId))
      : dispatch(setNewMessageDB(textMessage, particularChannelId, idLoggedUser))
    return chooseAction && dispatch(setFlagChangeMessage(false)) && setTextMessage('')
  }

  const sendMessageOnClick = () => {
    if (!nonEmptyMessage) {
      actionСhoice()
    }
  }
  function sendMessageKeyPress(e) {
    if (e.key === 'Enter' && !nonEmptyMessage) {
      actionСhoice()
    }
  }

  const showInput = () => {
    return (
      <input
        value={textMessage}
        onKeyPress={sendMessageKeyPress}
        onChange={textOfInput}
        type="text"
        className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
        placeholder=" Type your message..."
      />
    )
  }

  return (
    <div id="input" className="bottom-0 w-full flex flex-row items-center">
      <div className=" bg-cyan-800 text-grey-800 hover:bg-cyan-700 flex flex-row items-center w-full border rounded-3xl h-12 px-2">
        <button
          type="button"
          className="focus:outline-none flex items-center justify-center h-10 w-10 text-gray-400 ml-1"
        >
          <svg
            className="w-5 h-5 text-cyan-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <div className="w-full">{showInput()}</div>
        <div className="flex flex-row">
          <button
            type="button"
            className=" focus:outline-none flex items-center justify-center h-10 w-8 text-gray-400"
          >
            <svg
              className="w-5 h-5 text-cyan-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <button
            type="button"
            className="focus:outline-none flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2"
          >
            <svg
              className="w-5 h-5 text-cyan-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-3">
        <button
          onClick={sendMessageOnClick}
          type="button"
          className=" bg-cyan-800 text-cyan-100 hover:bg-cyan-700 focus:outline-none flex items-center justify-center h-10 w-10 rounded-full "
        >
          <svg
            className="w-5 h-5 transform rotate-90 -mr-px text-cyan-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

ChatInput.propTypes = {
  idParticularMessage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

ChatInput.defaultProps = {
  idParticularMessage: null
}

export default React.memo(ChatInput)
