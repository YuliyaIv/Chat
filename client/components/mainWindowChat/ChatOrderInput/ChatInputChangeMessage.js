import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeNameMessage } from '../../../redux/reducers/reducerDataChannels'
import { setFlagRenderChatInput } from '../../../redux/reducers/reducerSetFlagRender'

const ChatInputChangeMessage = ({ idParticularMessage }) => {
  const dispatch = useDispatch()
  const {
    dataParticularChannel: { chatDataMessage },
    dataParticularId
  } = useSelector((s) => s.reducerDataChannels)
  const { flagRenderChatInput } = useSelector((s) => s.reducerSetFlagRender)

  const particularObjMessage = chatDataMessage.find((obj) => obj.idMessage === idParticularMessage)
  const particularMessage = particularObjMessage.textMessage
  const [changeMessage, setChangeMessage] = useState(particularMessage)

  console.log('changeMessage', changeMessage)
  console.log('particularMessage', particularMessage)

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      dispatch(changeNameMessage(idParticularMessage, dataParticularId, changeMessage))
      dispatch(setFlagRenderChatInput(!flagRenderChatInput))
    }
  }

  const textOfInput = (e) => {
    setChangeMessage(e.target.value)
  }
  return (
    <div className="w-full">
      <input
        value={changeMessage}
        onKeyPress={handleKeyPress}
        onChange={textOfInput}
        type="text"
        className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
        placeholder=" Changed your message...."
      />
    </div>
  )
}

ChatInputChangeMessage.propTypes = {}

export default React.memo(ChatInputChangeMessage)
